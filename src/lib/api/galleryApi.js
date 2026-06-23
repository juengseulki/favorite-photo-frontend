import { axiosInstance } from "@/lib/api/axiosInstance";
import { API_ROUTES } from "../constants";

const buildGalleryQueryParams = (params = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  return searchParams.toString();
};

export async function getMyGalleryCards(params = {}) {
  const queryString = buildGalleryQueryParams(params);
  const url = queryString
    ? `${API_ROUTES.GALLERY.MY_CARDS}?${queryString}`
    : API_ROUTES.GALLERY.MY_CARDS;

  const response = await axiosInstance.get(url);

  return response.data.data;
}

export async function postPhotoCards(formData) {
  const response = await axiosInstance.post(API_ROUTES.GALLERY.MY_CARDS, formData);

  return response.data.data;
}

export async function getPhotoCardStatus() {
  const response = await axiosInstance.get(API_ROUTES.GALLERY.MY_CARD_STATUS);

  return response.data.data;
}
