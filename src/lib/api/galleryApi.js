import { axiosInstance } from "@/lib/api/axiosInstance";

export async function getMyGalleryCards({ page, limit, grade, genre, keyword }) {
  const response = await axiosInstance.get(
    `/me/cards?page=${page}&limit=${limit}&grade=${grade}&genre=${genre}&keyword=${keyword}`,
  );

  return response.data.data;
}
