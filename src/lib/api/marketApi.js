import { axiosInstance } from "@/lib/api/axiosInstance";
import { API_ROUTES } from "@/lib/constants/apiRoutes";

export async function getMarketCards({
  cursor,
  limit = 15,
  keyword,
  grade,
  genre,
  sort = "latest",
} = {}) {
  const params = new URLSearchParams();
  if (cursor) params.set("cursor", cursor);
  params.set("limit", String(limit));
  if (keyword) params.set("keyword", keyword);
  if (grade) params.set("grade", grade);
  if (genre) params.set("genre", genre);
  params.set("sort", sort);

  const response = await axiosInstance.get(`${API_ROUTES.MARKET.BASE}?${params}`);
  return response.data;
}

export async function getMarketCardDetail(saleId) {
  const response = await axiosInstance.get(API_ROUTES.MARKET.DETAIL(saleId));
  return response.data;
}

export async function purchaseCard({ saleId, quantity }) {
  const response = await axiosInstance.post(API_ROUTES.MARKET.PURCHASE(saleId), { quantity });
  return response.data;
}
