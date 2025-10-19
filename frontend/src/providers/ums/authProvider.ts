import type { AuthProvider } from "@refinedev/core";

export const TOKEN_KEY = "refine-auth";
export const USER_INFO_KEY = "refine-user-info";

// Mock user database
const mockUsers = {
  "admin@charity-clinic.org": {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "admin@charity-clinic.org",
    role: "Administrator",
    avatar: "https://i.pravatar.cc/300?img=1",
    permissions: ["all"],
    description: "Full access to all features",
  },
  "doctor@charity-clinic.org": {
    id: 2,
    name: "Dr. Michael Brown",
    email: "doctor@charity-clinic.org",
    role: "Doctor",
    avatar: "https://i.pravatar.cc/300?img=2",
    permissions: ["patients", "visits", "therapy"],
    description: "Patient management and visit logging",
  },
  "nurse@charity-clinic.org": {
    id: 3,
    name: "Nurse Emily Davis",
    email: "nurse@charity-clinic.org",
    role: "Nurse",
    avatar: "https://i.pravatar.cc/300?img=3",
    permissions: ["patients", "visits"],
    description: "Patient care and basic management",
  },
  "patient@charity-clinic.org": {
    id: 4,
    name: "Maria Garcia",
    email: "patient@charity-clinic.org",
    role: "Patient",
    avatar: "https://i.pravatar.cc/300?img=4",
    permissions: ["own-records"],
    description: "View own medical records",
  },
};

// Get all demo accounts for display
export const getDemoAccounts = () => {
  return Object.values(mockUsers).map(user => ({
    role: user.role,
    email: user.email,
    password: "123", // All demo accounts use simple password
    description: user.description,
    avatar: user.avatar,
    permissions: user.permissions,
  }));
};

export const authProvider: AuthProvider = {
  login: async ({ username, email, password }) => {
    const userEmail = username || email;
    
    // Check if it's a demo user
    if (userEmail && mockUsers[userEmail as keyof typeof mockUsers]) {
      const user = mockUsers[userEmail as keyof typeof mockUsers];
      
      // For demo purposes, accept any password for demo accounts
      localStorage.setItem(TOKEN_KEY, userEmail);
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
      
      return {
        success: true,
        redirectTo: "/",
      };
    }

    // For any other credentials, also allow login (demo mode)
    if (userEmail && password) {
      localStorage.setItem(TOKEN_KEY, userEmail);
      localStorage.setItem(USER_INFO_KEY, JSON.stringify({
        id: 999,
        name: "Demo User",
        email: userEmail,
        role: "Demo User",
        avatar: "https://i.pravatar.cc/300",
        permissions: ["all"],
        description: "Demo user with full access",
      }));
      
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_INFO_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => {
    const userInfo = localStorage.getItem(USER_INFO_KEY);
    if (userInfo) {
      const user = JSON.parse(userInfo);
      return user.permissions;
    }
    return null;
  },
  getIdentity: async () => {
    const userInfo = localStorage.getItem(USER_INFO_KEY);
    if (userInfo) {
      return JSON.parse(userInfo);
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
