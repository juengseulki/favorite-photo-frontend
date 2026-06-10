import { axiosInstance } from "@/lib/api/axiosInstance";
import { API_ROUTES } from "@/lib/constants/apiRoutes";
import { buildExchangeCardQueryParams } from "@/lib/utils/exchangeMappers";

function unwrapResponse(response) {
  return response?.data?.data ?? response?.data ?? null;
}

export async function createExchangeProposal({ saleId, offeredCardCopyId, description = "" }) {
  const response = await axiosInstance.post(API_ROUTES.EXCHANGE.BASE, {
    saleId: Number(saleId),
    offeredCardCopyId: Number(offeredCardCopyId),
    description: description.trim(),
  });

  return unwrapResponse(response);
}

export async function fetchExchangeProposals({
  type = "received",
  status,
  page = 1,
  limit = 10,
} = {}) {
  const response = await axiosInstance.get(API_ROUTES.EXCHANGE.BASE, {
    params: {
      type,
      ...(status ? { status } : {}),
      page,
      limit,
    },
  });

  return unwrapResponse(response);
}

export async function acceptExchangeProposal(proposalId) {
  const response = await axiosInstance.patch(API_ROUTES.EXCHANGE.ACCEPT(proposalId));
  return unwrapResponse(response);
}

export async function rejectExchangeProposal(proposalId) {
  const response = await axiosInstance.patch(API_ROUTES.EXCHANGE.REJECT(proposalId));
  return unwrapResponse(response);
}

export async function respondExchange({ proposalId, decision }) {
  if (decision === "approve") {
    return acceptExchangeProposal(proposalId);
  }

  return rejectExchangeProposal(proposalId);
}

export async function fetchExchangeCards(filters = {}) {
  const queryString = buildExchangeCardQueryParams(filters);
  const url = queryString
    ? `${API_ROUTES.GALLERY.MY_CARDS}?${queryString}`
    : API_ROUTES.GALLERY.MY_CARDS;

  const response = await axiosInstance.get(url);
  return unwrapResponse(response);
}

export async function createExchangeSale({
  saleId,
  offeredCardCopyId,
  description,
  formValues,
  card,
} = {}) {
  return createExchangeProposal({
    saleId: saleId ?? formValues?.saleId,
    offeredCardCopyId: offeredCardCopyId ?? card?.id ?? formValues?.offeredCardCopyId,
    description: description ?? formValues?.description ?? "",
  });
}
