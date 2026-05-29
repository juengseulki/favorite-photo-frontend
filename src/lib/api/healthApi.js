import { axiosInstance } from "@/lib/api/axiosInstance";

export async function getHealth() {
  const response = await axiosInstance.get("/health");
  return response.data;
}
