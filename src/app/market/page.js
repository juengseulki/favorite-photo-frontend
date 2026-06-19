"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import MarketFilterSheet from "@/features/marketplace/components/MarketFilterSheet";
import useResponsiveLimit from "@/hooks/useResponsiveLimit";
import { ROUTES } from "@/lib/constants/routes";
import { useAuth } from "@/providers/AuthProvider";

import useInfiniteScroll from "@/hooks/useInfiniteScroll";
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
    resultCounts,
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

  useInfiniteScroll({
    targetRef: loadMoreRef,
    enabled: hasNextPage && !isPending && !isFetchingNextPage,
    onIntersect: fetchNextPage,
  });

  const openLoginModal = (redirectPath) => {
    setRedirectUrl(redirectPath);
    setIsLoginModalOpen(true);
  };

  const handleCardClick = (card) => {
    const saleId = card.saleId ?? card.id;

    if (!saleId) return;

    if (card.sellerId === user?.id) {
      router.push(ROUTES.MY_SHOP_DETAIL(saleId));
      return;
    }

    router.push(ROUTES.MARKET_DETAIL(saleId));
  };

  const handleSellClick = () => {
    if (!user) {
      openLoginModal(ROUTES.MY_GALLERY);
      return;
    }

    router.push(ROUTES.MY_GALLERY);
  };

  return (
    <main className="mx-auto max-w-[1920px] px-[15px] pb-[110px] pt-[30px] tablet:px-[20px] tablet:py-[50px] desktop:px-[220px]">
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

      <MarketFilterSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        grade={grade}
        genre={genre}
        saleStatus={saleStatus}
        counts={counts}
        resultCounts={resultCounts}
        onGradeChange={setGrade}
        onGenreChange={setGenre}
        onSaleStatusChange={setSaleStatus}
      />

      <LoginRequiredModal
        isOpen={isLoginModalOpen}
        redirectUrl={redirectUrl}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </main>
  );
}
