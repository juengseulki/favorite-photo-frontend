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
    <Modal
      isOpen={isOpen}
      title=""
      size="form"
      onClose={onClose}
      bodyClassName="mt-0"
      actions={
        <Button size="md" onClick={onConfirm} disabled={isSubmitting}>
          {isSubmitting ? "구매 중..." : "구매하기"}
        </Button>
      }
    >
      <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
        <h2 className="text-[24px] font-bold text-white">포토카드 구매</h2>

        <p className="mt-[32px] text-[16px] font-bold text-gray-300">
          [{sale.grade} | {sale.name}] {quantity}장을 구매하시겠습니까?
        </p>
      </div>
    </Modal>
  );
}
