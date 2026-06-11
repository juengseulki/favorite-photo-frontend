import { axiosInstance } from "@/lib/api/axiosInstance";
import { API_ROUTES } from "../constants";

export async function getMyGalleryCards({ page, limit, grade, genre, keyword }) {
  const response = await axiosInstance.get(
    `${API_ROUTES.GALLERY.MY_CARDS}?page=${page}&limit=${limit}&grade=${grade}&genre=${genre}&keyword=${keyword}`,
  );

  return response.data.data;
}

export async function postPhotoCards(formData) {
  const response = await axiosInstance.post(API_ROUTES.GALLERY.MY_CARDS, formData);

  return response.data.data;
}
