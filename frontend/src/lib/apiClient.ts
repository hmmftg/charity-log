import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { authStorage } from "./authStorage";
import { isExpiredTokenError, isRetryableError, mapBackendError } from "./mapBackendError";

type BackendErrorBody = {
  errors?: Array<{ code?: string | number; description?: string }>;
};

const DEFAULT_TIMEOUT_MS = 15_000;
const MAX_RETRIES = 2;

let refreshPromise: Promise<string | null> | null = null;

function createRequestId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `req-${crypto.randomUUID()}`;
  }
  return `req-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = authStorage.getRefreshToken();
  if (!refreshToken) {
    return null;
  }

  const baseUrl = import.meta.env.VITE_UMS_BASE_URL;
  if (!baseUrl) {
    return null;
  }

  try {
    const { data } = await axios.post(
      `${baseUrl}/auth/refresh/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          "Request-Id": createRequestId(),
        },
        timeout: DEFAULT_TIMEOUT_MS,
      },
    );

    const result = data?.result ?? data;
    const accessToken = result?.access_token;
    const newRefreshToken = result?.refreshToken;

    if (!accessToken) {
      return null;
    }

    authStorage.setSession({
      access_token: accessToken,
      refreshToken: newRefreshToken ?? refreshToken,
      userId: authStorage.getUserId() ?? "",
      userName: localStorage.getItem("user-name") ?? "",
    });

    return accessToken;
  } catch {
    return null;
  }
}

async function getRefreshedToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

export const apiClient = axios.create({
  timeout: DEFAULT_TIMEOUT_MS,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = authStorage.getToken();
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  const userId = authStorage.getUserId();
  if (userId) {
    config.headers.set("User-Id", userId);
  }
  if (!config.headers.get("Request-Id")) {
    config.headers.set("Request-Id", createRequestId());
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as InternalAxiosRequestConfig & {
      _retryCount?: number;
      _authRetry?: boolean;
    };

    if (!config) {
      return Promise.reject(mapBackendError(error as AxiosError<BackendErrorBody>));
    }

    const mapped = mapBackendError(error as AxiosError<BackendErrorBody>);

    if (
      error.response?.status === 401 &&
      !config._authRetry &&
      isExpiredTokenError(mapped)
    ) {
      config._authRetry = true;
      const newToken = await getRefreshedToken();
      if (newToken) {
        config.headers.set("Authorization", `Bearer ${newToken}`);
        return apiClient.request(config);
      }
      authStorage.clearSession();
    }

    const retryCount = config._retryCount ?? 0;
    if (retryCount < MAX_RETRIES && isRetryableError(error)) {
      config._retryCount = retryCount + 1;
      const delay = Math.min(1000 * 2 ** retryCount, 4000) + Math.random() * 200;
      await sleep(delay);
      return apiClient.request(config);
    }

    return Promise.reject(mapped);
  },
);

export { createRequestId, DEFAULT_TIMEOUT_MS, MAX_RETRIES };
