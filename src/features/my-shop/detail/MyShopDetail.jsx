"use client";

import { useState } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

import Button from "@/components/common/Button";
import GradeBadge from "@/components/common/Grade/GradeBadge";
import { ROUTES } from "@/lib/constants/routes";

import { useSaleDetail } from "@/features/sales/hooks/useSaleDetail";
import { useExchangeProposals } from "@/features/sales/hooks/useExchangeProposals";
import { useModifySale } from "@/features/sales/hooks/useModifySale";
import { useCancelSale } from "@/features/sales/hooks/useCancelSale";
import { useAcceptExchangeProposal } from "@/features/sales/hooks/useAcceptExchangeProposal";
import { useRejectExchangeProposal } from "@/features/sales/hooks/useRejectExchangeProposal";

import SaleEditModal from "@/features/sales/components/SaleEditModal";
import SaleTakeDownModal from "@/features/sales/components/SaleTakeDownModal";
import ExchangeDecisionModal from "@/features/exchange/components/ExchangeDecisionModal";
import ExchangeRequestCard from "@/features/exchange/components/ExchangeRequestCard";

function mapProposalToCard(proposal) {
  const photoCard = proposal?.offeredCardCopy?.photoCard;

  if (!photoCard) return null;

  return {
    id: proposal.offeredCardCopyId ?? proposal.id,
    name: photoCard.name,
    imageUrl: photoCard.imageUrl,
    grade: photoCard.grade,
    genre: photoCard.genre,
    price: proposal.sale?.price ?? 0,
    description: proposal.description,
    creator: { nickname: proposal.proposer?.nickname ?? "사용자" },
  };
}

