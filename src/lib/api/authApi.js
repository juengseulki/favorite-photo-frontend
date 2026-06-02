import { axiosInstance } from "./axiosInstance";
import { API_ROUTES } from "@/lib/constants/apiRoutes";

export const createUser = (body) => axiosInstance.post(API_ROUTES.AUTH.SIGNUP, body);

export const loginUser = (body) => axiosInstance.post(API_ROUTES.AUTH.LOGIN, body);

export const logoutUser = () => axiosInstance.post(API_ROUTES.AUTH.LOGOUT);

export const refreshToken = () => axiosInstance.post(API_ROUTES.AUTH.REFRESH);

export const getMe = () => axiosInstance.get(API_ROUTES.AUTH.ME);
