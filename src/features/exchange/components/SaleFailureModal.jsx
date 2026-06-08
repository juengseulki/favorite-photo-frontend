"use client";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";

export default function SaleFailureModal({
  isOpen,
  onClose,
  onConfirm,
  cardName = "포토카드",
  quantity = 0,
  grade = "",
}) {
  return (
    <Modal
      isOpen={isOpen}
      title=""
      onClose={onClose}
      className="w-[345px] border border-gray-400 bg-gray-500 tablet:w-[600px] desktop:w-[720px]"
      bodyClassName="mt-0 flex min-h-[420px] flex-col items-center justify-center px-6 py-6 tablet:min-h-[440px]"
    >
      <div className="flex w-full flex-col items-center justify-center text-center">
        <h2 className="text-[32px] font-bold text-white tablet:text-[40px] desktop:text-[48px]">
          판매 등록 <span className="text-gray-300">실패</span>
        </h2>

        <p className="mt-8 text-[15px] font-bold text-white tablet:text-[18px]">
          [{grade} | {cardName}] {quantity}장 판매 등록에 실패했습니다.
        </p>

        <Button className="mt-12" variant="secondary" size="md" onClick={onConfirm}>
          마켓플레이스로 돌아가기
        </Button>
      </div>
    </Modal>
  );
}
