"use client";

import { useState } from "react";

import {
  MARKET_GRADE_OPTIONS,
  MARKET_GENRE_OPTIONS,
  MARKET_SALE_STATUS_OPTIONS,
} from "@/lib/constants/marketOptions";

const FILTER_TABS = [
  { label: "등급", value: "grade" },
  { label: "장르", value: "genre" },
  { label: "매진 여부", value: "saleStatus" },
];

const GRADE_TEXT_CLASSES = {
  COMMON: "text-main",
  RARE: "text-blue",
  SUPER_RARE: "text-purple",
  LEGENDARY: "text-pink",
};

const SALE_STATUS_LABELS = {
  onSale: "판매 중",
  soldOut: "매진",
};

const getOptionsWithoutAll = (options) => options.filter((option) => option.value);

export default function MarketFilterSheet({
  isOpen,
  onClose,
  grade,
  genre,
  saleStatus,
  counts,
  resultCounts,
  onGradeChange,
  onGenreChange,
  onSaleStatusChange,
}) {
  const [activeTab, setActiveTab] = useState("grade");

  const resultTotalCount =
    (resultCounts?.saleStatuses?.onSale ?? 0) + (resultCounts?.saleStatuses?.soldOut ?? 0);

  const optionMap = {
    grade: MARKET_GRADE_OPTIONS,
    genre: MARKET_GENRE_OPTIONS,
    saleStatus: MARKET_SALE_STATUS_OPTIONS,
  };

  const activeOptions = getOptionsWithoutAll(optionMap[activeTab]);

  const selectedValue = {
    grade,
    genre,
    saleStatus,
  }[activeTab];

  const getCount = (value) => {
    if (activeTab === "grade") {
      return counts?.grades?.[value] ?? 0;
    }

    if (activeTab === "genre") {
      return counts?.genres?.[value] ?? 0;
    }

    return counts?.saleStatuses?.[value] ?? 0;
  };

  const handleSelect = (value) => {
    if (activeTab === "grade") {
      onGradeChange(value);
      return;
    }

    if (activeTab === "genre") {
      onGenreChange(value);
      return;
    }

    onSaleStatusChange(value);
  };

  const getOptionLabel = (option) => {
    if (activeTab === "saleStatus") {
      return SALE_STATUS_LABELS[option.value] ?? option.label;
    }

    return option.label;
  };

  const handleReset = () => {
    onGradeChange("");
    onGenreChange("");
    onSaleStatusChange("");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 tablet:hidden"
      style={{ fontFamily: '"Noto Sans KR", sans-serif' }}
    >
      <section className="absolute bottom-0 left-0 right-0 h-[58vh] rounded-t-[24px] bg-gray-500 text-white">
        <header className="relative flex h-[72px] items-center justify-center">
          <h2 className="text-[24px] font-bold text-[#5A5A5A]">필터</h2>

          <button
            type="button"
            aria-label="필터 닫기"
            className="absolute right-[30px] text-[32px] font-light leading-none text-[#5A5A5A]"
            onClick={onClose}
          >
            x
          </button>
        </header>
        <div className="grid grid-cols-3 border-b border-black/20">
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab.value;

            return (
              <button
                key={tab.value}
                type="button"
                className={`relative h-[58px] text-[18px] font-bold ${
                  isActive ? "text-white" : "text-gray-400"
                }`}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}

                {isActive && (
                  <span className="absolute bottom-0 left-[24px] right-[24px] h-[2px] bg-white" />
                )}
              </button>
            );
          })}
        </div>
        <ul className="h-[260px] overflow-y-auto overscroll-contain">
          {activeOptions.map((option) => {
            const isSelected = selectedValue === option.value;
            const count = getCount(option.value);

            return (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`flex h-[64px] w-full items-center justify-between px-[48px] text-left ${
                    isSelected ? "bg-black/20" : ""
                  }`}
                >
                  <span
                    className={`text-[20px] ${
                      activeTab === "grade" ? GRADE_TEXT_CLASSES[option.value] : "text-white"
                    }`}
                  >
                    {getOptionLabel(option)}
                  </span>
                  <span className="text-[20px] text-gray-300">{count}개</span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="absolute bottom-[40px] left-0 right-0 flex items-center gap-[24px] px-[48px]">
          <button
            type="button"
            aria-label="필터 초기화"
            className="flex h-[56px] w-[56px] shrink-0 items-center justify-center text-[38px] text-gray-300"
            onClick={handleReset}
          >
            ↻
          </button>

          <button
            type="button"
            className="h-[56px] flex-1 rounded-[2px] bg-main text-[22px] font-bold text-black"
            onClick={onClose}
          >
            {resultTotalCount}개 포토보기
          </button>
        </div>
      </section>
    </div>
  );
}
