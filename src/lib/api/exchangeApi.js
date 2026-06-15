import { axiosInstance } from "@/lib/api/axiosInstance";
import { API_ROUTES } from "@/lib/constants/apiRoutes";

import {
  buildExchangeCardQueryParams,
  toExchangeResponsePayload,
  toExchangeSalePayload,
} from "@/lib/utils/exchangeMappers";

const EXCHANGE_API_ROUTES = {
  RESPOND: (exchangeId) => `/exchange-proposals/${exchangeId}/respond`,
};

export async function createExchangeSale({ formValues, card }) {
  const response = await axiosInstance.post(
    API_ROUTES.SALES.BASE,
    toExchangeSalePayload(formValues, card),
  );

  return response.data?.data ?? response.data;
}

export async function fetchExchangeCards(filters = {}) {
  const queryString = buildExchangeCardQueryParams(filters);

  const url = queryString
    ? `${API_ROUTES.GALLERY.MY_CARDS}?${queryString}`
    : API_ROUTES.GALLERY.MY_CARDS;

  const response = await axiosInstance.get(url);

  return response.data?.data ?? response.data;
}

export async function respondExchange({ exchangeId, selectedCardId, decision }) {
  const response = await axiosInstance.post(
    EXCHANGE_API_ROUTES.RESPOND(exchangeId),
    toExchangeResponsePayload(exchangeId, selectedCardId, decision),
  );

  return response.data?.data ?? response.data;
}

export async function createExchangeProposal({ saleId, offeredCardCopyId, description = "" }) {
  const response = await axiosInstance.post(API_ROUTES.EXCHANGE.BASE, {
    saleId,
    offeredCardCopyId,
    description,
  });

  return response.data?.data ?? response.data;
}

export async function acceptExchangeProposal(proposalId) {
  const response = await axiosInstance.patch(API_ROUTES.EXCHANGE.ACCEPT(proposalId));

  return response.data?.data ?? response.data;
}

export async function rejectExchangeProposal(proposalId) {
  const response = await axiosInstance.patch(API_ROUTES.EXCHANGE.REJECT(proposalId));

  return response.data?.data ?? response.data;
}

export async function cancelExchangeProposal(proposalId) {
  const response = await axiosInstance.patch(API_ROUTES.EXCHANGE.CANCEL(proposalId));

  return response.data?.data ?? response.data;
}
