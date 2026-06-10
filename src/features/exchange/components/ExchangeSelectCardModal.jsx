"use client";

import { useMemo, useState } from "react";
import Button from "@/components/common/Button";
import Dropdown from "@/components/common/Dropdown";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import { EXCHANGE_FILTER_OPTIONS } from "@/lib/constants/exchangeOptions";
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
  emptyMessage = "교환 가능한 포토카드가 없습니다.",
  helperText = "",
  confirmDisabledReason = "",
}) {
  const [selectionError, setSelectionError] = useState("");

  const selectedCard = useMemo(
    () => cards.find((card) => card.id === selectedCardId),
    [cards, selectedCardId],
  );

  const handleSelectCard = (card) => {
    setSelectionError("");
    onSelectCard?.(card);
  };

  const handleConfirm = () => {
    if (isDisabled) return;

    if (!selectedCard) {
      setSelectionError("교환할 포토카드를 선택해주세요.");
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
        <>
          <Button variant="secondary" size="lg" onClick={onClose}>
            취소하기
          </Button>
          <Button size="lg" onClick={handleConfirm} disabled={isDisabled}>
            선택하기
          </Button>
        </>
      }
    >
      <div className="space-y-8">
        <div>
          <span className="text-[20px] font-bold text-white">마이갤러리</span>
          <h2 className="mt-3 text-[40px] font-bold text-white">포토카드 교환하기</h2>
        </div>

        <div className="flex flex-col gap-4 border-t border-gray-400 pt-6 desktop:flex-row desktop:items-end">
          <Input
            size="searchLg"
            variant="search"
            placeholder="검색"
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
            <p className="text-[14px] text-gray-300">잠시 후 다시 시도해주세요.</p>
          </div>
        ) : isLoading ? (
          <div className="flex min-h-[320px] items-center justify-center border border-gray-400">
            <p className="text-[16px] text-gray-300">포토카드를 불러오는 중입니다.</p>
          </div>
        ) : (
          <ExchangeCardGrid
            cards={cards}
            selectedCardId={selectedCardId}
            onSelect={handleSelectCard}
            emptyMessage={emptyMessage}
            helperMessage={isDisabled ? "로그인 후 교환 기능을 이용할 수 있습니다." : ""}
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
