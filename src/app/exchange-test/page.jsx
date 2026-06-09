"use client";

import { useMemo, useState } from "react";
import Button from "@/components/common/Button";
import {
  ExchangeCardGrid,
  ExchangeDecisionModal,
  ExchangeRequestCard,
  ExchangeSelectCardModal,
  SaleExchangeFormModal,
  SaleFailureModal,
  SaleSuccessModal,
} from "@/features/exchange";
import { useExchangeFilters } from "@/hooks/useExchangeFilters";
import { useExchangeModalState } from "@/hooks/useExchangeModalState";
import { useAuth } from "@/providers/AuthProvider";

const MOCK_SALE_CARD = {
  id: 101,
  name: "우리집 앞마당",
  imageUrl: "/img/images/img1.png",
  grade: "LEGENDARY",
  genre: "풍경",
  count: 3,
  price: 4,
  description: "우리집 앞마당 포토카드입니다.",
  creator: {
    nickname: "미쏘손",
  },
};

const MOCK_EXCHANGE_CARDS = [
  {
    id: 1,
    name: "스페인 여행",
    imageUrl: "/img/images/img1.png",
    grade: "RARE",
    genre: "풍경",
    count: 1,
    price: 4,
    description: "푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다.",
    creator: {
      nickname: "프로여행러",
    },
  },
  {
    id: 2,
    name: "How Far I’ll Go",
    imageUrl: "/img/images/img2.png",
    grade: "COMMON",
    genre: "풍경",
    count: 1,
    price: 4,
    description: "여름 바다 풍경 사진과 교환하고 싶어요.",
    creator: {
      nickname: "판스타",
    },
  },
];

