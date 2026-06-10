"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Button from "@/components/common/Button";
import {
  ExchangeDecisionModal,
  ExchangeRequestCard,
  ExchangeSelectCardModal,
  fetchExchangeProposals,
  useCreateExchangeSale,
  useExchangeFilters,
  useRespondExchange,
} from "@/features/exchange";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { useAuth } from "@/providers/AuthProvider";

const DESCRIPTION_MAX_LENGTH = 300;

const PREVIEW_CARD_OPTIONS = [
  {
    id: 1001,
    name: "스페인 여행",
    imageUrl: "/img/images/img1.png",
    grade: "COMMON",
    genre: "풍경",
    count: 1,
    price: 4,
    description: "실제 테스트 시에는 이 값을 본인 카드 사본 ID로 바꿔주세요.",
    creator: {
      nickname: "프로여행러",
    },
  },
  {
    id: 1002,
    name: "How Far I’ll Go",
    imageUrl: "/img/images/img2.png",
    grade: "SUPER RARE",
    genre: "풍경",
    count: 1,
    price: 4,
    description: "선택 모달 UI 확인용 예시 카드입니다.",
    creator: {
      nickname: "밸스타",
    },
  },
];

const UI_PREVIEW_RECEIVED_PROPOSALS = [
  {
    id: 9001,
    saleId: 201,
    offeredCardCopyId: 301,
    status: "PENDING",
    description: "겨울 풍경 카드와 교환 희망합니다.",
    proposer: { nickname: "프로여행러" },
    sale: { price: 4 },
    offeredCardCopy: {
      photoCard: {
        name: "스페인 여행",
        imageUrl: "/img/images/img1.png",
        grade: "COMMON",
        genre: "풍경",
      },
    },
  },
  {
    id: 9002,
    saleId: 202,
    offeredCardCopyId: 302,
    status: "ACCEPTED",
    description: "여름 바다 풍경 카드와 바꾸고 싶어요.",
    proposer: { nickname: "밸스타" },
    sale: { price: 4 },
    offeredCardCopy: {
      photoCard: {
        name: "How Far I’ll Go",
        imageUrl: "/img/images/img2.png",
        grade: "SUPER RARE",
        genre: "풍경",
      },
    },
  },
  {
    id: 9003,
    saleId: 203,
    offeredCardCopyId: 303,
    status: "REJECTED",
    description: "도심 야경 카드와 교환 문의드립니다.",
    proposer: { nickname: "나이트러버" },
    sale: { price: 6 },
    offeredCardCopy: {
      photoCard: {
        name: "미드나잇 시티",
        imageUrl: "/img/images/img1.png",
        grade: "RARE",
        genre: "풍경",
      },
    },
  },
  {
    id: 9004,
    saleId: 204,
    offeredCardCopyId: 304,
    status: "CANCELED",
    description: "다른 교환이 먼저 성사되어 취소된 상태 예시입니다.",
    proposer: { nickname: "캔슬러" },
    sale: { price: 3 },
    offeredCardCopy: {
      photoCard: {
        name: "선셋 코스트",
        imageUrl: "/img/images/img2.png",
        grade: "COMMON",
        genre: "풍경",
      },
    },
  },
];

const UI_PREVIEW_SENT_PROPOSALS = [
  {
    id: 9101,
    saleId: 211,
    offeredCardCopyId: 311,
    status: "PENDING",
    description: "보낸 교환 요청 카드 UI 예시입니다.",
    proposer: { nickname: "나" },
    sale: { price: 5 },
    offeredCardCopy: {
      photoCard: {
        name: "오로라 레이크",
        imageUrl: "/img/images/img2.png",
        grade: "LEGENDARY",
        genre: "풍경",
      },
    },
  },
  {
    id: 9102,
    saleId: 212,
    offeredCardCopyId: 312,
    status: "REJECTED",
    description: "거절된 보낸 교환 요청 상태 예시입니다.",
    proposer: { nickname: "나" },
    sale: { price: 2 },
    offeredCardCopy: {
      photoCard: {
        name: "스노우 가든",
        imageUrl: "/img/images/img1.png",
        grade: "RARE",
        genre: "풍경",
      },
    },
  },
];

function getErrorMessage(error, fallbackMessage) {
  return error?.response?.data?.error?.message ?? error?.message ?? fallbackMessage;
}

