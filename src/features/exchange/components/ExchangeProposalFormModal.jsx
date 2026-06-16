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

  const normalizedCard = useMemo(() => normalizeExchangeCard(card), [card]);

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
    <Modal isOpen={isOpen} title="" size="form" onClose={handleClose} bodyClassName="mt-0">
      <div className="mx-auto w-[940px] space-y-8">
        <div>
          <span className="font-brand text-[20px] font-bold text-white">포토카드 교환하기</span>

          <h2 className="font-brand mt-3 border-b border-gray-400 pb-6 text-[40px] font-bold text-white">
            {normalizedCard.name}
          </h2>
        </div>

        <div className="grid grid-cols-[440px_1fr] gap-[40px]">
          <PhotoCard card={normalizedCard} />

          <div className="flex flex-col">
            <Textarea
              label="교환 제시 내용"
              placeholder="내용을 입력해 주세요"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              textareaClassName="h-[180px] w-full"
            />

            <div className="mt-[40px] flex gap-[40px]">
              <Button variant="secondary" size="exchange" onClick={handleClose}>
                취소하기
              </Button>

              <Button size="exchange" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "교환 중..." : "교환하기"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
