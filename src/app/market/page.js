"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ROUTES } from "@/lib/constants/routes";

import Modal from "@/components/common/Modal";
import useResponsiveLimit from "@/hooks/useResponsiveLimit";
import { useAuth } from "@/providers/AuthProvider";

import MarketHeader from "@/features/marketplace/components/MarketHeader";
import MarketFilterBar from "@/features/marketplace/components/MarketFilterBar";
import MarketGrid from "@/features/marketplace/components/MarketGrid";
import MarketPagination from "@/features/marketplace/components/MarketPagination";
import MarketMobileFilter from "@/features/marketplace/components/MarketMobileFilter";
import LoginRequiredModal from "@/features/marketplace/components/LoginRequiredModal";
import { useMarketCards } from "@/features/marketplace/hooks/useMarketCards";

export default function MarketPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { limit } = useResponsiveLimit();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");

  const {
    cards,
    isPending,
    data,
    page,
    grade,
    genre,
    sort,
    keyword,
    setGrade,
    setGenre,
    setSort,
    setKeyword,
    handlePrevPage,
    handleNextPage,
  } = useMarketCards({ limit });

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
        sort={sort}
        keyword={keyword}
        onGradeChange={setGrade}
        onGenreChange={setGenre}
        onSortChange={setSort}
        onKeywordChange={setKeyword}
      />

      <MarketMobileFilter
        sort={sort}
        onSortChange={setSort}
        onOpenFilter={() => setIsFilterOpen(true)}
      />

      <MarketGrid cards={cards} isPending={isPending} onCardClick={handleCardClick} />

      <MarketPagination
        page={page}
        isPending={isPending}
        hasNextPage={!!data?.nextCursor}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />

      <Modal isOpen={isFilterOpen} title="필터" onClose={() => setIsFilterOpen(false)}>
        <div className="flex flex-col items-center gap-[12px]">
          <MarketMobileFilter.FilterControls
            grade={grade}
            genre={genre}
            onGradeChange={setGrade}
            onGenreChange={setGenre}
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
