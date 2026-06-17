import type { HttpError } from "@refinedev/core";
import type { AxiosError } from "axios";

type BackendErrorBody = {
  errors?: Array<{ code?: string | number; description?: string }>;
  error?: string;
  message?: string;
};

export function mapBackendError(error: AxiosError<BackendErrorBody>): HttpError {
  const backendError = error.response?.data?.errors?.[0];
  const message =
    backendError?.description ||
    error.response?.data?.error ||
    error.response?.data?.message ||
    error.message ||
    "Request failed";

  const statusCode = Number(backendError?.code ?? error.response?.status ?? 500);

  return {
    ...error,
    message,
    statusCode,
  };
}

export function isExpiredTokenError(error: HttpError): boolean {
  const code = String(error.statusCode ?? "");
  const message = String(error.message ?? "").toLowerCase();
  return code === "EXPIRED_TOKEN" || message.includes("expired token");
}

export function isRetryableError(error: AxiosError): boolean {
  if (!error.response) {
    return true;
  }
  const status = error.response.status;
  return status === 408 || status === 429 || status >= 500;
}
