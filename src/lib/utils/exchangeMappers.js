import { EXCHANGE_FILTER_ALL } from "@/lib/constants/exchangeOptions";

export function normalizeExchangeCard(card = {}) {
  const cardCopyId =
    card.cardCopyId ??
    card.offeredCardCopyId ??
    card.cardCopy?.id ??
    card.offeredCardCopy?.id ??
    card.cardCopies?.[0]?.id ??
    (card.photoCardId ? null : card.id) ??
    null;

  const photoCardId =
    card.photoCardId ??
    card.photoCard?.id ??
    card.cardId ??
    (cardCopyId && card.id !== cardCopyId ? card.id : null) ??
    null;

  const quantity = Number(card.quantity ?? card.count ?? 1);

  return {
    ...card,
    id: cardCopyId ?? card.id ?? "",
    cardCopyId,
    photoCardId,
    name: card.name ?? card.title ?? card.photoCard?.name ?? "포토카드",
    description: card.description ?? "",
    imageUrl: card.imageUrl ?? card.image ?? card.photoCard?.imageUrl ?? "/img/images/img1.png",
    grade: card.grade ?? card.photoCard?.grade ?? "COMMON",
    genre: card.genre ?? card.photoCard?.genre ?? "ETC",
    price: Number(
      card.price ?? card.initialPrice ?? card.salePrice ?? card.photoCard?.initialPrice ?? 0,
    ),
    count: quantity,
    quantity,
    creator: {
      nickname:
        card.creator?.nickname ??
        card.creatorNickname ??
        card.owner?.nickname ??
        card.ownerNickname ??
        card.nickname ??
        card.photoCard?.creator?.nickname ??
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
    offeredCardCopyId: selectedCardId,
    decision,
  };
}