function mapProposalToCard(proposal) {
  const offeredPhotoCard = proposal?.offeredCardCopy?.photoCard ?? {};

  return {
    id: proposal?.id ?? offeredPhotoCard?.id ?? Math.random(),
    name: offeredPhotoCard?.name ?? "포토카드",
    imageUrl: offeredPhotoCard?.imageUrl ?? "/img/images/img1.png",
    grade: offeredPhotoCard?.grade ?? "COMMON",
    genre: offeredPhotoCard?.genre ?? "기타",
    price: proposal?.sale?.price ?? 0,
    count: 1,
    description: proposal?.description?.trim() || "교환 설명이 아직 없습니다.",
    creator: {
      nickname: proposal?.proposer?.nickname ?? "사용자",
    },
  };
}

function ProposalSection({
  title,
  description,
  proposals,
  isLoading,
  error,
  emptyMessage,
  actionable = false,
  onAccept,
  onReject,
}) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-[24px] font-bold text-white">{title}</h2>
        <p className="mt-2 text-[14px] text-gray-300">{description}</p>
      </div>

      {isLoading ? (
        <div className="flex min-h-[240px] items-center justify-center border border-gray-400">
          <p className="text-[15px] text-gray-300">교환 제안 목록을 불러오는 중입니다.</p>
        </div>
      ) : error ? (
        <div className="flex min-h-[240px] flex-col items-center justify-center gap-2 border border-red-500 px-6 text-center">
          <p className="text-[16px] font-bold text-white">
            {getErrorMessage(error, "교환 제안 목록을 불러오지 못했습니다.")}
          </p>
          <p className="text-[14px] text-gray-300">로그인 상태와 API 서버 연결을 확인해주세요.</p>
        </div>
      ) : !proposals.length ? (
        <div className="flex min-h-[240px] items-center justify-center border border-gray-400 px-6 text-center">
          <p className="text-[15px] text-gray-300">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid gap-6 desktop:grid-cols-2">
          {proposals.map((proposal) => {
            const card = mapProposalToCard(proposal);
            const status = proposal.status?.toLowerCase() ?? "pending";

            return (
              <div key={proposal.id} className="space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-[13px] text-gray-300">
                  <span>제안 ID: {proposal.id}</span>
                  <span>판매글 ID: {proposal.saleId}</span>
                  <span>제시 카드 ID: {proposal.offeredCardCopyId}</span>
                </div>

                <ExchangeRequestCard
                  card={card}
                  status={status}
                  disabled={!actionable}
                  onAccept={
                    actionable && status === "pending" ? () => onAccept?.(proposal) : undefined
                  }
                  onReject={
                    actionable && status === "pending" ? () => onReject?.(proposal) : undefined
                  }
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default function ExchangeTestPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [saleId, setSaleId] = useState("");
  const [offeredCardCopyId, setOfferedCardCopyId] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionValidation, setDescriptionValidation] = useState("");
  const [selectedCardId, setSelectedCardId] = useState(PREVIEW_CARD_OPTIONS[0].id);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [decisionModalType, setDecisionModalType] = useState(null);
  const [activeProposal, setActiveProposal] = useState(null);
  const [createFeedbackMessage, setCreateFeedbackMessage] = useState("");
  const [createFeedbackType, setCreateFeedbackType] = useState("info");
  const [actionSuccessMessage, setActionSuccessMessage] = useState("");
  const { keyword, setKeyword, grade, setGrade, genre, setGenre } = useExchangeFilters();

  const canUseExchange = !authLoading && Boolean(user);

  const filteredPreviewCards = useMemo(() => {
    return PREVIEW_CARD_OPTIONS.filter((card) => {
      const matchesKeyword =
        !keyword ||
        card.name.toLowerCase().includes(keyword.toLowerCase()) ||
        card.description.toLowerCase().includes(keyword.toLowerCase());
      const matchesGrade = grade === "ALL" || card.grade === grade;
      const matchesGenre = genre === "ALL" || card.genre === genre;

      return matchesKeyword && matchesGrade && matchesGenre;
    });
  }, [genre, grade, keyword]);

  const selectedPreviewCard = useMemo(
    () => PREVIEW_CARD_OPTIONS.find((card) => card.id === selectedCardId) ?? null,
    [selectedCardId],
  );

  const sentQuery = useQuery({
    queryKey: QUERY_KEYS.EXCHANGES.SENT(),
    queryFn: () =>
      fetchExchangeProposals({
        type: "sent",
        page: 1,
        limit: 20,
      }),
    enabled: canUseExchange,
  });

  const receivedQuery = useQuery({
    queryKey: QUERY_KEYS.EXCHANGES.RECEIVED(),
    queryFn: () =>
      fetchExchangeProposals({
        type: "received",
        page: 1,
        limit: 20,
      }),
    enabled: canUseExchange,
  });

  const createProposalMutation = useCreateExchangeSale({
    onSuccess: (data) => {
      setCreateFeedbackType("success");
      setCreateFeedbackMessage(`교환 제안이 생성되었습니다. (proposalId: ${data?.id ?? "-"})`);
      setDescription("");
      setDescriptionValidation("");
    },
    onError: (error) => {
      setCreateFeedbackType("error");
      setCreateFeedbackMessage(getErrorMessage(error, "교환 제안 생성에 실패했습니다."));
    },
  });

  const respondMutation = useRespondExchange({
    onSuccess: (_, variables) => {
      setActionSuccessMessage(
        variables.decision === "approve"
          ? "교환 제안을 승인했습니다."
          : "교환 제안을 거절했습니다.",
      );
      setDecisionModalType(null);
      setActiveProposal(null);
    },
    onError: () => {
      setActionSuccessMessage("");
    },
  });

  const sentItems = sentQuery.data?.items ?? [];
  const receivedItems = receivedQuery.data?.items ?? [];

  const handleDescriptionChange = (value) => {
    setDescription(value);

    const trimmedValue = value.trim();

    if (!trimmedValue) {
      setDescriptionValidation("");
      return;
    }

    if (trimmedValue.length > DESCRIPTION_MAX_LENGTH) {
      setDescriptionValidation(`교환 제시 내용은 ${DESCRIPTION_MAX_LENGTH}자 이하로 입력해주세요.`);
      return;
    }

    setDescriptionValidation("");
  };

  const handleSubmitProposal = () => {
    if (!canUseExchange) return;

    const trimmedDescription = description.trim();

    setCreateFeedbackMessage("");
    setCreateFeedbackType("info");

    if (!trimmedDescription) {
      setDescriptionValidation("교환 제시 내용을 입력해주세요.");
      return;
    }

    if (trimmedDescription.length > DESCRIPTION_MAX_LENGTH) {
      setDescriptionValidation(`교환 제시 내용은 ${DESCRIPTION_MAX_LENGTH}자 이하로 입력해주세요.`);
      return;
    }

    setDescriptionValidation("");

    createProposalMutation.mutate({
      saleId,
      offeredCardCopyId,
      description: trimmedDescription,
    });
  };

  const handleOpenDecisionModal = (decision, proposal) => {
    if (!canUseExchange) return;
    setDecisionModalType(decision);
    setActiveProposal(proposal);
    setActionSuccessMessage("");
  };

  const handleConfirmDecision = () => {
    if (!activeProposal || !decisionModalType || respondMutation.isPending) return;

    respondMutation.mutate({
      proposalId: activeProposal.id,
      decision: decisionModalType,
    });
  };

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-[1280px] space-y-12">
        <section className="space-y-4">
          <div>
            <p className="text-[14px] text-gray-300">교환 API 연동 테스트 페이지</p>
            <h1 className="mt-2 text-[36px] font-bold">Exchange API Test</h1>
          </div>

          <div className="grid gap-6 border border-gray-400 p-6 desktop:grid-cols-2">
            <div className="space-y-3">
              <h2 className="text-[20px] font-bold">로그인 상태</h2>
              <p className="text-[14px] text-gray-300">
                {authLoading
                  ? "인증 상태를 확인하는 중입니다."
                  : user
                    ? `${user.nickname ?? user.email ?? user.id} 계정으로 로그인되어 있습니다.`
                    : "로그인이 필요합니다. 실제 교환 API 테스트 전 로그인해주세요."}
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-[20px] font-bold">페이지 용도</h2>
              <p className="text-[14px] text-gray-300">
                상단은 실제 API 연동 테스트용, 하단은 API 연결 없이 UI와 모달 흐름을 확인하는
                쇼케이스 영역입니다.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-5 border border-gray-400 p-6">
          <div className="flex flex-col gap-2 desktop:flex-row desktop:items-end desktop:justify-between">
            <div>
              <h2 className="text-[24px] font-bold">교환 제안 생성 테스트</h2>
              <p className="mt-2 text-[14px] text-gray-300">
                판매 상세 페이지가 아직 미완성이라, 이 화면에서 직접 `saleId`와
                `offeredCardCopyId`를 넣어 POST 요청을 검증합니다.
              </p>
            </div>

            <Button
              size="sm"
              variant="secondary"
              onClick={() => setIsSelectModalOpen(true)}
              disabled={!canUseExchange}
            >
              예시 카드 선택 모달 열기
            </Button>
          </div>

          <div className="grid gap-4 desktop:grid-cols-2">
            <label className="space-y-2">
              <span className="text-[14px] font-bold text-white">saleId</span>
              <input
                className="h-[52px] w-full border border-gray-400 bg-black px-4 text-white outline-none"
                value={saleId}
                onChange={(event) => setSaleId(event.target.value)}
                placeholder="예: 12"
              />
            </label>

            <label className="space-y-2">
              <span className="text-[14px] font-bold text-white">offeredCardCopyId</span>
              <input
                className="h-[52px] w-full border border-gray-400 bg-black px-4 text-white outline-none"
                value={offeredCardCopyId}
                onChange={(event) => setOfferedCardCopyId(event.target.value)}
                placeholder="예: 45"
              />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-[14px] font-bold text-white">description</span>
            <textarea
              className="h-[140px] w-full resize-none border border-gray-400 bg-black px-4 py-3 text-white outline-none"
              value={description}
              onChange={(event) => handleDescriptionChange(event.target.value)}
              placeholder="교환 제안 내용을 입력해주세요."
            />
          </label>

          {descriptionValidation && (
            <p className="text-[14px] font-medium text-red-500">{descriptionValidation}</p>
          )}

          {selectedPreviewCard && (
            <div className="rounded border border-gray-400 px-4 py-3 text-[14px] text-gray-300">
              선택된 예시 카드:{" "}
              <span className="font-bold text-white">{selectedPreviewCard.name}</span>
              {" · "}예시 ID: {selectedPreviewCard.id}
              {" · "}실제 테스트 시에는 입력값을 본인 카드 사본 ID로 수정해주세요.
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <Button
              size="sm"
              onClick={handleSubmitProposal}
              disabled={!canUseExchange || createProposalMutation.isPending}
            >
              {createProposalMutation.isPending ? "교환 제안 생성 중..." : "교환 제안 보내기"}
            </Button>

            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                setCreateFeedbackMessage("");
                setCreateFeedbackType("info");
                sentQuery.refetch();
                receivedQuery.refetch();
              }}
              disabled={!canUseExchange}
            >
              목록 새로고침
            </Button>
          </div>

          {createFeedbackMessage && (
            <p
              className={`text-[14px] ${
                createFeedbackType === "error" ? "font-medium text-red-500" : "text-gray-300"
              }`}
            >
              {createFeedbackMessage}
            </p>
          )}
        </section>

        <ProposalSection
          title="받은 교환 제안 목록"
          description="내 판매글에 도착한 교환 제안입니다. PENDING 상태일 때만 승인/거절 버튼이 활성화됩니다."
          proposals={receivedItems}
          isLoading={receivedQuery.isLoading}
          error={receivedQuery.error}
          emptyMessage="받은 교환 제안이 없습니다."
          actionable
          onAccept={(proposal) => handleOpenDecisionModal("approve", proposal)}
          onReject={(proposal) => handleOpenDecisionModal("reject", proposal)}
        />

        <ProposalSection
          title="내가 보낸 교환 제안 목록"
          description="내가 제안한 교환 목록입니다. 현재는 조회 전용으로 확인합니다."
          proposals={sentItems}
          isLoading={sentQuery.isLoading}
          error={sentQuery.error}
          emptyMessage="보낸 교환 제안이 없습니다."
        />

        {actionSuccessMessage && (
          <section className="rounded border border-gray-400 px-5 py-4 text-[14px] text-gray-300">
            {actionSuccessMessage}
          </section>
        )}

        <section className="space-y-4 border border-gray-400 p-6">
          <div>
            <p className="text-[14px] text-gray-300">API 연결 없이 확인하는 UI 쇼케이스</p>
            <h2 className="mt-2 text-[28px] font-bold text-white">Exchange UI Preview</h2>
            <p className="mt-2 text-[14px] text-gray-300">
              디자인 리뷰나 버튼/모달 연결 확인용 예시 영역입니다.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button size="sm" variant="secondary" onClick={() => setIsSelectModalOpen(true)}>
              카드 선택 모달 보기
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleOpenDecisionModal("approve", UI_PREVIEW_RECEIVED_PROPOSALS[0])}
            >
              승인 모달 보기
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleOpenDecisionModal("reject", UI_PREVIEW_RECEIVED_PROPOSALS[0])}
            >
              거절 모달 보기
            </Button>
          </div>
        </section>

        <ProposalSection
          title="받은 교환 요청 UI 미리보기"
          description="PENDING / ACCEPTED / REJECTED / CANCELED 상태별 카드 UI 확인용 예시입니다."
          proposals={UI_PREVIEW_RECEIVED_PROPOSALS}
          isLoading={false}
          error={null}
          emptyMessage="미리보기 데이터가 없습니다."
          actionable
          onAccept={(proposal) => handleOpenDecisionModal("approve", proposal)}
          onReject={(proposal) => handleOpenDecisionModal("reject", proposal)}
        />

        <ProposalSection
          title="내가 제시한 교환 목록 UI 미리보기"
          description="보낸 교환 제안 카드형 목록 예시입니다. 실제 페이지 반영 전 구성 확인에 사용합니다."
          proposals={UI_PREVIEW_SENT_PROPOSALS}
          isLoading={false}
          error={null}
          emptyMessage="미리보기 데이터가 없습니다."
        />

        <section className="space-y-5">
          <div>
            <h2 className="text-[24px] font-bold text-white">상태 예시</h2>
            <p className="mt-2 text-[14px] text-gray-300">
              빈 목록, 카드 없음, 서버 에러 문구 배치 예시를 빠르게 확인할 수 있습니다.
            </p>
          </div>

          <div className="grid gap-6 desktop:grid-cols-3">
            <div className="flex min-h-[180px] items-center justify-center border border-gray-400 px-6 text-center">
              <p className="text-[15px] text-gray-300">보낸 교환 제안이 없습니다.</p>
            </div>

            <div className="flex min-h-[180px] items-center justify-center border border-gray-400 px-6 text-center">
              <p className="text-[15px] text-gray-300">교환 가능한 포토카드가 없습니다.</p>
            </div>

            <div className="flex min-h-[180px] flex-col items-center justify-center gap-3 border border-red-500 px-6 text-center">
              <p className="text-[16px] font-bold text-white">교환 제안 처리에 실패했습니다.</p>
              <p className="text-[14px] text-gray-300">다시 시도해주세요.</p>
            </div>
          </div>
        </section>

        <ExchangeSelectCardModal
          isOpen={isSelectModalOpen}
          onClose={() => setIsSelectModalOpen(false)}
          cards={filteredPreviewCards}
          selectedCardId={selectedCardId}
          onSelectCard={(card) => setSelectedCardId(card.id)}
          onConfirm={(card) => {
            setSelectedCardId(card.id);
            setOfferedCardCopyId(String(card.id));
            setIsSelectModalOpen(false);
          }}
          keyword={keyword}
          onKeywordChange={setKeyword}
          grade={grade}
          onGradeChange={setGrade}
          genre={genre}
          onGenreChange={setGenre}
          isDisabled={!canUseExchange}
          helperText={
            canUseExchange
              ? "선택 모달은 UI 테스트용입니다. 실제 API 테스트 시에는 카드 사본 ID를 직접 확인해 입력해주세요."
              : "로그인 후 교환 기능을 이용할 수 있습니다."
          }
          emptyMessage="조건에 맞는 예시 카드가 없습니다."
          confirmDisabledReason={!canUseExchange ? "로그인 후 카드 선택이 가능합니다." : ""}
        />

        <ExchangeDecisionModal
          isOpen={Boolean(decisionModalType)}
          onClose={() => {
            if (respondMutation.isPending) return;
            setDecisionModalType(null);
            setActiveProposal(null);
          }}
          onConfirm={handleConfirmDecision}
          decision={decisionModalType ?? "reject"}
          cardName={mapProposalToCard(activeProposal ?? {}).name}
          grade={mapProposalToCard(activeProposal ?? {}).grade}
          errorMessage={
            respondMutation.error
              ? getErrorMessage(
                  respondMutation.error,
                  "교환 제안 처리에 실패했습니다. 다시 시도해주세요.",
                )
              : ""
          }
          isSubmitting={respondMutation.isPending}
        />
      </div>
    </main>
  );
}
