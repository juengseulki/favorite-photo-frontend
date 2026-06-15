import { PhotoCard } from "@/components/common/Card";
import { SaleExchangeFormModal } from "@/features/exchange";

export default function GalleryGrid({ cards, selectedCard, setSelectedCard }) {
  return (
    <>
      <div
        className="
        grid
        grid-cols-2
        justify-items-center
        gap-x-[15px]
        gap-y-[20px]

        tablet:grid-cols-2
        tablet:gap-x-[10px]
        tablet:gap-y-[20px]

        desktop:grid-cols-3
        desktop:justify-items-start
        desktop:gap-x-[80px]
        desktop:gap-y-[80px]
      "
      >
        {cards.map((card) => (
          <div key={card.id} onClick={() => setSelectedCard(card)}>
            <PhotoCard card={card} />
          </div>
        ))}
      </div>
      {selectedCard && (
        <SaleExchangeFormModal
          isOpen={true}
          onClose={() => setSelectedCard(null)}
          card={selectedCard}
        />
      )}
    </>
  );
}
