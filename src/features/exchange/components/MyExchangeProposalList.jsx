"use client";

import Button from "@/components/common/Button";
import { PhotoCard } from "@/components/common/Card";

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
    creator: {
      nickname: proposal.proposer?.nickname ?? "사용자",
    },
  };
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
      <h2 className="border-b border-gray-200 pb-[20px] text-[32px] font-bold">
        내가 제시한 교환 목록
      </h2>

      <div className="mt-[40px] grid grid-cols-3 gap-[24px]">
        {pendingProposals.map((proposal) => {
          const card = mapProposalToCard(proposal);
          if (!card) return null;

          const isCanceling = cancelingProposalId === proposal.id;

          return (
            <div key={proposal.id} className="space-y-4">
              <PhotoCard card={card} />

              <div className="space-y-2">
                <p className="text-[14px] font-medium text-gray-300">상태: {proposal.status}</p>
                {proposal.description ? (
                  <p className="line-clamp-2 text-[14px] text-gray-300">{proposal.description}</p>
                ) : (
                  <p className="text-[14px] text-gray-300">교환 설명이 없습니다.</p>
                )}
              </div>

              <Button
                variant="secondary"
                size="full"
                className="h-[52px] text-[16px]"
                onClick={() => onCancel?.(proposal)}
                disabled={isCanceling}
              >
                {isCanceling ? "취소 중..." : "취소하기"}
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
