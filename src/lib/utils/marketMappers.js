export const normalizeMarketCard = (card) => ({
  ...card,
  id: card.saleId,
  count: card.remainingQuantity,
  creator: {
    nickname: card.creatorNickname,
  },
  seller: {
    nickname: card.sellerNickname,
  },
});
