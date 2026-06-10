import { API_ROUTES } from "../constants";
import { axiosInstance } from "./axiosInstance";

const saleApi = {
  getSale: async ({ saleId }) => {
    const response = await axiosInstance.get(API_ROUTES.SALES.DETAIL.SELF(saleId));
    return response.data;
  },

  getPhotocardBySaleId: async ({ saleId }) => {
    const response = await axiosInstance.get(API_ROUTES.SALES.DETAIL.PHOTOCARD(saleId));
    return response.data;
  },

  getSaleCountAll: async ({ saleId }) => {
    const response = await axiosInstance.get(API_ROUTES.SALES.DETAIL.COUNT_ALL(saleId));
    return response.data;
  },

  getSaleCountActive: async ({ saleId }) => {
    const response = await axiosInstance.get(API_ROUTES.SALES.DETAIL.COUNT_ACTIVE(saleId));
    return response.data;
  },

  createPurchase: async ({ saleId, quantity }) => {
    const response = await axiosInstance.post(API_ROUTES.MARKET.PURCHASE(saleId), quantity);
    return response.data;
  },
};

export default saleApi;
