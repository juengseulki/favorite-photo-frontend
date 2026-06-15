import { EXCHANGE_FILTER_ALL } from "@/lib/constants/exchangeOptions";

export function normalizeExchangeCard(card = {}) {
  return {
    id: card.id ?? card.cardCopyId ?? card.cardId ?? "",
    cardCopyId: card.cardCopyId ?? card.cardCopies?.[0]?.id ?? card.id,
    photoCardId: card.photoCardId ?? card.cardId ?? card.id,
    name: card.name ?? card.title ?? "",
    description: card.description ?? "",
    imageUrl: card.imageUrl ?? card.image ?? "/img/images/img1.png",
    grade: card.grade ?? "COMMON",
    genre: card.genre ?? "ETC",
    price: card.price ?? card.initialPrice ?? card.salePrice ?? 0,
    count: card.count ?? card.quantity ?? 0,
    creator: {
      nickname:
        card.creator?.nickname ??
        card.creatorNickname ??
        card.owner?.nickname ??
        card.nickname ??
        "최애의포토",
    },
  };
}

export function buildExchangeCardQueryParams(filters = {}) {
  const params = new URLSearchParams();

  if (filters.keyword) params.set("keyword", filters.keyword.trim());
  if (filters.grade && filters.grade !== EXCHANGE_FILTER_ALL) params.set("grade", filters.grade);
  if (filters.genre && filters.genre !== EXCHANGE_FILTER_ALL) params.set("genre", filters.genre);

  return params.toString();
}

export function toExchangeSalePayload(formValues = {}, card = {}) {
  return {
    photoCardId: card.photoCardId ?? card.cardId ?? card.id,
    quantity: Number(formValues.quantity),
    price: Number(formValues.price),
    exchangeGrade: formValues.grade,
    exchangeGenre: formValues.genre,
    exchangeDescription: formValues.description?.trim() ?? "",
  };
}

export function toExchangeResponsePayload(exchangeId, selectedCardId, decision) {
  return {
    exchangeId,
    offeredCardId: selectedCardId,
    decision,
  };
}
