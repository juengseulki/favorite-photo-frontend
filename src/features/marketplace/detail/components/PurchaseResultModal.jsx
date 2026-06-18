import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";

export default function PurchaseResultModal({
  isOpen,
  onClose,
  onConfirm,
  isSuccess,
  cardName,
  quantity,
  grade,
}) {
  return (
    <Modal isOpen={isOpen} size="purchaseResult" onClose={onClose} bodyClassName="mt-0 h-full">
      <div className="flex h-[calc(100vh-64px)] flex-col items-center justify-center text-center">
        <h2 className="font-brand text-[30px] font-bold tablet:text-[36px]">
          구매{" "}
          <span className={isSuccess ? "text-main" : "text-gray-300"}>
            {isSuccess ? "성공" : "실패"}
          </span>
        </h2>

        <p className="mt-[40px] text-[16px] font-bold text-white">
          [{grade} | {cardName}] {quantity}장 구매에 {isSuccess ? "성공했습니다!" : "실패했습니다."}
        </p>

        <Button
          variant="secondary"
          onClick={onConfirm}
          className="
            mt-[60px]
            h-[55px]
            w-[226px]
            tablet:w-[226px]
            desktop:w-[440px] h-[60px]
          "
        >
          {isSuccess ? "마이갤러리로 돌아가기" : "마켓플레이스로 돌아가기"}
        </Button>
      </div>
    </Modal>
  );
}
