"use client";

import { useMemo, useState } from "react";
import Button from "@/components/common/Button";
import Dropdown from "@/components/common/Dropdown";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import { EXCHANGE_FILTER_OPTIONS } from "@/lib/constants/exchangeOptions";
import { normalizeExchangeCard } from "@/lib/utils/exchangeMappers";
import ExchangeCardGrid from "./ExchangeCardGrid";

export default function ExchangeSelectCardModal({
  isOpen,
  onClose,
  cards = [],
  selectedCardId,
  onSelectCard,
  onConfirm,
  keyword,
  onKeywordChange,
  grade,
  onGradeChange,
  genre,
  onGenreChange,
  isLoading = false,
  isDisabled = false,
  errorMessage = "",
  emptyMessage = "��ȯ ������ ����ī�尡 �����ϴ�.",
  helperText = "",
  confirmDisabledReason = "",
}) {
  const [selectionError, setSelectionError] = useState("");

  const normalizedCards = useMemo(() => cards.map(normalizeExchangeCard), [cards]);

  const selectedCard = useMemo(
    () => normalizedCards.find((card) => card.id === selectedCardId),
    [normalizedCards, selectedCardId],
  );

  const handleSelectCard = (card) => {
    setSelectionError("");
    onSelectCard?.(card);
  };

  const handleConfirm = () => {
    if (isDisabled) return;

    if (!selectedCard) {
      setSelectionError("��ȯ�� ����ī�带 ������ �ּ���.");
      return;
    }

    setSelectionError("");
    onConfirm?.(selectedCard);
  };

  return (
    <Modal
      isOpen={isOpen}
      title=""
      size="form"
      onClose={onClose}
      bodyClassName="mt-0"
      actions={
        <div className="flex w-full justify-center gap-[80px] px-[80px]">
          <Button variant="secondary" size="lg" className="flex-1" onClick={onClose}>
            ����ϱ�
          </Button>

          <Button size="lg" className="flex-1" onClick={handleConfirm} disabled={isDisabled}>
            �����ϱ�
          </Button>
        </div>
      }
    >
      <div className="mx-auto w-[940px] space-y-8">
        <div>
          <span className="font-brand text-[20px] font-bold text-white">���̰�����</span>

          <h2 className="font-brand mt-[12px] text-[40px] font-bold text-white">����ī�� ��ȯ�ϱ�</h2>
        </div>

        <div className="flex flex-col gap-4 border-t border-gray-400 pt-[20px] desktop:flex-row desktop:items-end">
          <Input
            size="searchLg"
            variant="search"
            placeholder="�˻�"
            value={keyword}
            onChange={(event) => onKeywordChange?.(event.target.value)}
            disabled={isDisabled}
          />

          <Dropdown
            size="sort"
            options={EXCHANGE_FILTER_OPTIONS.grades}
            value={grade}
            onChange={isDisabled ? undefined : onGradeChange}
          />

          <Dropdown
            size="sort"
            options={EXCHANGE_FILTER_OPTIONS.genres}
            value={genre}
            onChange={isDisabled ? undefined : onGenreChange}
          />
        </div>

        {helperText && <p className="text-[14px] text-gray-300">{helperText}</p>}

        {errorMessage ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 border border-red-500 px-6 text-center">
            <p className="text-[16px] font-bold text-white">{errorMessage}</p>
            <p className="text-[14px] text-gray-300">��� �� �ٽ� �õ��� �ּ���.</p>
          </div>
        ) : isLoading ? (
          <div className="flex min-h-[320px] items-center justify-center border border-gray-400">
            <p className="text-[16px] text-gray-300">����ī�带 �ҷ����� ���Դϴ�.</p>
          </div>
        ) : (
          <ExchangeCardGrid
            cards={normalizedCards}
            selectedCardId={selectedCardId}
            onSelect={handleSelectCard}
            emptyMessage={emptyMessage}
            helperMessage={isDisabled ? "�α��� �� ��ȯ ����� �̿��� �� �ֽ��ϴ�." : ""}
            disabled={isDisabled}
          />
        )}

        {selectionError && <p className="text-[14px] font-medium text-red-500">{selectionError}</p>}

        {confirmDisabledReason && (
          <p className="text-right text-[13px] text-gray-300">{confirmDisabledReason}</p>
        )}
      </div>
    </Modal>
  );
}
