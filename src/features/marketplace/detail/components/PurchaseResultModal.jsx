"use client";

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
    <Modal isOpen={isOpen} title="" size="form" onClose={onClose} bodyClassName="mt-0">
      <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
        <h2 className="text-[40px] font-bold text-white">
          구매{" "}
          <span className={isSuccess ? "text-main" : "text-gray-300"}>
            {isSuccess ? "성공" : "실패"}
          </span>
        </h2>

        <p className="mt-8 text-[18px] font-bold text-white">
          [{grade} | {cardName}] {quantity}장 구매에 {isSuccess ? "성공했습니다!" : "실패했습니다."}
        </p>

        <Button className="mt-12" variant="secondary" size="md" onClick={onConfirm}>
          {isSuccess ? "마이갤러리에서 확인하기" : "마켓플레이스로 돌아가기"}
        </Button>
      </div>
    </Modal>
  );
}
