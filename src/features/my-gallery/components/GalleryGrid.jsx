import { PhotoCard } from "@/components/common/Card";
import { SaleExchangeFormModal, SaleFailureModal, SaleSuccessModal } from "@/features/exchange";
import { useSaleCard } from "../hooks/useSaleCard";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SaleResultModal from "@/features/sales/components/SaleResultModal";
import Loading from "@/components/common/Loading";

export default function GalleryGrid({ cards, selectedCard, setSelectedCard, isPending }) {
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

  const closeResultModal = () => {
    setSaleSuccessModal(false);
    setSaleFailureModal(false);
    setSelectedCard(null);
  };
  const confirmSuccessModal = () => {
    setSaleSuccessModal(false);
    setSelectedCard(null);
    router.push("/my-shop");
  };
  const confirmFailureModal = () => {
    setSaleFailureModal(false);
    setSelectedCard(null);
    router.push("/market");
  };

  if (isPending) {
    return <Loading text="갤러리를 불러오는 중..." />;
  }

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
        
        mb-25
        tablet:mb-10
        desktop:mb-10
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
          onBack={() => {
            setIsSaleFormOpen(false);
            setIsSelectCardOpen(true);
          }}
        />
      )}
      <SaleResultModal
        openSuccessModal={saleSuccessModal}
        openFailureModal={saleFailureModal}
        closeSuccessModal={closeResultModal}
        closeFailureModal={closeResultModal}
        confirmSuccessModal={confirmSuccessModal}
        confirmFailureModal={confirmFailureModal}
        cardName={selectedCard?.name}
        quantity={submittedQuantity}
        grade={selectedCard?.grade}
      />
    </>
  );
}
