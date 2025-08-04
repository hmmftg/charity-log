import { AuthProvider, HttpError } from "@refinedev/core";
import axios from "axios";
import { sha256 } from "js-sha256";

// Error handling with axios interceptors
const axiosInstance = axios.create();

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    config.headers.set("Request-Id", `${new Date().getTime()}`);
    config.headers.set("User-Id", localStorage.getItem("user-id"));
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.errors[0].description,
      statusCode: error.response?.data?.errors[0].code,
    };

    return Promise.reject(customError);
  }
);

const UMS_URL = import.meta.env.VITE_UMS_URL;
const BASE_URL = import.meta.env.VITE_UMS_BASE_URL;

const umsAuthProvider: AuthProvider = {
  register: async ({ userID, userName, password }) => {
    const { status, data } = await axiosInstance.post(
      `${BASE_URL}/register/`,
      {
        userID,
        userName,
        password: sha256(password),
      },
    );

    if (status === 200) {
      return {
        success: true,
        redirectTo: `/login/`,
      };
    }

    return {
      success: false,
      error: data?.error,
    };
  },

  forgotPassword: async ({ userID }) => {
    const { status, data } = await axiosInstance.post(
      `${BASE_URL}/forget/`,
      {
        userID: userID,
      },
    );

    if (status === 200) {
      return {
        success: true,
        redirectTo: `/login/`,
      };
    }

    return {
      success: false,
      error: data?.error,
    };
  },

  login: async ({ userID, password }) => {
    const { status, data } = await axiosInstance.post(
      `${BASE_URL}/auth/login/`,
      {},
      {
        auth: {
          username: userID,
          password: sha256(password),
        },
      }
    );

    if (status === 200) {
      localStorage.setItem("bank-code", data.result.bankCode);
      localStorage.setItem("branch-code", data.result.branchCode);
      localStorage.setItem("person-id", data.result.personID);
      localStorage.setItem("user-data", data.result.userData);
      localStorage.setItem("user-id", data.result.userId);
      localStorage.setItem("user-name", data.result.userName);
      localStorage.setItem("refresh-token", data.result.refreshToken);
      localStorage.setItem("token", data.result.access_token);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.result.access_token}`;
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: data.error,
    };
  },

  logout: async () => {
    // Send logout request to your backend
    await axiosInstance.put(`${BASE_URL}/logout/`, {
      id: localStorage.getItem("user-id"),
    });

    delete axiosInstance.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");

    return {
      success: true,
      redirectTo: `/login`,
    };
  },

  check: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return { authenticated: false, logout: true, redirectTo: `/login` };
      }
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      axiosInstance.defaults.headers.common["User-Id"] =
        localStorage.getItem("user-id");
      const { data } = await axiosInstance.get(`${UMS_URL}/check/`);
      if (data.result.authenticated) {
        return { authenticated: true };
      }
      return { authenticated: false, logout: true, redirectTo: `/login` };
    } catch (error) {
      return { authenticated: false, logout: true, redirectTo: `/login` };
    }
  },

  getPermissions: async () => {
    // Fetch user permissions using Casbin
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.get(`${UMS_URL}/permissions/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(data.result.roles);
      return data.result.roles;
    } catch (error) {
      return null;
    }
  },

  getIdentity: async () => {
    // Fetch user identity from your backend
    const token = localStorage.getItem("token");
    const { data } = await axiosInstance.get(`${UMS_URL}/user/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    // Return the user identity
    //console.log(data);
    return data.result;
  },

  onError: async (error) => {
    if (error.status === 401 || error.status === 403) {
      return {
        logout: true,
        redirectTo: `/login`,
        error,
      };
    }

    return {};
  },
};

export default umsAuthProvider;
