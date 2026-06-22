"use client";

import { useEffect, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import Image from "next/image";

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
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { useAuth } from "@/providers/AuthProvider";

import toast from "react-hot-toast";
import { ROUTES } from "@/lib/constants/routes";
import styles from "./page.module.css";

function SwapIcon() {
  return (
    <svg
      className={styles["onp-swap-icon"]}
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17 1l4 4-4 4" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <path d="M7 23l-4-4 4-4" />
      <path d="M21 13v-2a4 4 0 0 0-4-4H3" />
    </svg>
  );
}

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

export default function Page() {
  const { saleId } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const parsedSaleId = Number(saleId);
  const isValidSaleId = Number.isInteger(parsedSaleId) && parsedSaleId > 0;
  const querySaleId = isValidSaleId ? parsedSaleId : null;

  const { data: sale, isLoading, isError, error } = useSaleDetail(querySaleId);
  const { data: proposals = [] } = useExchangeProposals(querySaleId);

  const { mutate: modifySale, isPending: isModifying } = useModifySale(querySaleId);
  const { mutate: cancelSale, isPending: isCanceling } = useCancelSale(querySaleId);
  const { mutate: acceptProposal, isPending: isAccepting } = useAcceptExchangeProposal(querySaleId);
  const { mutate: rejectProposal, isPending: isRejecting } = useRejectExchangeProposal(querySaleId);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isTakeDownOpen, setIsTakeDownOpen] = useState(false);
  const [decisionModal, setDecisionModal] = useState(null);

  useEffect(() => {
    if (!sale || !user) return;

    if (sale.sellerId && sale.sellerId !== user.id) {
      router.replace(ROUTES.MY_SHOP);
      return;
    }

    if (!sale.sellerId && sale.sellerNickname && sale.sellerNickname !== user.nickname) {
      router.replace(ROUTES.MY_SHOP);
    }
  }, [router, sale, user]);

  if (!isValidSaleId) {
    notFound();
  }

  if (isLoading) {
    return (
      <div className={styles["onp-root"]}>
        <div className={styles["onp-page"]} />
      </div>
    );
  }

  if (isError) {
    if (error?.response?.status === 404) {
      notFound();
    }

    return (
      <div className={styles["onp-root"]}>
        <div className={styles["onp-page"]}>
          <p className={styles["onp-desc"]}>판매 정보를 불러오지 못했습니다.</p>
        </div>
      </div>
    );
  }

  if (!sale) {
    notFound();
  }

  const isNotOwner =
    !!user &&
    ((sale.sellerId && sale.sellerId !== user.id) ||
      (!sale.sellerId && sale.sellerNickname && sale.sellerNickname !== user.nickname));

  if (isNotOwner) {
    return null;
  }

  const remainingQuantity = sale.remainingQuantity ?? 0;
  const totalQuantity = sale.totalQuantity ?? 0;
  const hasExchangeWish = sale.exchangeGrade || sale.exchangeGenre || sale.exchangeDescription;

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
    <ProtectedRoute>
      <div className={styles["onp-root"]}>
        <div className={styles["onp-page"]}>
          <main>
            <p className="mb-6 font-brand text-[10px] font-bold leading-none text-white desktop:text-[18px]">
              마켓플레이스
            </p>
            <h1 className={styles["onp-title"]}>{sale.name}</h1>
            <div className={`${styles["onp-rule"]} ${styles["onp-rule-strong"]}`} />

            <div className={styles["onp-detail-grid"]}>
              <div className={styles["onp-media"]}>
                {sale.imageUrl && (
                  <Image
                    src={sale.imageUrl}
                    alt={sale.name}
                    fill
                    className="object-cover"
                    style={{ borderRadius: "var(--r-img)" }}
                  />
                )}
              </div>

              <div className={styles["onp-info"]}>
                <div className={styles["onp-meta-row"]}>
                  <div className={styles["onp-meta-left"]}>
                    <span className={styles["onp-rarity"]}>{sale.grade}</span>
                    <span className={styles["onp-sep"]}>|</span>
                    <span className={styles["onp-cat"]}>{sale.genre}</span>
                  </div>
                  <span className={styles["onp-seller"]}>{sale.sellerNickname}</span>
                </div>

                <p className={styles["onp-desc"]}>{sale.description}</p>

                <div className={styles["onp-stats"]}>
                  <div className={styles["onp-stat-row"]}>
                    <span className={styles["onp-stat-label"]}>가격</span>
                    <span className={styles["onp-stat-value"]}>
                      {sale.price?.toLocaleString()} P
                    </span>
                  </div>
                  <div className={styles["onp-stat-row"]}>
                    <span className={styles["onp-stat-label"]}>잔여</span>
                    <span className={styles["onp-stat-value"]}>
                      {remainingQuantity}
                      <span className={styles["onp-stat-dim"]}> / {totalQuantity}</span>
                    </span>
                  </div>
                </div>

                {hasExchangeWish && (
                  <>
                    <div className={styles["onp-wish-head"]}>
                      <SwapIcon />
                      <span>교환 희망 정보</span>
                    </div>
                    <div className={styles["onp-rule"]} />

                    <div className={`${styles["onp-meta-row"]} ${styles["onp-wish-meta"]}`}>
                      <div className={styles["onp-meta-left"]}>
                        {sale.exchangeGrade && (
                          <span className={styles["onp-rarity"]}>{sale.exchangeGrade}</span>
                        )}
                        {sale.exchangeGrade && sale.exchangeGenre && (
                          <span className={styles["onp-sep"]}>|</span>
                        )}
                        {sale.exchangeGenre && (
                          <span className={styles["onp-cat"]}>{sale.exchangeGenre}</span>
                        )}
                      </div>
                    </div>
                    {sale.exchangeDescription && (
                      <p className={styles["onp-desc"]}>{sale.exchangeDescription}</p>
                    )}
                  </>
                )}

                <div className={styles["onp-actions"]}>
                  <button
                    type="button"
                    className={`${styles["onp-btn"]} ${styles["onp-btn-primary"]}`}
                    onClick={() => setIsEditOpen(true)}
                  >
                    수정하기
                  </button>
                  <button
                    type="button"
                    className={`${styles["onp-btn"]} ${styles["onp-btn-ghost"]}`}
                    onClick={() => setIsTakeDownOpen(true)}
                  >
                    판매 내리기
                  </button>
                </div>
              </div>
            </div>

            <section className={styles["onp-offers-section"]}>
              <h2 className={`${styles["onp-title"]} ${styles["onp-title-sm"]}`}>교환 제시 목록</h2>
              <div className={`${styles["onp-rule"]} ${styles["onp-rule-strong"]}`} />

              {proposals.length === 0 ? (
                <p className={styles["onp-desc"]}>받은 교환 제시가 없습니다.</p>
              ) : (
                <div className={styles["onp-offers-grid"]}>
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
          </main>
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
      </div>
    </ProtectedRoute>
  );
}
