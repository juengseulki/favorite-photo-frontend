import { SaleFailureModal, SaleSuccessModal } from "@/features/exchange";

const SaleModal = ({
  openSuccessModal,
  openFailureModal,
  closeSuccessModal,
  closeFailureModal,
  confirmSuccessModal,
  confirmFailureModal,
  cardName,
  quantity,
  grade,
}) => {
  return (
    <div>
      <SaleSuccessModal
        isOpen={openSuccessModal}
        onClose={closeSuccessModal}
        onConfirm={confirmSuccessModal}
        cardName={cardName}
        quantity={quantity}
        grade={grade}
      />
      <SaleFailureModal
        isOpen={openFailureModal}
        onClose={closeFailureModal}
        onConfirm={confirmFailureModal}
        cardName={cardName}
        quantity={quantity}
        grade={grade}
      />
    </div>
  );
};

export default SaleModal;
