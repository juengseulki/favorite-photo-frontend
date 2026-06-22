"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";

import {
  ExchangeProposalFormModal,
  ExchangeSelectCardModal,
  ExchangeProposalResultModal,
} from "@/features/exchange";
import MyExchangeProposalList from "@/features/exchange/components/MyExchangeProposalList";

import { useExchangeCards } from "@/hooks/useExchangeCards";
import { useCreateExchangeSale } from "@/hooks/useCreateExchangeSale";
import { useSentExchangeProposals } from "@/hooks/useSentExchangeProposals";
import { useCancelExchangeProposal } from "@/hooks/useCancelExchangeProposal";

import { normalizeExchangeCard } from "@/lib/utils/exchangeMappers";

import { useMarketDetail } from "../hooks/useMarketDetail";
import MarketDetailImage from "./MarketDetailImage";
import MarketDetailInfo from "./MarketDetailInfo";
import ExchangeInfo from "./ExchangeInfo";

export default function MarketDetail() {
  const router = useRouter();
  const { saleId } = useParams();
  const parsedSaleId = Number(saleId);
  const isValidSaleId = Number.isInteger(parsedSaleId) && parsedSaleId > 0;
  const querySaleId = isValidSaleId ? parsedSaleId : null;
  const { data: sale, isLoading, isError, error } = useMarketDetail(querySaleId);

  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);

  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedExchangeCard, setSelectedExchangeCard] = useState(null);

  const [keyword, setKeyword] = useState("");
  const [grade, setGrade] = useState("");
  const [genre, setGenre] = useState("");

  const [proposalResult, setProposalResult] = useState(null);
  const [cancelingProposalId, setCancelingProposalId] = useState(null);

  const filters = useMemo(() => ({ keyword, grade, genre }), [keyword, grade, genre]);

  const { data: exchangeCards = [], isLoading: isExchangeCardsLoading } = useExchangeCards(
    filters,
    { enabled: isExchangeModalOpen },
  );

  const { data: sentProposals = [] } = useSentExchangeProposals(querySaleId);

  const exchangeCardList = useMemo(
    () => (Array.isArray(exchangeCards) ? exchangeCards.map(normalizeExchangeCard) : []),
    [exchangeCards],
  );

  const { mutate: createProposal, isPending } = useCreateExchangeSale({
    onSuccess: () => {
      setIsProposalModalOpen(false);
      setProposalResult("success");
      setSelectedExchangeCard(null);
      setSelectedCardId(null);
    },
    onError: () => {
      setIsProposalModalOpen(false);
      setProposalResult("fail");
    },
  });

  const { mutate: cancelProposal } = useCancelExchangeProposal(querySaleId);

  if (!isValidSaleId) notFound();

  if (isError) {
    const isNotFound = error?.response?.status === 404;

    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-[20px] bg-black px-[20px] text-center">
        <p className="text-[18px] font-bold text-white">
          {isNotFound ? "존재하지 않는 판매글입니다." : "상세 정보를 불러오지 못했습니다."}
        </p>

        <Link
          href={ROUTES.MARKET}
          className="text-[14px] font-bold text-main underline underline-offset-4"
        >
          마켓플레이스로 돌아가기
        </Link>
      </main>
    );
  }

  if (!sale) return null;

  const exchange = {
    description: sale.exchangeDescription ?? sale.exchange?.description ?? "",
    grade: sale.exchangeGrade ?? sale.exchange?.grade ?? "",
    genre: sale.exchangeGenre ?? sale.exchange?.genre ?? "",
  };

  const isSoldOut = sale.status === "SOLD_OUT" || sale.remainingQuantity === 0;

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
      saleId: parsedSaleId,
      offeredCardCopyId: card.cardCopyId ?? card.id,
      description: message,
    });
  };

  const handleCancelProposal = (proposal) => {
    if (!proposal?.id) return;

    setCancelingProposalId(proposal.id);
    cancelProposal(proposal.id, {
      onSettled: () => {
        setCancelingProposalId(null);
      },
    });
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="flex h-[60px] items-center border-b border-gray-450 px-[15px] tablet:hidden">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-[22px] w-[22px] shrink-0 items-center justify-center"
          aria-label="뒤로가기"
        >
          <Image
            src="/img/icons/back.png"
            alt=""
            width={22}
            height={22}
            className="h-[22px] w-[22px] object-contain"
          />
        </button>

        <h1 className="font-brand flex-1 text-center text-[16px] font-bold text-white">
          마켓플레이스
        </h1>

        <div className="h-[22px] w-[22px] shrink-0" />
      </header>

      <div className="mx-auto w-full px-[15px] pb-[80px] pt-[20px] tablet:px-[20px] tablet:pb-[100px] tablet:pt-[40px] desktop:w-[1480px] desktop:px-0 desktop:pb-[60px] desktop:pt-[40px]">
        <Link
          href={ROUTES.MARKET}
          className="
              group
              mb-[20px]
              hidden
              w-fit
              cursor-pointer

              font-brand
              text-[14px]
              text-gray-300

              transition-all
              duration-300

              hover:-translate-x-1
              hover:text-main

              tablet:block

              desktop:mb-[60px]
              desktop:text-[24px]
            "
        >
          <span
            className="
                border-b
                border-transparent
                transition-colors
                duration-300

                group-hover:border-main
              "
          >
            마켓플레이스
          </span>
        </Link>

        <h2 className="border-b border-gray-200 pt-[10px] pb-[10px] text-[24px] font-bold leading-none tablet:text-[32px] tablet:pt-[20px] tablet:pb-[20px] desktop:pb-[20px] desktop:text-[40px]">
          {sale.name}
        </h2>

        <section className="mt-[15px] flex flex-col gap-[20px] tablet:mt-[20px] tablet:flex-row tablet:gap-[20px] desktop:mt-[70px] desktop:gap-[80px]">
          <MarketDetailImage imageUrl={sale.imageUrl} name={sale.name} isSoldOut={isSoldOut} />

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
          onBack={() => {
            setIsProposalModalOpen(false);
            setIsExchangeModalOpen(true);
          }}
        />

        <MyExchangeProposalList
          proposals={sentProposals}
          onCancel={handleCancelProposal}
          cancelingProposalId={cancelingProposalId}
        />

        <ExchangeProposalResultModal
          isOpen={!!proposalResult}
          isSuccess={proposalResult === "success"}
          onClose={() => setProposalResult(null)}
        />
      </div>
    </main>
  );
}
