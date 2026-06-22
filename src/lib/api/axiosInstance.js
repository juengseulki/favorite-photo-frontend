import axios from "axios";
import { API_ROUTES } from "@/lib/constants/apiRoutes";

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const getAccessToken = () => {
  return accessToken;
};

export const clearAccessToken = () => {
  accessToken = null;
};

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

const refreshClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

let isRefreshing = false;
let pendingQueue = [];

const processQueue = (error, token = null) => {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });

  pendingQueue = [];
};

export const requestRefreshToken = async () => {
  const { data } = await refreshClient.post(API_ROUTES.AUTH.REFRESH);
  const newToken = data?.data?.accessToken;

  if (!newToken) {
    throw new Error("AccessToken 재발급에 실패했습니다.");
  }

  setAccessToken(newToken);
  return newToken;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isUnauthorized = error.response?.status === 401;
    const isRefreshEndpoint = originalRequest.url?.includes(API_ROUTES.AUTH.REFRESH);
    const isLoginEndpoint = originalRequest.url?.includes(API_ROUTES.AUTH.LOGIN);

    if (!isUnauthorized || originalRequest._retry || isRefreshEndpoint || isLoginEndpoint) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const newToken = await requestRefreshToken();

      processQueue(null, newToken);

      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      clearAccessToken();

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
