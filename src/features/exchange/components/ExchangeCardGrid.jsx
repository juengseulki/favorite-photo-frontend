"use client";

import { PhotoCard } from "@/components/common/Card";

function toPhotoCard(card) {
  return {
    ...card,
    id: card.id ?? card.cardCopyId ?? card.photoCardId,
    name: card.name ?? card.photoCard?.name,
    imageUrl: card.imageUrl ?? card.photoCard?.imageUrl,
    grade: card.grade ?? card.photoCard?.grade,
    genre: card.genre ?? card.photoCard?.genre,
    price: card.price ?? card.initialPrice ?? card.photoCard?.initialPrice ?? 0,
    count: card.count ?? card.quantity ?? 1,
    creator: card.creator ??
      card.photoCard?.creator ?? {
        nickname: card.creatorNickname ?? card.ownerNickname ?? card.nickname ?? "알 수 없음",
      },
  };
}

export default function ExchangeCardGrid({
  cards = [],
  selectedCardId,
  onSelect,
  emptyMessage = "교환 가능한 포토카드가 없습니다.",
}) {
  if (!cards.length) {
    return (
      <div className="flex min-h-[240px] items-center justify-center border border-gray-400">
        <p className="text-[16px] text-gray-300">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-[20px] gap-y-[40px]">
      {cards.map((card) => {
        const normalizedCard = toPhotoCard(card);
        const selected = selectedCardId === normalizedCard.id;

        return (
          <button
            key={normalizedCard.id}
            type="button"
            className="w-fit text-left"
            onClick={() => onSelect?.(normalizedCard)}
          >
            <div className={selected ? "border border-main p-[1px]" : ""}>
              <PhotoCard card={normalizedCard} />
            </div>
          </button>
        );
      })}
    </div>
  );
}
