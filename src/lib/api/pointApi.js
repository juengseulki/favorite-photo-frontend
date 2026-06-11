import { axiosInstance } from "@/lib/api/axiosInstance";
import { API_ROUTES } from "../constants";

export async function getRandomBoxStatus() {
  const response = await axiosInstance.get(`${API_ROUTES.POINTS.RANDOM_BOX_STATUS}`);

  return response.data.data;
}
