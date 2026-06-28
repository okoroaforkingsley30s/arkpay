import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "arkpay_admin_session";

const defaultAdminUser = {
  id: "arkpay-admin",
  name: "ArkPay Administrator",
  role: "admin",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    const storedSession = window.localStorage.getItem(STORAGE_KEY);

    if (storedSession) {
      try {
        const parsedSession = JSON.parse(storedSession);
        setUser(parsedSession?.user || defaultAdminUser);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    setIsLoadingAuth(false);
  }, []);

  const login = (adminUser = defaultAdminUser) => {
    const session = {
      user: adminUser,
      loggedInAt: new Date().toISOString(),
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    setUser(adminUser);

    return session;
  };

  const logout = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoadingAuth,
      isLoadingPublicSettings: false,
      authError: null,
      appPublicSettings: null,
      authChecked: true,
      login,
      logout,
      navigateToLogin: () => {},
      checkUserAuth: async () => user,
      checkAppState: async () => true,
    }),
    [user, isLoadingAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}