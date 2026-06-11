import { axiosInstance } from "@/lib/api/axiosInstance";
import { API_ROUTES } from "../constants";

export async function getRandomBoxStatus() {
  const response = await axiosInstance.get(`${API_ROUTES.POINTS.RANDOM_BOX_STATUS}`);

  return response.data.data;
}

export async function openRandomBox(selectedBox) {
  const response = await axiosInstance.post(`${API_ROUTES.POINTS.RANDOM_BOX}`, { selectedBox });

  return response.data.data;
}