export default function MyShopDetail() {
  const router = useRouter();
  const { saleId } = useParams();

  const { data: sale, isLoading, isError, error } = useSaleDetail(saleId);
  const { data: proposals = [] } = useExchangeProposals(saleId);

  const { mutate: modifySale, isPending: isModifying } = useModifySale(saleId);
  const { mutate: cancelSale, isPending: isCanceling } = useCancelSale(saleId);
  const { mutate: acceptProposal, isPending: isAccepting } = useAcceptExchangeProposal(saleId);
  const { mutate: rejectProposal, isPending: isRejecting } = useRejectExchangeProposal(saleId);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isTakeDownOpen, setIsTakeDownOpen] = useState(false);
  const [decisionModal, setDecisionModal] = useState(null);

  if (isLoading) return null;

  if (isError) {
    if (error?.response?.status === 404) notFound();

    return (
      <main className="flex min-h-screen items-center justify-center bg-black">
        <p className="text-[14px] text-gray-300">판매 정보를 불러오지 못했습니다.</p>
      </main>
    );
  }

  if (!sale) return null;

  const remainingQuantity = sale.remainingQuantity ?? 0;
  const totalQuantity = sale.totalQuantity ?? 0;

  const exchange = {
    grade: sale.exchangeGrade ?? sale.exchange?.grade ?? "",
    genre: sale.exchangeGenre ?? sale.exchange?.genre ?? "",
    description: sale.exchangeDescription ?? sale.exchange?.description ?? "",
  };

  const hasExchangeWish = exchange.grade || exchange.genre || exchange.description;

  const handleEditSubmit = (payload) => {
    modifySale(payload, {
      onSuccess: () => setIsEditOpen(false),
    });
  };

  const handleTakeDown = () => {
    cancelSale(undefined, {
      onSuccess: () => {
        setIsTakeDownOpen(false);
        router.push(ROUTES.MY_SHOP);
      },
      onError: (err) => {
        const message = err?.response?.data?.error?.message;
        toast.error(
          message ?? "판매를 내릴 수 없습니다. 진행 중인 교환이나 구매가 있는지 확인해 주세요.",
        );
        setIsTakeDownOpen(false);
      },
    });
  };

  const handleDecisionConfirm = () => {
    if (!decisionModal) return;

    const { proposalId, decision } = decisionModal;
    const mutate = decision === "approve" ? acceptProposal : rejectProposal;

    mutate(proposalId, {
      onSettled: () => setDecisionModal(null),
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
          나의 판매 포토카드
        </h1>

        <div className="h-[22px] w-[22px] shrink-0" />
      </header>

      <div className="mx-auto w-full px-[15px] pb-[80px] pt-[20px] tablet:px-[20px] tablet:pb-[100px] tablet:pt-[40px] desktop:w-[1480px] desktop:px-0 desktop:pb-[80px] desktop:pt-[124px]">
        <Link
          href={ROUTES.MY_SHOP}
          className="font-brand mb-[20px] hidden text-[14px] text-gray-300 tablet:block desktop:mb-[60px] desktop:text-[24px]"
        >
          나의 판매 포토카드
        </Link>

        <h2 className="border-b border-gray-200 pb-[10px] pt-[10px] text-[24px] font-bold leading-none tablet:pb-[20px] tablet:pt-[20px] tablet:text-[32px] desktop:text-[40px]">
          {sale.name}
        </h2>

        <section className="mt-[15px] flex flex-col gap-[20px] tablet:mt-[20px] tablet:flex-row tablet:gap-[20px] desktop:mt-[70px] desktop:gap-[80px]">
          <div
            className="
                relative
                shrink-0
                overflow-hidden
                bg-gray-500

                h-[259px]
                w-full

                mobile:h-[259px]
                mobile:w-[345px]

                tablet:h-[257px]
                tablet:w-[342px]

                desktop:h-[720px]
                desktop:w-[960px]
            "
          >
            <Image
              src={sale.imageUrl}
              alt={sale.name}
              fill
              className="object-cover"
              sizes="(min-width: 1920px) 960px, (min-width: 744px) 342px, 345px"
              priority
            />
          </div>

          <aside className="flex w-full min-w-0 shrink flex-col tablet:w-[342px] desktop:w-[440px] desktop:shrink-0">
            <div className="flex items-center justify-between border-b border-gray-450 pb-[12px] desktop:pb-[24px]">
              <div className="mt-[20px] flex min-w-0 items-center gap-[8px] pb-[20px] desktop:gap-[15px]">
                <GradeBadge grade={sale.grade} size="m" />
                <span className="text-[16px] text-gray-300 desktop:text-[24px]">|</span>
                <span className="text-[16px] text-gray-300 desktop:text-[24px]">{sale.genre}</span>
              </div>

              <span className="mt-[30px] pb-[30px] text-[18px] font-bold underline underline-offset-4 desktop:text-[24px]">
                {sale.sellerNickname}
              </span>
            </div>

            <p className="border-b border-gray-450 py-[20px] text-[16px] leading-[22px] text-white desktop:py-[29px] desktop:text-[18px] desktop:leading-normal">
              {sale.description}
            </p>

            <div className="border-b border-gray-450 py-[20px] desktop:py-[24px]">
              <InfoRow label="가격" value={`${(sale.price ?? 0).toLocaleString()} P`} />
              <InfoRow
                label="잔여"
                value={`${remainingQuantity} / ${totalQuantity}`}
                className="mt-[10px]"
              />
            </div>

            {hasExchangeWish && (
              <section className="mt-[24px]">
                <h3 className="flex items-center gap-[8px] border-b border-gray-450 pb-[14px] text-[18px] font-bold desktop:text-[20px]">
                  <span className="text-main">↻</span>
                  교환 희망 정보
                </h3>

                <div className="mt-[18px] flex items-center gap-[10px]">
                  {exchange.grade && <GradeBadge grade={exchange.grade} />}
                  {exchange.grade && exchange.genre && (
                    <span className="h-[14px] w-px bg-gray-400" />
                  )}
                  {exchange.genre && (
                    <span className="text-[14px] text-gray-300 desktop:text-[18px]">
                      {exchange.genre}
                    </span>
                  )}
                </div>

                {exchange.description && (
                  <p className="mt-[16px] text-[14px] leading-[22px] text-white desktop:text-[16px]">
                    {exchange.description}
                  </p>
                )}
              </section>
            )}

            <div className="mt-[40px] flex flex-col gap-[10px] desktop:mt-[60px]">
              <Button
                variant="primary"
                className="h-[55px] w-full rounded-[2px] py-0 text-[16px] font-bold desktop:h-[60px] desktop:text-[18px]"
                onClick={() => setIsEditOpen(true)}
              >
                수정하기
              </Button>

              <Button
                variant="secondary"
                className="h-[55px] w-full rounded-[2px] py-0 text-[16px] font-bold desktop:h-[60px] desktop:text-[18px]"
                onClick={() => setIsTakeDownOpen(true)}
              >
                판매 내리기
              </Button>
            </div>
          </aside>
        </section>

        <section className="mt-[80px] desktop:mt-[120px]">
          <h2 className="border-b border-gray-200 pb-[20px] text-[22px] font-bold tablet:text-[28px] desktop:text-[40px]">
            교환 제시 목록
          </h2>

          {proposals.length === 0 ? (
            <p className="mt-[30px] text-[14px] text-gray-300">받은 교환 제시가 없습니다.</p>
          ) : (
            <div className="mt-[30px] grid grid-cols-2 gap-x-[5px] gap-y-[20px] tablet:grid-cols-2 tablet:gap-[20px] desktop:mt-[48px] desktop:flex desktop:gap-[40px]">
              {proposals.map((proposal) => {
                const card = mapProposalToCard(proposal);
                if (!card) return null;

                const status = proposal.status?.toLowerCase() ?? "pending";

                return (
                  <ExchangeRequestCard
                    key={proposal.id}
                    card={card}
                    status={status}
                    onAccept={() =>
                      setDecisionModal({
                        proposalId: proposal.id,
                        decision: "approve",
                        cardName: card.name,
                        grade: card.grade,
                      })
                    }
                    onReject={() =>
                      setDecisionModal({
                        proposalId: proposal.id,
                        decision: "reject",
                        cardName: card.name,
                        grade: card.grade,
                      })
                    }
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>

      <SaleEditModal
        key={sale?.id || "empty"}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleEditSubmit}
        sale={sale}
        isSubmitting={isModifying}
      />

      <SaleTakeDownModal
        isOpen={isTakeDownOpen}
        onClose={() => setIsTakeDownOpen(false)}
        onConfirm={handleTakeDown}
        isLoading={isCanceling}
      />

      <ExchangeDecisionModal
        isOpen={!!decisionModal}
        onClose={() => setDecisionModal(null)}
        onConfirm={handleDecisionConfirm}
        decision={decisionModal?.decision}
        cardName={decisionModal?.cardName}
        grade={decisionModal?.grade}
        isSubmitting={isAccepting || isRejecting}
      />
    </main>
  );
}

function InfoRow({ label, value, className = "" }) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <span className="text-[18px] text-gray-300 desktop:text-[20px]">{label}</span>
      <strong className="text-right text-[20px] font-bold text-white desktop:text-[24px]">
        {value}
      </strong>
    </div>
  );
}
