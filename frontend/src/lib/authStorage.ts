const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refresh-token";
const USER_ID_KEY = "user-id";
const USER_NAME_KEY = "user-name";
const BANK_CODE_KEY = "bank-code";
const BRANCH_CODE_KEY = "branch-code";
const PERSON_ID_KEY = "person-id";
const USER_DATA_KEY = "user-data";

export const authStorage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  getUserId: () => localStorage.getItem(USER_ID_KEY),

  setSession: (data: {
    access_token: string;
    refreshToken: string;
    userId: string;
    userName: string;
    bankCode?: string;
    branchCode?: string;
    personID?: string;
    userData?: string;
  }) => {
    localStorage.setItem(TOKEN_KEY, data.access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
    localStorage.setItem(USER_ID_KEY, data.userId);
    localStorage.setItem(USER_NAME_KEY, data.userName);
    if (data.bankCode) localStorage.setItem(BANK_CODE_KEY, data.bankCode);
    if (data.branchCode) localStorage.setItem(BRANCH_CODE_KEY, data.branchCode);
    if (data.personID) localStorage.setItem(PERSON_ID_KEY, data.personID);
    if (data.userData) localStorage.setItem(USER_DATA_KEY, data.userData);
  },

  clearSession: () => {
    [
      TOKEN_KEY,
      REFRESH_TOKEN_KEY,
      USER_ID_KEY,
      USER_NAME_KEY,
      BANK_CODE_KEY,
      BRANCH_CODE_KEY,
      PERSON_ID_KEY,
      USER_DATA_KEY,
    ].forEach((key) => localStorage.removeItem(key));
  },
};

export const isMockMode = () =>
  import.meta.env.VITE_USE_MOCK_DATA === "true" ||
  import.meta.env.VITE_DEMO_MODE === "true";
