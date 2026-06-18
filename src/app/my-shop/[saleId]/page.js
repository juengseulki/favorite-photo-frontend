"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { useSaleDetail } from "@/features/sales/hooks/useSaleDetail";
import { useCancelSale } from "@/features/sales/hooks/useCancelSale";
import { useModifySale } from "@/features/sales/hooks/useModifySale";
import { useExchangeProposals } from "@/features/sales/hooks/useExchangeProposals";
import { useAcceptExchangeProposal } from "@/features/sales/hooks/useAcceptExchangeProposal";
import { useRejectExchangeProposal } from "@/features/sales/hooks/useRejectExchangeProposal";
import GradeBadge from "@/components/common/Grade/GradeBadge";
import Button from "@/components/common/Button";
import { ExchangeCard } from "@/components/common/Card";
import { ExchangeDecisionModal } from "@/features/exchange";
import SaleEditModal from "@/features/sales/components/SaleEditModal";
import SaleTakeDownModal from "@/features/sales/components/SaleTakeDownModal";
import { getGenreLabel } from "@/lib/constants/cardOptions";
import { ROUTES } from "@/lib/constants/routes";

export default function MySaleDetailPage() {
  const { saleId } = useParams();
  const router = useRouter();
  const numericSaleId = Number(saleId);

  const { data: sale, isPending, isError } = useSaleDetail(numericSaleId);
  const { data: proposals = [] } = useExchangeProposals(numericSaleId);

  const { mutate: cancelSale, isPending: isCanceling } = useCancelSale(numericSaleId);
  const { mutate: modifySale, isPending: isModifying } = useModifySale(numericSaleId);
  const { mutate: acceptProposal, isPending: isAccepting } =
    useAcceptExchangeProposal(numericSaleId);
  const { mutate: rejectProposal, isPending: isRejecting } =
    useRejectExchangeProposal(numericSaleId);

  const [editOpen, setEditOpen] = useState(false);
  const [takeDownOpen, setTakeDownOpen] = useState(false);
  const [decisionState, setDecisionState] = useState(null);
  const [actionError, setActionError] = useState("");

  const isDecisionSubmitting = isAccepting || isRejecting;

  const closeDecisionModal = () => {
    setDecisionState(null);
    setActionError("");
  };

  const handleTakeDown = () => {
    setActionError("");
    cancelSale(undefined, {
      onSuccess: () => router.push(ROUTES.MY_SHOP),
      onError: (err) => {
        const message = err?.response?.data?.error?.message ?? "판매 내리기에 실패했습니다.";
        setActionError(message);
        setTakeDownOpen(false);
      },
    });
  };

  const handleEditSubmit = (payload) => {
    setActionError("");
    modifySale(payload, {
      onSuccess: () => setEditOpen(false),
      onError: (err) => {
        const message = err?.response?.data?.error?.message ?? "수정에 실패했습니다.";
        setActionError(message);
      },
    });
  };

  const handleDecisionConfirm = () => {
    if (!decisionState || isDecisionSubmitting) return;

    const { proposalId, decision } = decisionState;
    setActionError("");

    if (decision === "approve") {
      acceptProposal(proposalId, {
        onSuccess: () => closeDecisionModal(),
        onError: (err) => {
          const message = err?.response?.data?.error?.message ?? "승인에 실패했습니다.";
          setActionError(message);
        },
      });
      return;
    }

    rejectProposal(proposalId, {
      onSuccess: () => closeDecisionModal(),
      onError: (err) => {
        const message = err?.response?.data?.error?.message ?? "거절에 실패했습니다.";
        setActionError(message);
      },
    });
  };

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-[14px] text-gray-300">
        불러오는 중...
      </div>
    );
  }

  if (isError || !sale) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-[16px]">
        <p className="text-[14px] text-gray-300">판매 정보를 불러올 수 없습니다.</p>

        <Button variant="secondary" size="sm" onClick={() => router.push(ROUTES.MY_SHOP)}>
          목록으로
        </Button>
      </div>
    );
  }

  const hasExchange = sale.exchangeGrade || sale.exchangeGenre || sale.exchangeDescription;
  const isOnSale = sale.status === "ON_SALE";
  const pendingProposals = proposals.filter((proposal) => proposal.status === "PENDING");

  return (
    <main
      className="
        mx-auto w-full
        px-[20px] py-[40px]
        tablet:px-[40px] tablet:py-[60px]
        desktop:max-w-[1480px] desktop:px-[60px]
      "
    >
      <button
        type="button"
        onClick={() => router.push(ROUTES.MY_SHOP)}
        className="
          mb-[24px] flex items-center gap-[8px]
          text-[14px] text-gray-300
          transition hover:text-white
        "
      >
        <Image src="/img/icons/back.png" alt="" width={16} height={16} />
        목록으로
      </button>

      {/* 카드 제목 */}
      <div className="mb-[40px]">
        <h1 className="text-[32px] font-bold text-white tablet:text-[40px]">{sale.name}</h1>
        <div className="mt-[20px] h-[1px] bg-gray-400" />
      </div>

      {/* 상단: 이미지 + 판매 정보 */}
      <div
        className="
          flex flex-col gap-[32px]
          tablet:flex-row tablet:gap-[48px]
          desktop:gap-[80px]
        "
      >
        {/* 좌측: 카드 이미지 */}
        <div className="relative w-full shrink-0 tablet:w-[342px] desktop:w-[960px]">
          <div
            className="
              relative aspect-[4/3] w-full
              overflow-hidden
              border border-gray-400 bg-gray-500
            "
          >
            <Image
              src={sale.imageUrl}
              alt={sale.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 744px) 100vw, (max-width: 1200px) 342px, 960px"
            />
          </div>
        </div>

        {/* 우측: 판매 정보 */}
        <div className="flex flex-1 flex-col">
          {/* 등급 / 장르 / 판매자 닉네임 */}
          <div className="flex items-center gap-[10px]">
            <GradeBadge grade={sale.grade} size="md" />
            <span className="h-[14px] w-[1px] bg-gray-400" />
            <span className="text-[16px] font-bold text-gray-300">{getGenreLabel(sale.genre)}</span>
            {sale.sellerNickname && (
              <span className="ml-auto text-[16px] font-bold text-white underline">
                {sale.sellerNickname}
              </span>
            )}
          </div>

          <div className="my-[20px] h-[1px] bg-gray-400" />

          {sale.description && (
            <p className="text-[16px] leading-[1.6] text-white tablet:text-[18px]">
              {sale.description}
            </p>
          )}

          <div className="my-[20px] h-[1px] bg-gray-400" />

          {/* 가격 / 수량 */}
          <dl className="space-y-[10px]">
            <div className="flex items-center justify-between">
              <dt className="text-[18px] text-gray-300">가격</dt>
              <dd className="text-[20px] font-bold text-white">{sale.price?.toLocaleString()} P</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-[18px] text-gray-300">잔여</dt>
              <dd className="flex gap-[5px] text-[20px] font-bold">
                <span className="text-white">{sale.remainingQuantity}</span>
                <span className="font-normal text-gray-300">/ {sale.totalQuantity}</span>
              </dd>
            </div>
          </dl>

          {hasExchange && (
            <>
              <div className="my-[30px] h-[1px] bg-gray-400" />
              <div>
                <div className="mb-[20px] flex items-center gap-[10px]">
                  <Image
                    src="/img/icons/exchange.png"
                    alt=""
                    width={28}
                    height={28}
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                  <h2 className="text-[24px] font-bold text-white">교환 희망 정보</h2>
                </div>

                <div className="mb-[20px] flex items-center gap-[10px]">
                  {sale.exchangeGrade && <GradeBadge grade={sale.exchangeGrade} size="md" />}
                  {sale.exchangeGrade && sale.exchangeGenre && (
                    <span className="h-[14px] w-[1px] bg-gray-400" />
                  )}
                  {sale.exchangeGenre && (
                    <span className="text-[16px] font-bold text-gray-300">
                      {getGenreLabel(sale.exchangeGenre)}
                    </span>
                  )}
                </div>

                {sale.exchangeDescription && (
                  <p className="text-[16px] leading-[1.6] text-white">{sale.exchangeDescription}</p>
                )}
              </div>
            </>
          )}

          {/* 수정하기 / 판매 내리기 버튼 */}
          {isOnSale && (
            <div className="mt-[40px] flex flex-col gap-[20px]">
              <Button
                variant="primary"
                size="full"
                className="h-[80px] text-[20px]"
                onClick={() => setEditOpen(true)}
              >
                수정하기
              </Button>
              <Button
                variant="secondary"
                size="full"
                className="h-[80px] text-[20px]"
                onClick={() => setTakeDownOpen(true)}
              >
                판매 내리기
              </Button>
            </div>
          )}

          {actionError && !decisionState && (
            <p className="mt-[12px] text-[13px] text-red">{actionError}</p>
          )}
        </div>
      </div>

      {/* 교환 제시 목록 */}
      {isOnSale && (
        <section className="mt-[56px] tablet:mt-[64px] desktop:mt-[80px]">
          <div className="mb-[24px] tablet:mb-[32px] desktop:mb-[40px]">
            <h2 className="text-[32px] font-bold text-white tablet:text-[40px]">교환 제시 목록</h2>
            <div className="mt-[20px] h-[1px] bg-gray-400" />
          </div>

          {pendingProposals.length === 0 ? (
            <div className="flex min-h-[200px] items-center justify-center border border-gray-400">
              <p className="text-[14px] text-gray-300">아직 교환 제시가 없습니다.</p>
            </div>
          ) : (
            <div
              className="
                grid grid-cols-1 gap-[16px]
                grid-cols-1
                justify-items-stretch
                tablet:gap-[20px]
                desktop:grid-cols-2
              "
            >
              {pendingProposals.map((proposal) => {
                const offeredCard = proposal.offeredCardCopy?.photoCard;
                if (!offeredCard) return null;

                const cardItem = {
                  id: proposal.id,
                  name: offeredCard.name,
                  imageUrl: offeredCard.imageUrl,
                  grade: offeredCard.grade,
                  genre: getGenreLabel(offeredCard.genre),
                  price: proposal.sale?.price ?? 0,
                  description: proposal.description,
                  creator: { nickname: proposal.proposer?.nickname ?? "" },
                };

                return (
                  <div
                    key={proposal.id}
                    className="flex w-full justify-center desktop:justify-start"
                  >
                    <ExchangeCard
                      card={cardItem}
                      onAccept={() => {
                        setActionError("");
                        setDecisionState({
                          proposalId: proposal.id,
                          decision: "approve",
                          cardName: offeredCard.name,
                          grade: offeredCard.grade,
                        });
                      }}
                      onReject={() => {
                        setActionError("");
                        setDecisionState({
                          proposalId: proposal.id,
                          decision: "reject",
                          cardName: offeredCard.name,
                          grade: offeredCard.grade,
                        });
                      }}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* 수정하기 모달 */}
      <SaleEditModal
        key={sale?.saleId}
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        onSubmit={handleEditSubmit}
        sale={sale}
        isSubmitting={isModifying}
      />

      {/* 판매 내리기 모달 */}
      <SaleTakeDownModal
        isOpen={takeDownOpen}
        onClose={() => setTakeDownOpen(false)}
        onConfirm={handleTakeDown}
        isLoading={isCanceling}
      />

      {/* 승인/거절 모달 */}
      <ExchangeDecisionModal
        isOpen={Boolean(decisionState)}
        onClose={closeDecisionModal}
        onConfirm={handleDecisionConfirm}
        decision={decisionState?.decision ?? "reject"}
        cardName={decisionState?.cardName ?? ""}
        grade={decisionState?.grade ?? "COMMON"}
        errorMessage={actionError}
        isSubmitting={isDecisionSubmitting}
      />
    </main>
  );
}
