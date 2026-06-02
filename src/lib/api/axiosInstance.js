import axios from "axios";
import { API_ROUTES } from "@/lib/constants/apiRoutes";

// 메모리에 토큰 보관 (XSS 방지 — localStorage 미사용)
let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const clearAccessToken = () => {
  accessToken = null;
};

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// 요청마다 Authorization 헤더 자동 주입
axiosInstance.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 401 응답 시 refresh token으로 자동 재발급
let isRefreshing = false;
let pendingQueue = [];

const processQueue = (error, token = null) => {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  pendingQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isUnauthorized = error.response?.status === 401;
    const isRefreshEndpoint = originalRequest.url?.includes(API_ROUTES.AUTH.REFRESH);

    if (isUnauthorized && !originalRequest._retry && !isRefreshEndpoint) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axiosInstance.post(API_ROUTES.AUTH.REFRESH);
        const newToken = data.data.accessToken;
        setAccessToken(newToken);
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearAccessToken();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
