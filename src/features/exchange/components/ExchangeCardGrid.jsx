"use client";

import { PhotoCard } from "@/components/common/Card";

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
    <div className="grid gap-6 desktop:grid-cols-2">
      {cards.map((card) => {
        const selected = selectedCardId === card.id;

        return (
          <button
            key={card.id}
            type="button"
            className={`w-fit text-left transition ${
              selected ? "brightness-110" : "hover:brightness-90"
            }`}
            onClick={() => onSelect?.(card)}
          >
            <div className={selected ? "inline-block border border-main p-[1px]" : "inline-block"}>
              <PhotoCard card={card} />
            </div>
          </button>
        );
      })}
    </div>
  );
}
