import { axiosInstance } from "@/lib/api/axiosInstance";
import {
  buildExchangeCardQueryParams,
  toExchangeResponsePayload,
  toExchangeSalePayload,
} from "@/lib/utils/exchangeMappers";

const EXCHANGE_API_ROUTES = {
  SALES: "/exchanges/sales",
  AVAILABLE_CARDS: "/exchanges/cards",
  RESPOND: (exchangeId) => `/exchanges/${exchangeId}/respond`,
};

export async function createExchangeSale({ formValues, card }) {
  const response = await axiosInstance.post(
    EXCHANGE_API_ROUTES.SALES,
    toExchangeSalePayload(formValues, card),
  );

  return response.data;
}

export async function fetchExchangeCards(filters = {}) {
  const queryString = buildExchangeCardQueryParams(filters);
  const url = queryString
    ? `${EXCHANGE_API_ROUTES.AVAILABLE_CARDS}?${queryString}`
    : EXCHANGE_API_ROUTES.AVAILABLE_CARDS;

  const response = await axiosInstance.get(url);
  return response.data;
}

export async function respondExchange({ exchangeId, selectedCardId, decision }) {
  const response = await axiosInstance.post(
    EXCHANGE_API_ROUTES.RESPOND(exchangeId),
    toExchangeResponsePayload(exchangeId, selectedCardId, decision),
  );

  return response.data;
}
