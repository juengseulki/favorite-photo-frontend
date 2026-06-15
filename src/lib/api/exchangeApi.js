import { axiosInstance } from "@/lib/api/axiosInstance";
import { API_ROUTES } from "@/lib/constants/apiRoutes";

import {
  buildExchangeCardQueryParams,
  toExchangeResponsePayload,
  toExchangeSalePayload,
} from "@/lib/utils/exchangeMappers";

const EXCHANGE_API_ROUTES = {
  SALES: "/exchanges/sales",
  RESPOND: (exchangeId) => `/exchanges/${exchangeId}/respond`,
};

export async function createExchangeSale({ formValues, card }) {
  const response = await axiosInstance.post(
    EXCHANGE_API_ROUTES.SALES,
    toExchangeSalePayload(formValues, card),
  );

  return response.data;
}

// ⭐ 교환할 내 카드 조회
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

  return response.data;
}

// 교환 요청 생성
export async function createExchangeProposal({ saleId, offeredCardCopyId, description = "" }) {
  const response = await axiosInstance.post(API_ROUTES.EXCHANGE.BASE, {
    saleId,
    offeredCardCopyId,
    description,
  });

  return response.data?.data ?? response.data;
}
