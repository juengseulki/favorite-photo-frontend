"use client";

import { useMemo, useState } from "react";

import Button from "@/components/common/Button";
import { PhotoCard } from "@/components/common/Card";
import Modal from "@/components/common/Modal";
import Textarea from "@/components/common/Textarea";
import { normalizeExchangeCard } from "@/lib/utils/exchangeMappers";

export default function ExchangeProposalFormModal({
  isOpen,
  onClose,
  onSubmit,
  card,
  isSubmitting = false,
}) {
  const [message, setMessage] = useState("");

  const normalizedCard = useMemo(() => {
    if (!card) return null;
    return normalizeExchangeCard(card);
  }, [card]);

  const handleClose = () => {
    setMessage("");
    onClose?.();
  };

  const handleSubmit = () => {
    if (!normalizedCard) return;

    onSubmit?.({
      card: normalizedCard,
      message: message.trim(),
    });
  };

  if (!normalizedCard?.id) return null;

  return (
    <Modal
      isOpen={isOpen}
      title=""
      size="form"
      onClose={handleClose}
      bodyClassName="mt-0"
      sheetOnTablet
    >
      <div className="mx-auto w-full max-w-[940px] space-y-6 px-2 tablet:px-4 desktop:space-y-8 desktop:px-0">
        <div>
          <span className="font-brand text-[18px] font-bold text-white desktop:text-[20px]">
            포토카드 교환하기
          </span>

          <h2 className="font-brand mt-3 border-b border-gray-400 pb-4 text-[28px] font-bold text-white tablet:text-[32px] desktop:pb-6 desktop:text-[40px]">
            {normalizedCard.name}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 tablet:grid-cols-[320px_minmax(0,1fr)] tablet:gap-6 desktop:grid-cols-[440px_1fr] desktop:gap-[40px]">
          <div className="w-full max-w-[320px] shrink-0 desktop:max-w-none">
            <PhotoCard card={normalizedCard} />
          </div>

          <div className="flex min-w-0 flex-col">
            <Textarea
              label="교환 제시 내용"
              placeholder="내용을 입력해 주세요"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              textareaClassName="h-[160px] w-full tablet:h-[140px] desktop:h-[180px]"
            />

            <div className="mt-6 flex flex-col gap-3 tablet:flex-row desktop:mt-[40px] desktop:gap-[40px]">
              <Button variant="secondary" size="exchange" className="w-full" onClick={handleClose}>
                취소하기
              </Button>

              <Button
                size="exchange"
                className="w-full"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "교환 중..." : "교환하기"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
