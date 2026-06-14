import { axiosInstance } from "@/lib/api/axiosInstance";
import { API_ROUTES } from "@/lib/constants/apiRoutes";

const buildMarketCardQueryParams = (params = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  return searchParams.toString();
};

export async function getMarketCards(params = {}) {
  const queryString = buildMarketCardQueryParams(params);
  const url = queryString ? `${API_ROUTES.MARKET.BASE}?${queryString}` : API_ROUTES.MARKET.BASE;

  const response = await axiosInstance.get(url);
  return response.data?.data ?? response.data;
}

export async function getMarketCardDetail(saleId) {
  const response = await axiosInstance.get(API_ROUTES.MARKET.DETAIL(saleId));
  return response.data?.data ?? response.data;
}

export async function purchaseMarketCards({ saleId, quantity }) {
  const response = await axiosInstance.post(API_ROUTES.MARKET.PURCHASE(saleId), { quantity });
  return response.data?.data ?? response.data;
}

export const getMarketDetail = async (saleId) => {
  const { data } = await axiosInstance.get(API_ROUTES.MARKET.DETAIL(saleId));

  return data.data;
};

export const purchaseCard = purchaseMarketCards;
