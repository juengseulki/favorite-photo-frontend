import { PhotoCard } from "@/components/common/Card";

export default function MarketGrid({ cards, isPending, onCardClick }) {
  return (
    <section className="mt-[40px] desktop:mt-[60px]">
      {isPending ? (
        <div className="flex min-h-[300px] items-center justify-center text-[14px] text-gray-300">
          마켓을 불러오는 중...
        </div>
      ) : cards.length === 0 ? (
        <div className="flex min-h-[300px] items-center justify-center text-[14px] text-gray-300">
          조건에 맞는 포토카드가 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-[20px] gap-y-[40px] desktop:grid-cols-3 desktop:gap-x-[90px] desktop:gap-y-[80px]">
          {cards.map((card) => (
            <button
              key={card.saleId}
              type="button"
              onClick={() => onCardClick(card.saleId)}
              className="text-left"
            >
              <PhotoCard card={card} />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
