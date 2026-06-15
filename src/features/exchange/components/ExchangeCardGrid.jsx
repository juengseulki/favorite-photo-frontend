"use client";

import { PhotoCard } from "@/components/common/Card";
import { normalizeExchangeCard } from "@/lib/utils/exchangeMappers";

export default function ExchangeCardGrid({
  cards = [],
  selectedCardId,
  onSelect,
  emptyMessage = "��ȯ ������ ����ī�尡 �����ϴ�.",
  helperMessage = "",
  disabled = false,
}) {
  if (!cards.length) {
    return (
      <div className="flex min-h-[240px] flex-col items-center justify-center gap-2 border border-gray-400 px-6 text-center">
        <p className="text-[16px] text-gray-300">{emptyMessage}</p>
        {helperMessage && <p className="text-[14px] text-gray-300">{helperMessage}</p>}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 gap-x-[20px] gap-y-[40px] ${disabled ? "opacity-60" : ""}`}>
      {cards.map((card) => {
        const normalizedCard = normalizeExchangeCard(card);
        const selected = selectedCardId === normalizedCard.id;

        return (
          <button
            key={normalizedCard.id}
            type="button"
            disabled={disabled}
            className={`w-fit text-left transition ${
              disabled ? "cursor-not-allowed" : "hover:brightness-90"
            }`}
            onClick={() => onSelect?.(normalizedCard)}
          >
            <div className={selected ? "border border-main bg-black p-[1px]" : ""}>
              <PhotoCard card={normalizedCard} />
            </div>
          </button>
        );
      })}
    </div>
  );
}