export default function ExchangeTestPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [submittedValues, setSubmittedValues] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(MOCK_EXCHANGE_CARDS[0].id);
  const [decisionModalType, setDecisionModalType] = useState(null);
  const [failureOpen, setFailureOpen] = useState(false);
  const [previewAuthMode, setPreviewAuthMode] = useState("logged-in");
  const [previewState, setPreviewState] = useState("default");

  const {
    formOpen,
    successOpen,
    selectCardOpen,
    openForm,
    closeForm,
    closeSuccess,
    openSelectCard,
    closeSelectCard,
    completeForm,
  } = useExchangeModalState();

  const { keyword, setKeyword, grade, setGrade, genre, setGenre } = useExchangeFilters();

  const authPreview = useMemo(() => {
    if (previewAuthMode === "loading") {
      return { user: null, isLoading: true };
    }

    if (previewAuthMode === "guest") {
      return { user: null, isLoading: false };
    }

    return { user: user ?? { id: "preview-user", nickname: "preview-user" }, isLoading: false };
  }, [previewAuthMode, user]);

  const filteredCards = useMemo(() => {
    return MOCK_EXCHANGE_CARDS.filter((card) => {
      const matchesKeyword =
        !keyword ||
        card.name.toLowerCase().includes(keyword.toLowerCase()) ||
        card.description.toLowerCase().includes(keyword.toLowerCase());

      const matchesGrade = grade === "ALL" || card.grade === grade;
      const matchesGenre = genre === "ALL" || card.genre === genre;

      return matchesKeyword && matchesGrade && matchesGenre;
    });
  }, [genre, grade, keyword]);

  const selectedCard = useMemo(
    () => MOCK_EXCHANGE_CARDS.find((card) => card.id === selectedCardId),
    [selectedCardId],
  );

  const cardsForPreview = useMemo(() => {
    if (previewState === "empty") return [];
    return filteredCards;
  }, [filteredCards, previewState]);

  const canUseExchange = !authPreview.isLoading && Boolean(authPreview.user);
  const isCardLoading = previewState === "loading";
  const errorMessage =
    previewState === "error" ? "교환 가능한 포토카드 목록을 불러오지 못했습니다." : "";
  const helperText = authPreview.isLoading
    ? "세션을 확인하는 동안에는 교환 기능을 사용할 수 없습니다."
    : !authPreview.user
      ? "로그인 후에만 교환 제안 및 승인/거절 기능을 사용할 수 있습니다."
      : "교환 가능한 내 포토카드를 선택하고 제안 흐름을 점검해 보세요.";

  const handleOpenDecisionModal = (decision) => {
    if (!canUseExchange) return;
    setDecisionModalType(decision);
  };

  const handleCloseDecisionModal = () => {
    setDecisionModalType(null);
  };

  const handleSubmitSale = async (formValues) => {
    setSubmittedValues(formValues);
    completeForm();
  };

  const handleOpenSelectCard = () => {
    if (!canUseExchange) return;
    openSelectCard();
  };

  const previewStatusCards = [
    { key: "pending", disabled: false },
    { key: "accepted", disabled: true },
    { key: "rejected", disabled: true },
  ];

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-[1280px] space-y-12">
        <section className="space-y-4">
          <div>
            <p className="text-[14px] text-gray-300">교환 UI 테스트 페이지</p>
            <h1 className="mt-2 text-[36px] font-bold">Exchange UI Preview</h1>
          </div>

          <div className="grid gap-6 border border-gray-400 p-6 desktop:grid-cols-2">
            <div className="space-y-3">
              <h2 className="text-[20px] font-bold">로그인 가드 미리보기</h2>
              <div className="flex flex-wrap gap-3">
                <Button
                  size="sm"
                  variant={previewAuthMode === "logged-in" ? "primary" : "secondary"}
                  onClick={() => setPreviewAuthMode("logged-in")}
                >
                  로그인 상태
                </Button>
                <Button
                  size="sm"
                  variant={previewAuthMode === "guest" ? "primary" : "secondary"}
                  onClick={() => setPreviewAuthMode("guest")}
                >
                  비로그인 상태
                </Button>
                <Button
                  size="sm"
                  variant={previewAuthMode === "loading" ? "primary" : "secondary"}
                  onClick={() => setPreviewAuthMode("loading")}
                >
                  세션 확인중
                </Button>
              </div>
              <p className="text-[14px] text-gray-300">
                실제 auth 상태: {authLoading ? "확인 중" : user ? "로그인됨" : "비로그인"}
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-[20px] font-bold">목록 상태 미리보기</h2>
              <div className="flex flex-wrap gap-3">
                <Button
                  size="sm"
                  variant={previewState === "default" ? "primary" : "secondary"}
                  onClick={() => setPreviewState("default")}
                >
                  기본 상태
                </Button>
                <Button
                  size="sm"
                  variant={previewState === "empty" ? "primary" : "secondary"}
                  onClick={() => setPreviewState("empty")}
                >
                  빈 상태
                </Button>
                <Button
                  size="sm"
                  variant={previewState === "loading" ? "primary" : "secondary"}
                  onClick={() => setPreviewState("loading")}
                >
                  로딩 상태
                </Button>
                <Button
                  size="sm"
                  variant={previewState === "error" ? "primary" : "secondary"}
                  onClick={() => setPreviewState("error")}
                >
                  에러 상태
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button size="sm" onClick={openForm}>
              판매 등록 모달 열기
            </Button>

            <Button size="sm" onClick={handleOpenSelectCard} disabled={!canUseExchange}>
              교환 선택 모달 열기
            </Button>

            <Button size="sm" onClick={completeForm}>
              성공 모달 열기
            </Button>

            <Button size="sm" variant="secondary" onClick={() => setFailureOpen(true)}>
              실패 모달 열기
            </Button>
          </div>

          <p className="text-[14px] text-gray-300">{helperText}</p>
        </section>

        <section className="space-y-5">
          <h2 className="text-[24px] font-bold">교환 대상 카드 미리보기</h2>
          <ExchangeCardGrid
            cards={cardsForPreview}
            selectedCardId={selectedCardId}
            onSelect={(card) => setSelectedCardId(card.id)}
            emptyMessage="교환 가능한 포토카드가 없습니다."
            helperMessage={
              previewState === "empty" ? "필터를 변경하거나 다른 카드를 등록해 보세요." : ""
            }
            disabled={!canUseExchange}
          />
        </section>

        <section className="space-y-5">
          <h2 className="text-[24px] font-bold">교환 요청 카드 미리보기</h2>
          <div className="grid gap-6 desktop:grid-cols-3">
            {previewStatusCards.map((previewCard) => (
              <div key={previewCard.key} className="max-w-[440px]">
                <ExchangeRequestCard
                  card={selectedCard ?? MOCK_EXCHANGE_CARDS[0]}
                  status={previewCard.key}
                  disabled={previewCard.disabled || !canUseExchange}
                  onAccept={() => handleOpenDecisionModal("approve")}
                  onReject={() => handleOpenDecisionModal("reject")}
                />
              </div>
            ))}
          </div>
        </section>

        <SaleExchangeFormModal
          isOpen={formOpen}
          onClose={closeForm}
          onSubmit={handleSubmitSale}
          card={MOCK_SALE_CARD}
        />

        <SaleSuccessModal
          isOpen={successOpen}
          onClose={closeSuccess}
          onConfirm={closeSuccess}
          cardName={MOCK_SALE_CARD.name}
          quantity={Number(submittedValues?.quantity ?? 2)}
          grade={MOCK_SALE_CARD.grade}
        />

        <SaleFailureModal
          isOpen={failureOpen}
          onClose={() => setFailureOpen(false)}
          onConfirm={() => setFailureOpen(false)}
          cardName={MOCK_SALE_CARD.name}
          quantity={Number(submittedValues?.quantity ?? 2)}
          grade={MOCK_SALE_CARD.grade}
        />

        <ExchangeSelectCardModal
          isOpen={selectCardOpen}
          onClose={closeSelectCard}
          cards={cardsForPreview}
          selectedCardId={selectedCardId}
          onSelectCard={(card) => setSelectedCardId(card.id)}
          onConfirm={(card) => {
            console.log("선택한 카드", card);
            closeSelectCard();
          }}
          keyword={keyword}
          onKeywordChange={setKeyword}
          grade={grade}
          onGradeChange={setGrade}
          genre={genre}
          onGenreChange={setGenre}
          isLoading={isCardLoading}
          isDisabled={!canUseExchange}
          errorMessage={errorMessage}
          emptyMessage="교환 가능한 포토카드가 없습니다."
          helperText={helperText}
          confirmDisabledReason={
            authPreview.isLoading
              ? "세션 확인 후 다시 시도해 주세요."
              : !authPreview.user
                ? "로그인 후 카드를 선택할 수 있습니다."
                : !selectedCard
                  ? "교환할 카드를 선택해 주세요."
                  : ""
          }
        />

        <ExchangeDecisionModal
          isOpen={Boolean(decisionModalType)}
          onClose={handleCloseDecisionModal}
          onConfirm={() => {
            console.log("교환 제시 처리", {
              decision: decisionModalType,
              card: selectedCard,
            });
            handleCloseDecisionModal();
          }}
          decision={decisionModalType ?? "reject"}
          cardName={selectedCard?.name ?? MOCK_EXCHANGE_CARDS[0].name}
          grade={selectedCard?.grade ?? MOCK_EXCHANGE_CARDS[0].grade}
        />
      </div>
    </main>
  );
}
