"use client";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";

const DECISION_COPY = {
  reject: {
    title: "교환 제시 거절",
    actionLabel: "거절하기",
    actionVerb: "거절",
  },
  approve: {
    title: "교환 제시 승인",
    actionLabel: "승인하기",
    actionVerb: "승인",
  },
};

export default function ExchangeDecisionModal({
  isOpen,
  onClose,
  onConfirm,
  decision = "reject",
  cardName = "포토카드",
  grade = "COMMON",
  errorMessage = "",
  isSubmitting = false,
}) {
  const copy = DECISION_COPY[decision] ?? DECISION_COPY.reject;

  return (
    <Modal
      isOpen={isOpen}
      title=""
      onClose={onClose}
      className="w-[345px] border border-gray-400 bg-gray-500 tablet:w-[420px] desktop:w-[460px]"
      bodyClassName="mt-0 px-6 py-4"
    >
      <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
        <h2 className="text-[24px] font-bold text-white">{copy.title}</h2>

        <p className="mt-8 max-w-[280px] text-[14px] leading-[1.6] text-gray-300">
          [{grade} | {cardName}] 카드와의 교환을 {copy.actionVerb}하시겠습니까?
        </p>

        {errorMessage && (
          <p className="mt-6 max-w-[280px] text-[14px] font-medium text-red-500">{errorMessage}</p>
        )}

        <Button className="mt-10" size="sm" onClick={onConfirm} disabled={isSubmitting}>
          {isSubmitting ? "처리 중..." : copy.actionLabel}
        </Button>
      </div>
    </Modal>
  );
}
