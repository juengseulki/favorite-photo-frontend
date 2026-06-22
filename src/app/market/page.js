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
import { ExchangeSelectCardModal, SaleExchangeFormModal } from "@/features/exchange";
import SaleResultModal from "@/features/sales/components/SaleResultModal";
import { useMyGalleryCards } from "@/features/my-gallery/hooks/useMyGalleryCards";
import { useSaleCard } from "@/features/my-gallery/hooks/useSaleCard";

export default function MarketPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { limit } = useResponsiveLimit();
  const loadMoreRef = useRef(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");

  //Sale 모달
  const [saleSelectCardModalOpen, setSaleSelectCardModalOpen] = useState(false);
  const [saleFormModalOpen, setSaleFormModalOpen] = useState(false);
  const [saleKeyword, setSaleKeyword] = useState("");
  const [saleGrade, setSaleGrade] = useState("");
  const [saleGenre, setSaleGenre] = useState("");
  const [saleSelectedCard, setSaleSelectedCard] = useState(null);
  const [saleSelectedId, setSaleSelectedId] = useState(null);
  const [submittedQuantity, setSubmittedQuantity] = useState(0);
  const [saleSuccessModal, setSaleSuccessModal] = useState(false);
  const [saleFailureModal, setSaleFailureModal] = useState(false);

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
    //판매 모달 열기
    setSaleSelectCardModalOpen(true);
  };

  //내 카드 정보
  const {
    cards: myCards,
    meta,
    createStatus,
    isLoading,
  } = useMyGalleryCards({
    limit: 1000,
    enabled: saleSelectCardModalOpen,
    isMobile: true,
    grade: saleGrade === "ALL" ? "" : saleGrade,
    genre: saleGenre === "ALL" ? "" : saleGenre,
    keyword: saleKeyword,
  });

  //카드 판매 등록하기 & 등록 결과 모달 띄우기
  const { handleSubmit, isSubmitting, errorMessage } = useSaleCard();
  const handleFormSubmit = async (data) => {
    const createdSale = await handleSubmit(data);
    if (createdSale) {
      setSubmittedQuantity(data?.quantity);
      setSaleSuccessModal(true);
    } else {
      setSaleFailureModal(true);
    }
    setSaleFormModalOpen(false);
  };

  const clearSaleState = () => {
    setSaleKeyword("");
    setSaleGrade("");
    setSaleGenre("");
    setSaleSelectedCard(null);
    setSaleSelectedId(null);
    setSubmittedQuantity(0);
  };

  const closeResultModal = () => {
    setSaleSuccessModal(false);
    setSaleFailureModal(false);
    clearSaleState();
  };
  const confirmSuccessModal = () => {
    setSaleSuccessModal(false);
    clearSaleState();
    router.push("/my-shop");
  };
  const confirmFailureModal = () => {
    setSaleFailureModal(false);
    clearSaleState();
    router.push("/market");
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
        counts={counts ?? {}}
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

      {/* Sale 모달 관련 */}
      <ExchangeSelectCardModal
        isOpen={saleSelectCardModalOpen}
        onClose={() => {
          setSaleSelectCardModalOpen(false);
          clearSaleState();
        }}
        cards={myCards}
        selectedCardId={saleSelectedId}
        onSelectCard={(card) => {
          setSaleSelectedCard(card);
          setSaleSelectedId(card.id);
        }}
        onConfirm={() => {
          //폼 모달 키고, 현재 모달 끄기.
          setSaleFormModalOpen(true);
          setSaleSelectCardModalOpen(false);
        }}
        keyword={saleKeyword}
        onKeywordChange={setSaleKeyword}
        grade={saleGrade}
        onGradeChange={setSaleGrade}
        genre={saleGenre}
        onGenreChange={setSaleGenre}
        isLoading={isLoading}
        isDisabled={false}
        errorMessage=""
        emptyMessage="판매 가능한 포토카드가 없습니다."
        helperText=""
        confirmDisabledReason=""
        expectedGrade=""
        expectedGenre=""
        isSale={true}
      />
      <SaleExchangeFormModal
        isOpen={saleFormModalOpen}
        onClose={() => {
          setSaleFormModalOpen(false);
          clearSaleState();
        }}
        onSubmit={handleFormSubmit}
        card={saleSelectedCard}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        onBack={() => {
          setSaleFormModalOpen(false);
          setSaleSelectCardModalOpen(true);
        }}
      />
      <SaleResultModal
        openSuccessModal={saleSuccessModal}
        openFailureModal={saleFailureModal}
        closeSuccessModal={closeResultModal}
        closeFailureModal={closeResultModal}
        confirmSuccessModal={confirmSuccessModal}
        confirmFailureModal={confirmFailureModal}
        cardName={saleSelectedCard?.name}
        quantity={submittedQuantity}
        grade={saleSelectedCard?.grade}
      />
    </main>
  );
}
