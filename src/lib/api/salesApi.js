import { axiosInstance } from "@/lib/api/axiosInstance";
import { API_ROUTES } from "@/lib/constants/apiRoutes";

export async function getMySales({ page = 1, limit = 15, status } = {}) {
  const params = new URLSearchParams();

  params.set("page", String(page));
  params.set("limit", String(limit));

  if (status) {
    params.set("status", status);
  }

  const response = await axiosInstance.get(`${API_ROUTES.SALES.MY}?${params}`);

  return response.data;
}

export async function getSaleDetail(saleId) {
  const response = await axiosInstance.get(API_ROUTES.MARKET.DETAIL(saleId));
  return response.data;
}

export async function modifySale(saleId, { photoCardId, data }) {
  const response = await axiosInstance.patch(API_ROUTES.SALES.DETAIL(saleId), {
    photoCardId,
    data,
  });
  return response.data;
}

export async function cancelSale(saleId) {
  const response = await axiosInstance.delete(API_ROUTES.SALES.DETAIL(saleId));

  return response.data?.data ?? response.data;
}

export async function createSale({ data }) {
  const response = await axiosInstance.post(API_ROUTES.SALES.BASE, {
    photoCardId: Number(data.photoCardId),
    price: Number(data.price),
    quantity: Number(data.quantity),
    exchangeGrade: data?.grade,
    exchangeGenre: data?.genre,
    exchangeDescription: data?.description,
  });
  return response.data;
}
