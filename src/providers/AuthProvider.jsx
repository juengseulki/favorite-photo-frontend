"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { getMe, logoutUser } from "@/lib/api/authApi";
import { clearAccessToken, requestRefreshToken, setAccessToken } from "@/lib/api/axiosInstance";

const AuthContext = createContext(null);

const SESSION_KEY = "oshi_has_session";

export function AuthProvider({ children }) {
  const pathname = usePathname();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      if (pathname === "/login" || pathname === "/signup") {
        setIsLoading(false);
        return;
      }

      if (!localStorage.getItem(SESSION_KEY)) {
        setIsLoading(false);
        return;
      }

      try {
        await requestRefreshToken();

        const meRes = await getMe();

        setUser(meRes.data.data.user);
      } catch {
        clearAccessToken();
        setUser(null);
        localStorage.removeItem(SESSION_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, [pathname]);

  const login = ({ user, accessToken }) => {
    setAccessToken(accessToken);
    setUser(user);
    localStorage.setItem(SESSION_KEY, "1");
  };

  const logout = async () => {
    await logoutUser().catch(() => {});
    clearAccessToken();
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const updatePoint = (newBalance) => {
    setUser((prev) => (prev ? { ...prev, point: newBalance } : null));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updatePoint }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
