import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";

export default function PurchaseConfirmModal({
  isOpen,
  onClose,
  sale,
  quantity,
  onConfirm,
  isSubmitting = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" size="purchase" bodyClassName="mt-0">
      <div className="flex h-full min-h-[227px] -translate-y-[15px] flex-col items-center justify-center text-center">
        <h2 className="text-[18px] font-bold text-white">포토카드 구매</h2>

        <p className="mt-[28px] text-[14px] font-bold text-gray-300">
          [{sale.grade} | {sale.name}] {quantity}장을 구매하시겠습니까?
        </p>

        <Button
          className="mt-[32px] h-[55px] w-[120px] rounded-[2px] py-0 text-[16px] font-bold tablet:w-[140px]"
          onClick={onConfirm}
          disabled={isSubmitting}
        >
          {isSubmitting ? "구매 중..." : "구매하기"}
        </Button>
      </div>
    </Modal>
  );
}
