export function formatGalleryCards(cards) {
  return cards.map((card) => ({
    ...card,
    creator: {
      nickname: card.creatorNickname,
    },
    price: card.initialPrice,
    count: card.quantity,
  }));
}
