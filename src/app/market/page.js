"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { PhotoCard } from "@/components/common/Card";
import Dropdown from "@/components/common/Dropdown";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";
import useResponsiveLimit from "@/hooks/useResponsiveLimit";
import { getMarketCards } from "@/lib/api/marketApi";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { QUERY_STALE_TIME } from "@/lib/constants/queryOptions";
import {
  MARKET_GENRE_OPTIONS,
  MARKET_GRADE_OPTIONS,
  MARKET_SORT_OPTIONS,
  MARKET_SOLD_OUT_OPTIONS,
} from "@/lib/constants/marketOptions";
import { normalizeMarketCard } from "@/lib/utils/marketMappers";

export default function MarketPage() {
  const { limit } = useResponsiveLimit();

  const [grade, setGrade] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("latest");
  const [status, setStatus] = useState("");
  const [keyword, setKeyword] = useState("");
  const [cursor, setCursor] = useState();
  const [cursorHistory, setCursorHistory] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filters = useMemo(
    () => ({
      limit,
      keyword: keyword.trim(),
      grade,
      genre,
      sort,
      status,
    }),
    [genre, grade, keyword, limit, sort, status],
  );

  const { data, isPending } = useQuery({
    queryKey: QUERY_KEYS.MARKET.LIST({ ...filters, cursor }),
    queryFn: async () => {
      const result = await getMarketCards({
        ...filters,
        cursor,
      });

      const cards = Array.isArray(result?.cards) ? result.cards : [];

      return {
        ...result,
        cards: cards.map(normalizeMarketCard),
      };
    },
    staleTime: QUERY_STALE_TIME.MEDIUM,
    retry: false,
  });

  const cards = data?.cards ?? [];
  const displayCards = cards;
  const page = cursorHistory.length + 1;

  const resetPagination = () => {
    setCursor(undefined);
    setCursorHistory([]);
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
    resetPagination();
  };

  const handleGradeChange = (value) => {
    setGrade(value);
    resetPagination();
  };

  const handleGenreChange = (value) => {
    setGenre(value);
    resetPagination();
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    resetPagination();
  };

  const handleSortChange = (value) => {
    setSort(value);
    resetPagination();
  };

  const handlePrevPage = () => {
    setCursorHistory((prev) => {
      const nextHistory = prev.slice(0, -1);
      setCursor(nextHistory.at(-1));
      return nextHistory;
    });
  };

  const handleNextPage = () => {
    if (!data?.nextCursor) return;

    setCursorHistory((prev) => [...prev, data.nextCursor]);
    setCursor(data.nextCursor);
  };

  const renderFilterControls = () => (
    <>
      <Dropdown
        placeholder="등급"
        size="sort"
        options={MARKET_GRADE_OPTIONS}
        value={grade}
        onChange={handleGradeChange}
      />
      <Dropdown
        placeholder="장르"
        size="sort"
        options={MARKET_GENRE_OPTIONS}
        value={genre}
        onChange={handleGenreChange}
      />
      <Dropdown
        placeholder="매진 여부"
        size="sort"
        options={MARKET_SOLD_OUT_OPTIONS}
        value={status}
        onChange={handleStatusChange}
      />
    </>
  );

  return (
    <main className="mx-auto max-w-[1920px] px-[20px] py-[30px] tablet:px-[40px] tablet:py-[50px] desktop:px-[220px]">
      <div className="flex items-center justify-between border-b-2 border-gray-100 pb-[20px] tablet:pb-[30px]">
        <h1 className="font-brand text-[28px] font-bold leading-none text-white tablet:text-[42px] desktop:text-[62px]">
          마켓플레이스
        </h1>

        <Button className="hidden desktop:flex desktop:h-[60px] desktop:w-[440px] desktop:text-[18px]">
          나의 포토카드 판매하기
        </Button>
      </div>

      <section className="mt-[20px] tablet:mt-[30px]">
        <div className="flex items-center justify-between gap-[20px]">
          <div className="flex items-center gap-[35px]">
            <Input
              inputClassName="w-full"
              labelSize="md"
              variant="search"
              placeholder="검색"
              size="searchLg"
              value={keyword}
              onChange={handleKeywordChange}
            />

            <div className="hidden gap-[35px] tablet:flex">{renderFilterControls()}</div>
          </div>

          <Dropdown
            placeholder="정렬"
            size="sort"
            options={MARKET_SORT_OPTIONS}
            value={sort}
            onChange={handleSortChange}
          />
        </div>

        <div className="mt-[30px] flex items-center justify-between border-t border-gray-400 pt-[30px] tablet:hidden">
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[2px] border border-gray-200 bg-black"
            aria-label="필터 열기"
          >
            <Image src="/img/icons/filter.png" alt="" width={15} height={15} />
          </button>

          <Dropdown
            placeholder="정렬"
            size="sort"
            options={MARKET_SORT_OPTIONS}
            value={sort}
            onChange={handleSortChange}
          />
        </div>
      </section>

      <section className="mt-[40px] desktop:mt-[60px]">
        {isPending ? (
          <div className="flex min-h-[300px] items-center justify-center text-[14px] text-gray-300">
            마켓을 불러오는 중...
          </div>
        ) : displayCards.length === 0 ? (
          <div className="flex min-h-[300px] items-center justify-center text-[14px] text-gray-300">
            조건에 맞는 포토카드가 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-[20px] gap-y-[40px] desktop:grid-cols-3 desktop:gap-x-[90px] desktop:gap-y-[80px]">
            {displayCards.map((card) => (
              <PhotoCard key={card.saleId} card={card} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-[40px] flex items-center justify-center gap-[20px] desktop:hidden">
        <Button
          variant="secondary"
          size="xs"
          disabled={page === 1 || isPending}
          onClick={handlePrevPage}
        >
          이전
        </Button>
        <span className="min-w-[80px] text-center text-[14px] font-bold text-white">
          {page} 페이지
        </span>
        <Button
          variant="secondary"
          size="xs"
          disabled={!data?.nextCursor || isPending}
          onClick={handleNextPage}
        >
          다음
        </Button>
      </section>

      <Modal isOpen={isFilterOpen} title="필터" onClose={() => setIsFilterOpen(false)}>
        <div className="flex flex-col items-center gap-[12px]">{renderFilterControls()}</div>
      </Modal>
    </main>
  );
}
