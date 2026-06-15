"use client";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";

export default function SaleTakeDownModal({ isOpen, onClose, onConfirm, isLoading = false }) {
  return (
    <Modal
      isOpen={isOpen}
      title=""
      onClose={onClose}
      className="w-[345px] border border-gray-400 bg-gray-500 tablet:w-[420px] desktop:w-[460px]"
      bodyClassName="mt-0 px-6 py-4"
    >
      <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
        <h2 className="text-[24px] font-bold text-white">포토카드 판매 내리기</h2>

        <p className="mt-8 text-[14px] leading-[1.6] text-gray-300">
          정말로 판매를 중단하시겠습니까?
        </p>

        <Button className="mt-10" size="sm" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? "처리 중..." : "확인"}
        </Button>
      </div>
    </Modal>
  );
}
