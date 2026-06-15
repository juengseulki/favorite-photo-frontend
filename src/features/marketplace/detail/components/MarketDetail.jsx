"use client";

import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import {
  ExchangeProposalFormModal,
  ExchangeSelectCardModal,
  ExchangeProposalResultModal,
} from "@/features/exchange";
import { createExchangeProposal } from "@/lib/api/exchangeApi";
import { useExchangeCards } from "@/hooks/useExchangeCards";
import { normalizeExchangeCard } from "@/lib/utils/exchangeMappers";

import { useMarketDetail } from "../hooks/useMarketDetail";
import MarketDetailImage from "./MarketDetailImage";
import MarketDetailInfo from "./MarketDetailInfo";
import ExchangeInfo from "./ExchangeInfo";

import MyExchangeProposalList from "@/features/exchange/components/MyExchangeProposalList";

export default function MarketDetail() {
  const { saleId } = useParams();
  const { data: sale, isLoading, isError } = useMarketDetail(saleId);

  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);

  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedExchangeCard, setSelectedExchangeCard] = useState(null);

  const [keyword, setKeyword] = useState("");
  const [grade, setGrade] = useState("");
  const [genre, setGenre] = useState("");

  const [proposalResult, setProposalResult] = useState(null);
  const [myProposalCards, setMyProposalCards] = useState([]);

  const filters = useMemo(() => ({ keyword, grade, genre }), [keyword, grade, genre]);
  const { data: exchangeCards = [], isLoading: isExchangeCardsLoading } = useExchangeCards(
    filters,
    { enabled: isExchangeModalOpen },
  );

  const exchangeCardList = useMemo(
    () => (Array.isArray(exchangeCards) ? exchangeCards.map(normalizeExchangeCard) : []),
    [exchangeCards],
  );

  const { mutate: createProposal, isPending } = useMutation({
    mutationFn: createExchangeProposal,
    onSuccess: (_, variables) => {
      setIsProposalModalOpen(false);
      setProposalResult("success");

      setMyProposalCards((prev) =>
        selectedExchangeCard
          ? [
              ...prev,
              {
                ...selectedExchangeCard,
                id: variables.offeredCardCopyId,
                cardCopyId: variables.offeredCardCopyId,
                description: variables.description,
              },
            ]
          : prev,
      );

      setSelectedExchangeCard(null);
      setSelectedCardId(null);
    },
    onError: () => {
      setIsProposalModalOpen(false);
      setProposalResult("fail");
    },
  });

  if (isLoading) return null;

  if (isError || !sale) {
    return <main className="min-h-screen bg-black text-white">�� ������ �ҷ����� ���߽��ϴ�.</main>;
  }

  const exchange = {
    description: sale.exchangeDescription ?? sale.exchange?.description ?? "",
    grade: sale.exchangeGrade ?? sale.exchange?.grade ?? "",
    genre: sale.exchangeGenre ?? sale.exchange?.genre ?? "",
  };

  const handleSelectCard = (card) => {
    if (!card) return;

    const normalizedCard = normalizeExchangeCard(card);
    setSelectedExchangeCard(normalizedCard);
    setIsExchangeModalOpen(false);
    setIsProposalModalOpen(true);
  };

  const handleSubmitProposal = ({ card, message }) => {
    if (!card) return;

    createProposal({
      saleId: Number(saleId),
      offeredCardCopyId: card.cardCopyId ?? card.id,
      description: message,
    });
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full px-[16px] pb-[80px] pt-[24px] desktop:w-[1480px] desktop:px-0 desktop:pb-[140px] desktop:pt-[124px]">
        <p className="font-brand mb-[24px] text-[14px] text-gray-300 desktop:mb-[60px] desktop:text-[24px]">
          �����÷��̽�
        </p>

        <h1 className="border-b border-gray-200 pb-[10px] text-[20px] font-bold leading-none desktop:pb-[20px] desktop:text-[40px]">
          {sale.name}
        </h1>

        <section className="mt-[20px] flex flex-col gap-[20px] desktop:mt-[70px] desktop:flex-row desktop:gap-[80px]">
          <MarketDetailImage imageUrl={sale.imageUrl} name={sale.name} />
          <MarketDetailInfo sale={sale} />
        </section>

        <ExchangeInfo
          exchange={exchange}
          onOpenExchangeModal={() => setIsExchangeModalOpen(true)}
        />

        <ExchangeSelectCardModal
          isOpen={isExchangeModalOpen}
          onClose={() => setIsExchangeModalOpen(false)}
          cards={exchangeCardList}
          selectedCardId={selectedCardId}
          onSelectCard={(card) => setSelectedCardId(card.id)}
          onConfirm={handleSelectCard}
          keyword={keyword}
          onKeywordChange={setKeyword}
          grade={grade}
          onGradeChange={setGrade}
          genre={genre}
          onGenreChange={setGenre}
          isLoading={isExchangeCardsLoading}
        />

        <ExchangeProposalFormModal
          isOpen={isProposalModalOpen}
          onClose={() => setIsProposalModalOpen(false)}
          card={selectedExchangeCard}
          onSubmit={handleSubmitProposal}
          isSubmitting={isPending}
        />

        <MyExchangeProposalList cards={myProposalCards} />

        <ExchangeProposalResultModal
          isOpen={!!proposalResult}
          isSuccess={proposalResult === "success"}
          onClose={() => setProposalResult(null)}
        />
      </div>
    </main>
  );
}
