import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";

export default function PurchaseConfirmModal({ isOpen, onClose, sale, quantity, totalPrice }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="포토카드 구매">
      <div className="text-white">
        <p className="text-[20px] font-bold">
          [{sale.name}] {quantity}장을 구매하시겠습니까?
        </p>

        <p className="mt-4 text-gray-300">
          총 가격: <span className="font-bold text-main">{totalPrice.toLocaleString()} P</span>
        </p>

        <div className="mt-8 flex gap-3">
          <Button variant="secondary" size="lg" className="flex-1" onClick={onClose}>
            취소
          </Button>

          <Button variant="primary" size="lg" className="flex-1">
            구매하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
