"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import Modal from "@/components/common/Modal";
import useResponsiveLimit from "@/hooks/useResponsiveLimit";
import { ROUTES } from "@/lib/constants/routes";
import { useAuth } from "@/providers/AuthProvider";

import MarketHeader from "@/features/marketplace/components/MarketHeader";
import MarketFilterBar from "@/features/marketplace/components/MarketFilterBar";
import MarketGrid from "@/features/marketplace/components/MarketGrid";
import MarketMobileFilter from "@/features/marketplace/components/MarketMobileFilter";
import LoginRequiredModal from "@/features/marketplace/components/LoginRequiredModal";
import { useMarketCards } from "@/features/marketplace/hooks/useMarketCards";

export default function MarketPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { limit } = useResponsiveLimit();
  const loadMoreRef = useRef(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");

  const {
    cards,
    counts,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    grade,
    genre,
    saleStatus,
    sort,
    keyword,
    setGrade,
    setGenre,
    setSaleStatus,
    setSort,
    setKeyword,
  } = useMarketCards({ limit });

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

  const openLoginModal = (redirectPath) => {
    setRedirectUrl(redirectPath);
    setIsLoginModalOpen(true);
  };

  const handleCardClick = (saleId) => {
    const detailUrl = ROUTES.MARKET_DETAIL(saleId);

    if (!user) {
      openLoginModal(detailUrl);
      return;
    }

    router.push(detailUrl);
  };

  const handleSellClick = () => {
    if (!user) {
      openLoginModal(ROUTES.MY_GALLERY);
      return;
    }

    router.push(ROUTES.MY_GALLERY);
  };

  return (
    <main className="mx-auto max-w-[1920px] px-[20px] py-[30px] tablet:px-[40px] tablet:py-[50px] desktop:px-[220px]">
      <MarketHeader onSellClick={handleSellClick} />

      <MarketFilterBar
        grade={grade}
        genre={genre}
        saleStatus={saleStatus}
        sort={sort}
        keyword={keyword}
        counts={counts}
        onGradeChange={setGrade}
        onGenreChange={setGenre}
        onSaleStatusChange={setSaleStatus}
        onSortChange={setSort}
        onKeywordChange={setKeyword}
      />

      <MarketMobileFilter
        sort={sort}
        onSortChange={setSort}
        onOpenFilter={() => setIsFilterOpen(true)}
      />

      <MarketGrid cards={cards} isPending={isPending} onCardClick={handleCardClick} />

      <section
        ref={loadMoreRef}
        className="mt-[40px] flex min-h-[60px] items-center justify-center"
      >
        {isFetchingNextPage && <span className="text-[14px] text-gray-300">더 불러오는 중...</span>}
      </section>

      <Modal isOpen={isFilterOpen} title="필터" onClose={() => setIsFilterOpen(false)}>
        <div className="flex flex-col items-center gap-[12px]">
          <MarketMobileFilter.FilterControls
            grade={grade}
            genre={genre}
            saleStatus={saleStatus}
            counts={counts}
            onGradeChange={setGrade}
            onGenreChange={setGenre}
            onSaleStatusChange={setSaleStatus}
          />
        </div>
      </Modal>

      <LoginRequiredModal
        isOpen={isLoginModalOpen}
        redirectUrl={redirectUrl}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </main>
  );
}
