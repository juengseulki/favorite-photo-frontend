"use client";

import { useMemo } from "react";
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
}) {
  const selectedCard = useMemo(
    () => cards.find((card) => card.id === selectedCardId),
    [cards, selectedCardId],
  );

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
          <Button size="lg" onClick={() => onConfirm?.(selectedCard)} disabled={!selectedCard}>
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
          />

          <Dropdown
            size="sort"
            options={EXCHANGE_FILTER_OPTIONS.grades}
            value={grade}
            onChange={onGradeChange}
          />

          <Dropdown
            size="sort"
            options={EXCHANGE_FILTER_OPTIONS.genres}
            value={genre}
            onChange={onGenreChange}
          />
        </div>

        {isLoading ? (
          <div className="flex min-h-[320px] items-center justify-center border border-gray-400">
            <p className="text-[16px] text-gray-300">포토카드를 불러오는 중입니다.</p>
          </div>
        ) : (
          <ExchangeCardGrid cards={cards} selectedCardId={selectedCardId} onSelect={onSelectCard} />
        )}
      </div>
    </Modal>
  );
}
