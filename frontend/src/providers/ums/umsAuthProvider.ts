import { AuthProvider } from "@refinedev/core";
import { sha256 } from "js-sha256";
import { apiClient } from "../../lib/apiClient";
import { authStorage } from "../../lib/authStorage";
import { authProvider as mockAuthProvider, getDemoAccounts } from "./authProvider";

const UMS_URL = import.meta.env.VITE_UMS_URL;
const BASE_URL = import.meta.env.VITE_UMS_BASE_URL;

const umsAuthProvider: AuthProvider = {
  register: async ({ userID, userName, password }) => {
    const { status, data } = await apiClient.post(`${BASE_URL}/register/`, {
      userID,
      userName,
      password: sha256(password),
    });

    if (status === 200) {
      return { success: true, redirectTo: "/login" };
    }

    return { success: false, error: data?.error };
  },

  forgotPassword: async ({ userID }) => {
    const { status, data } = await apiClient.post(`${BASE_URL}/forget/`, {
      userID,
    });

    if (status === 200) {
      return { success: true, redirectTo: "/login" };
    }

    return { success: false, error: data?.error };
  },

  login: async ({ userID, password, email, username }) => {
    const loginId = userID || email || username;
    if (!loginId || !password) {
      return {
        success: false,
        error: { name: "LoginError", message: "Username and password are required" },
      };
    }

    const { status, data } = await apiClient.post(
      `${BASE_URL}/auth/login/`,
      {},
      {
        auth: {
          username: loginId,
          password: sha256(password),
        },
      },
    );

    if (status === 200) {
      const result = data.result ?? data;
      authStorage.setSession({
        access_token: result.access_token,
        refreshToken: result.refreshToken,
        userId: result.userId,
        userName: result.userName,
        bankCode: result.bankCode,
        branchCode: result.branchCode,
        personID: result.personID,
        userData: result.userData,
      });
      return { success: true, redirectTo: "/" };
    }

    return { success: false, error: data?.error ?? "Login failed" };
  },

  logout: async () => {
    try {
      await apiClient.put(`${BASE_URL}/logout/`, {
        id: authStorage.getUserId(),
      });
    } catch {
      // Clear local session even if remote logout fails.
    }
    authStorage.clearSession();
    return { success: true, redirectTo: "/login" };
  },

  check: async () => {
    const token = authStorage.getToken();
    if (!token) {
      return { authenticated: false, logout: true, redirectTo: "/login" };
    }

    try {
      const { data } = await apiClient.get(`${UMS_URL}/check/`);
      const result = data.result ?? data;
      if (result.authenticated) {
        return { authenticated: true };
      }
      authStorage.clearSession();
      return { authenticated: false, logout: true, redirectTo: "/login" };
    } catch {
      authStorage.clearSession();
      return { authenticated: false, logout: true, redirectTo: "/login" };
    }
  },

  getPermissions: async () => {
    try {
      const { data } = await apiClient.get(`${UMS_URL}/permissions/`);
      const result = data.result ?? data;
      return result.roles ?? null;
    } catch {
      return null;
    }
  },

  getIdentity: async () => {
    const { data } = await apiClient.get(`${UMS_URL}/user/`);
    return data.result ?? data;
  },

  onError: async (error) => {
    if (error.statusCode === 401 || error.statusCode === 403) {
      authStorage.clearSession();
      return { logout: true, redirectTo: "/login", error };
    }
    return {};
  },
};

export { umsAuthProvider, mockAuthProvider, getDemoAccounts };
