"use client";

import { PhotoCard } from "@/components/common/Card";

export default function ExchangeCardGrid({
  cards = [],
  selectedCardId,
  onSelect,
  emptyMessage = "교환 가능한 포토카드가 없습니다.",
  helperMessage = "",
  disabled = false,
}) {
  if (!cards.length) {
    return (
      <div className="flex min-h-[240px] flex-col items-center justify-center gap-2 border border-gray-400 px-6 text-center">
        <p className="text-[16px] font-bold text-white">{emptyMessage}</p>
        {helperMessage && <p className="text-[14px] text-gray-300">{helperMessage}</p>}
      </div>
    );
  }

  return (
    <div className={`grid gap-6 desktop:grid-cols-2 ${disabled ? "opacity-60" : ""}`}>
      {cards.map((card) => {
        const selected = selectedCardId === card.id;

        return (
          <button
            key={card.id}
            type="button"
            disabled={disabled}
            className={`w-fit text-left transition ${
              selected ? "brightness-110" : "hover:brightness-90"
            } ${disabled ? "cursor-not-allowed" : ""}`}
            onClick={() => onSelect?.(card)}
          >
            <div
              className={
                selected ? "inline-block border border-main bg-black p-[1px]" : "inline-block"
              }
            >
              <PhotoCard card={card} />
            </div>
          </button>
        );
      })}
    </div>
  );
}
