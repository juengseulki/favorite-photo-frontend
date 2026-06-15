import { axiosInstance } from "@/lib/api/axiosInstance";
import { API_ROUTES } from "@/lib/constants/apiRoutes";

export async function getReceivedExchangeProposals({ status, page = 1, limit = 50 } = {}) {
  const params = new URLSearchParams();
  params.set("type", "received");
  params.set("page", String(page));
  params.set("limit", String(limit));
  if (status) params.set("status", status);
  const response = await axiosInstance.get(`${API_ROUTES.EXCHANGE.BASE}?${params}`);
  return response.data;
}

export async function acceptExchangeProposal(proposalId) {
  const response = await axiosInstance.patch(API_ROUTES.EXCHANGE.ACCEPT(proposalId));
  return response.data;
}

export async function rejectExchangeProposal(proposalId) {
  const response = await axiosInstance.patch(API_ROUTES.EXCHANGE.REJECT(proposalId));
  return response.data;
}
