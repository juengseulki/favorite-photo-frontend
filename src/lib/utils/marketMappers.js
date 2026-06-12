export const normalizeMarketCard = (card) => ({
  ...card,
  id: card.saleId,
  count:
    card.remainingQuantity !== undefined && card.totalQuantity !== undefined
      ? `${card.remainingQuantity} / ${card.totalQuantity}`
      : card.remainingQuantity,
  creator: {
    nickname: card.creatorNickname,
  },
  seller: {
    nickname: card.sellerNickname,
  },
});
