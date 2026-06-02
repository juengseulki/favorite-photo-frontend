"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getMe, logoutUser, refreshToken } from "@/lib/api/authApi";
import { clearAccessToken, setAccessToken } from "@/lib/api/axiosInstance";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 앱 최초 로드 시 쿠키의 refresh token으로 세션 복구
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const refreshRes = await refreshToken();
        setAccessToken(refreshRes.data.data.accessToken);
        const meRes = await getMe();
        setUser(meRes.data.data.user);
      } catch {
        // 세션 없음 — 비로그인 상태로 진행
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = ({ user, accessToken }) => {
    setAccessToken(accessToken);
    setUser(user);
  };

  const logout = async () => {
    await logoutUser().catch(() => {});
    clearAccessToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
