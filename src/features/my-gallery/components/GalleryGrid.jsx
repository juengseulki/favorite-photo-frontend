import { PhotoCard } from "@/components/common/Card";
import { SaleExchangeFormModal } from "@/features/exchange";
import { useSaleCard } from "../hooks/useSaleCard";
import Modal from "@/components/common/Modal";
import { useState } from "react";
import Button from "@/components/common/Button";

export default function GalleryGrid({ cards, selectedCard, setSelectedCard }) {
  const { handleSubmit, isSubmitting, errorMessage } = useSaleCard();
  const [saleSuccessModal, setSaleSuccessModal] = useState(false);

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
          onSubmit={(data) => {
            handleSubmit(data);
            setSaleSuccessModal(true);
          }}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
        />
      )}
      <Modal
        isOpen={saleSuccessModal}
        onClose={() => {
          setSaleSuccessModal(false);
          setSelectedCard(null);
        }}
        title="판매가 등록되었습니다!"
        actions={
          <Button
            onClick={() => {
              setSaleSuccessModal(false);
              setSelectedCard(null);
            }}
          >
            확인
          </Button>
        }
      ></Modal>
    </>
  );
}
