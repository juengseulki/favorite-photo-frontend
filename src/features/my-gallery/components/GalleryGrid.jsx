import { PhotoCard } from "@/components/common/Card";
import { SaleExchangeFormModal, SaleFailureModal, SaleSuccessModal } from "@/features/exchange";
import { useSaleCard } from "../hooks/useSaleCard";
import Modal from "@/components/common/Modal";
import { useState } from "react";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";

export default function GalleryGrid({ cards, selectedCard, setSelectedCard }) {
  const { handleSubmit, isSubmitting, errorMessage } = useSaleCard();
  const [saleSuccessModal, setSaleSuccessModal] = useState(false);
  const [saleFailureModal, setSaleFailureModal] = useState(false);
  const [submittedQuantity, setSubmittedQuantity] = useState(0);

  const router = useRouter();

  const handleFormSubmit = async (data) => {
    const createdSale = await handleSubmit(data);
    if (createdSale) {
      setSubmittedQuantity(data?.quantity);
      setSaleSuccessModal(true);
    } else {
      setSaleFailureModal(true);
    }
  };

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
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
        />
      )}
      <SaleSuccessModal
        isOpen={saleSuccessModal}
        onClose={() => {
          setSaleSuccessModal(false);
          setSelectedCard(null);
        }}
        onConfirm={() => {
          setSaleSuccessModal(false);
          setSelectedCard(null);
          router.push("/market");
        }}
        cardName={selectedCard?.name}
        quantity={submittedQuantity}
        grade={selectedCard?.grade}
      />
      <SaleFailureModal
        isOpen={saleFailureModal}
        onClose={() => {
          setSaleFailureModal(false);
          setSelectedCard(null);
        }}
        onConfirm={() => {
          setSaleFailureModal(false);
          setSelectedCard(null);
          router.push("/market");
        }}
        cardName={selectedCard?.name}
        quantity={submittedQuantity}
        grade={selectedCard?.grade}
      />
    </>
  );
}
