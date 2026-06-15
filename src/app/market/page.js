"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { PhotoCard } from "@/components/common/Card";
import Dropdown from "@/components/common/Dropdown";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";
import useResponsiveLimit from "@/hooks/useResponsiveLimit";
import { useMarketCards } from "@/hooks/useMarketCards";
import {
  MARKET_GENRE_OPTIONS,
  MARKET_GRADE_OPTIONS,
  MARKET_SORT_OPTIONS,
  MARKET_SALE_STATUS_OPTIONS,
} from "@/lib/constants/marketOptions";

const withOptionCounts = (options, counts = {}) =>
  options.map((option) =>
    option.value
      ? {
          ...option,
          label: `${option.label} ${counts[option.value] ?? 0}`,
        }
      : option,
  );

export default function MarketPage() {
  const { limit } = useResponsiveLimit();

  const [grade, setGrade] = useState("");
  const [genre, setGenre] = useState("");
  const [saleStatus, setSaleStatus] = useState("");
  const [sort, setSort] = useState("latest");
  const [keyword, setKeyword] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filters = useMemo(
    () => ({
      limit,
      keyword: keyword.trim(),
      grade,
      genre,
      sort,
      saleStatus,
    }),
    [genre, grade, keyword, limit, sort, saleStatus],
  );

  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } = useMarketCards(
    filters,
    {
      retry: false,
    },
  );

  const cards = data?.pages.flatMap((page) => page.cards ?? []) ?? [];
  const counts = data?.pages[0]?.counts;
  const gradeOptions = useMemo(
    () => withOptionCounts(MARKET_GRADE_OPTIONS, counts?.grades),
    [counts?.grades],
  );
  const genreOptions = useMemo(
    () => withOptionCounts(MARKET_GENRE_OPTIONS, counts?.genres),
    [counts?.genres],
  );
  const saleStatusOptions = useMemo(
    () => withOptionCounts(MARKET_SALE_STATUS_OPTIONS, counts?.saleStatuses),
    [counts?.saleStatuses],
  );
  const displayCards = cards;
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const target = loadMoreRef.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isPending && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isPending, isFetchingNextPage]);

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSortChange = (value) => {
    setSort(value);
  };

  const renderFilterControls = () => (
    <>
      <Dropdown
        placeholder="등급"
        size="sort"
        options={gradeOptions}
        value={grade}
        onChange={setGrade}
      />
      <Dropdown
        placeholder="장르"
        size="sort"
        options={genreOptions}
        value={genre}
        onChange={setGenre}
      />
      <Dropdown
        placeholder="매진여부"
        size="sort"
        options={saleStatusOptions}
        value={saleStatus}
        onChange={setSaleStatus}
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

      <section
        ref={loadMoreRef}
        className="mt-[40px] flex min-h-[60px] items-center justify-center"
      >
        {isFetchingNextPage && <span className="text-[14px] text-gray-300">더 불러오는 중...</span>}
      </section>

      <Modal isOpen={isFilterOpen} title="필터" onClose={() => setIsFilterOpen(false)}>
        <div className="flex flex-col items-center gap-[12px]">{renderFilterControls()}</div>
      </Modal>
    </main>
  );
}
