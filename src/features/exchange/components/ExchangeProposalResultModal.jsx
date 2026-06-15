"use client";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";

export default function ExchangeProposalResultModal({ isOpen, onClose, isSuccess = true }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" size="form" bodyClassName="mt-0">
      <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
        <h2 className="text-[32px] font-bold text-white">
          교환 제시{" "}
          <span className={isSuccess ? "text-main" : "text-gray-300"}>
            {isSuccess ? "성공" : "실패"}
          </span>
        </h2>

        <p className="mt-[28px] text-[16px] font-bold text-white">
          {isSuccess ? "포토카드 교환 제시에 성공했습니다!" : "포토카드 교환 제시에 실패했습니다."}
        </p>

        <Button variant="secondary" size="md" className="mt-[32px]" onClick={onClose}>
          {isSuccess ? "나의 판매 포토카드에서 확인하기" : "마켓플레이스로 돌아가기"}
        </Button>
      </div>
    </Modal>
  );
}
