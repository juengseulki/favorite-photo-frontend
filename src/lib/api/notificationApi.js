import { axiosInstance } from "./axiosInstance";
import { API_ROUTES } from "../constants/apiRoutes";

export const getNotifications = () => axiosInstance.get(API_ROUTES.NOTIFICATIONS.BASE);

export const readNotification = (notificationId) =>
  axiosInstance.patch(API_ROUTES.NOTIFICATIONS.READ(notificationId));

export const readAllNotifications = () => axiosInstance.patch(API_ROUTES.NOTIFICATIONS.READ_ALL);
