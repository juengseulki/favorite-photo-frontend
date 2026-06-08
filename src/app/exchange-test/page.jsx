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
  const [submittedValues, setSubmittedValues] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(MOCK_EXCHANGE_CARDS[0].id);
  const [decisionModalType, setDecisionModalType] = useState(null);
  const [failureOpen, setFailureOpen] = useState(false);

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

  const handleOpenDecisionModal = (decision) => {
    setDecisionModalType(decision);
  };

  const handleCloseDecisionModal = () => {
    setDecisionModalType(null);
  };

  const handleSubmitSale = async (formValues) => {
    setSubmittedValues(formValues);
    completeForm();
  };

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-[1280px] space-y-12">
        <section className="space-y-4">
          <div>
            <p className="text-[14px] text-gray-300">교환 UI 테스트 페이지</p>
            <h1 className="mt-2 text-[36px] font-bold">Exchange UI Preview</h1>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button size="sm" onClick={openForm}>
              판매 등록 모달 열기
            </Button>

            <Button size="sm" onClick={openSelectCard}>
              교환 선택 모달 열기
            </Button>

            <Button size="sm" onClick={completeForm}>
              성공 모달 열기
            </Button>

            <Button size="sm" variant="secondary" onClick={() => setFailureOpen(true)}>
              실패 모달 열기
            </Button>
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-[24px] font-bold">교환 대상 카드 미리보기</h2>
          <ExchangeCardGrid
            cards={MOCK_EXCHANGE_CARDS}
            selectedCardId={selectedCardId}
            onSelect={(card) => setSelectedCardId(card.id)}
          />
        </section>

        <section className="space-y-5">
          <h2 className="text-[24px] font-bold">교환 요청 카드 미리보기</h2>
          <div className="max-w-[440px]">
            <ExchangeRequestCard
              card={selectedCard ?? MOCK_EXCHANGE_CARDS[0]}
              onAccept={() => handleOpenDecisionModal("approve")}
              onReject={() => handleOpenDecisionModal("reject")}
            />
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
          cards={filteredCards}
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
          isLoading={false}
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
