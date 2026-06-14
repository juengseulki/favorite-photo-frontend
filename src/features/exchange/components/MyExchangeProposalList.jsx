"use client";

import { PhotoCard } from "@/components/common/Card";

export default function MyExchangeProposalList({ cards = [] }) {
  if (!cards.length) return null;

  return (
    <section className="mt-[80px]">
      <h2 className="border-b border-gray-200 pb-[20px] text-[32px] font-bold">
        내가 제시한 교환 목록
      </h2>

      <div className="mt-[40px] grid grid-cols-3 gap-[24px]">
        {cards.map((card) => (
          <PhotoCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}
