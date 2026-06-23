"use client";

import Image from "next/image";
import Button from "@/components/common/Button";
import GradeBadge from "@/components/common/Grade/GradeBadge";
import { getGenreLabel } from "@/lib/constants/marketOptions";

function mapProposalToCard(proposal) {
  const photoCard = proposal?.offeredCardCopy?.photoCard;

  if (!photoCard) return null;

  return {
    id: proposal.offeredCardCopyId ?? proposal.id,
    cardCopyId: proposal.offeredCardCopyId,
    name: photoCard.name,
    imageUrl: photoCard.imageUrl,
    grade: photoCard.grade,
    genre: photoCard.genre,
    price: proposal.sale?.price ?? 0,
    count: 1,
    description: proposal.description,
    nickname:
      proposal.proposer?.nickname ??
      proposal.ownerNickname ??
      photoCard.ownerNickname ??
      photoCard.creator?.nickname ??
      "사용자",
  };
}

function ProposalCard({ proposal, card, onCancel, isCanceling }) {
  return (
    <article className="w-full border border-gray-400 bg-gray-500 p-[18px] text-white tablet:p-[24px] desktop:p-[36px]">
      <div className="relative h-[220px] w-full overflow-hidden bg-black tablet:h-[236px]">
        <Image
          src={card.imageUrl}
          alt={card.name}
          fill
          sizes="(min-width: 1920px) 390px, (min-width: 744px) 320px, 100vw"
          className="object-cover"
        />
      </div>

      <h3 className="mt-[18px] truncate text-[20px] font-bold text-white desktop:mt-[24px] desktop:text-[22px]">
        {card.name}
      </h3>

      <div className="mt-[12px] flex items-start justify-between gap-[12px]">
        <div className="flex min-w-0 flex-wrap items-center gap-x-[8px] gap-y-[6px]">
          <GradeBadge grade={card.grade} size="xs" />

          <span className="h-[14px] w-px shrink-0 bg-gray-400" />

          <span className="break-words text-[14px] text-gray-300">{getGenreLabel(card.genre)}</span>

          <span className="hidden h-[14px] w-px shrink-0 bg-gray-400 tablet:block" />

          <span className="hidden text-[14px] text-gray-300 tablet:inline">
            {Number(card.price).toLocaleString()} P에 구매
          </span>
        </div>

        <span className="max-w-[90px] break-words text-right text-[14px] font-bold text-white underline underline-offset-4 desktop:max-w-[120px]">
          {card.nickname}
        </span>
      </div>

      <p className="mt-[28px] min-h-[48px] break-words text-[15px] leading-[24px] text-white desktop:mt-[36px] desktop:text-[16px]">
        {card.description || "교환 설명이 없습니다."}
      </p>

      <Button
        variant="secondary"
        className="mt-[36px] h-[52px] w-full text-[16px] desktop:mt-[50px] desktop:h-[55px]"
        onClick={() => onCancel?.(proposal)}
        disabled={isCanceling}
      >
        {isCanceling ? "취소 중..." : "취소하기"}
      </Button>
    </article>
  );
}

export default function MyExchangeProposalList({
  proposals = [],
  onCancel,
  cancelingProposalId = null,
}) {
  const pendingProposals = proposals.filter((proposal) => proposal.status === "PENDING");

  if (!pendingProposals.length) return null;

  return (
    <section className="mt-[80px]">
      <h2 className="border-b border-gray-200 pb-[20px] text-[24px] font-bold text-white tablet:text-[32px] desktop:text-[40px]">
        내가 제시한 교환 목록
      </h2>

      <div className="mt-[30px] grid grid-cols-1 gap-[24px] tablet:grid-cols-2 desktop:mt-[40px] desktop:grid-cols-3">
        {pendingProposals.map((proposal) => {
          const card = mapProposalToCard(proposal);
          if (!card) return null;

          const isCanceling = cancelingProposalId === proposal.id;

          return (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              card={card}
              onCancel={onCancel}
              isCanceling={isCanceling}
            />
          );
        })}
      </div>
    </section>
  );
}
