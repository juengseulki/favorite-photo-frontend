"use client";

import { useMemo, useState } from "react";
import Button from "@/components/common/Button";
import {
  ExchangeDecisionModal,
  ExchangeRequestCard,
  ExchangeSelectCardModal,
  useExchangeFilters,
} from "@/features/exchange";

const PREVIEW_CARD_OPTIONS = [
  {
    id: 1001,
    name: "스페인 여행",
    imageUrl: "/img/images/img1.png",
    grade: "COMMON",
    genre: "풍경",
    count: 1,
    price: 4,
    description: "교환 카드 선택 모달에서 보여줄 예시 카드입니다.",
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
    description: "교환 카드 선택 모달 UI 확인용 카드입니다.",
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

      {!proposals.length ? (
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
  const [selectedCardId, setSelectedCardId] = useState(PREVIEW_CARD_OPTIONS[0].id);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [decisionModalType, setDecisionModalType] = useState(null);
  const [activeProposal, setActiveProposal] = useState(null);
  const { keyword, setKeyword, grade, setGrade, genre, setGenre } = useExchangeFilters();

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

  const handleOpenDecisionModal = (decision, proposal) => {
    setDecisionModalType(decision);
    setActiveProposal(proposal);
  };

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-[1280px] space-y-12">
        <section className="space-y-4 border border-gray-400 p-6">
          <div>
            <p className="text-[14px] text-gray-300">API 연결 없이 확인하는 UI 쇼케이스</p>
            <h1 className="mt-2 text-[36px] font-bold">Exchange UI Preview</h1>
            <p className="mt-2 text-[14px] text-gray-300">
              교환 목록 카드, 모달, validation 문구, 버튼 연결을 가볍게 확인하기 위한 페이지입니다.
            </p>
          </div>

          <div className="grid gap-6 border border-gray-400 p-6 desktop:grid-cols-2">
            <div className="space-y-3">
              <h2 className="text-[20px] font-bold">페이지 용도</h2>
              <p className="text-[14px] text-gray-300">
                실제 API 호출 없이 목데이터만 렌더링하므로, 디자이너/프론트 팀원들이 부담 없이 UI를
                확인할 수 있습니다.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-[20px] font-bold">모달 미리보기</h2>
              <div className="flex flex-wrap gap-3">
                <Button size="sm" variant="secondary" onClick={() => setIsSelectModalOpen(true)}>
                  카드 선택 모달 보기
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() =>
                    handleOpenDecisionModal("approve", UI_PREVIEW_RECEIVED_PROPOSALS[0])
                  }
                >
                  승인 모달 보기
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() =>
                    handleOpenDecisionModal("reject", UI_PREVIEW_RECEIVED_PROPOSALS[0])
                  }
                >
                  거절 모달 보기
                </Button>
              </div>
            </div>
          </div>
        </section>

        <ProposalSection
          title="받은 교환 요청 UI 미리보기"
          description="PENDING / ACCEPTED / REJECTED / CANCELED 상태별 카드 UI 확인용 예시입니다."
          proposals={UI_PREVIEW_RECEIVED_PROPOSALS}
          emptyMessage="미리보기 데이터가 없습니다."
          actionable
          onAccept={(proposal) => handleOpenDecisionModal("approve", proposal)}
          onReject={(proposal) => handleOpenDecisionModal("reject", proposal)}
        />

        <ProposalSection
          title="내가 제시한 교환 목록 UI 미리보기"
          description="보낸 교환 제안 카드형 목록 예시입니다. 실제 페이지 반영 전 구성 확인에 사용합니다."
          proposals={UI_PREVIEW_SENT_PROPOSALS}
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
            setIsSelectModalOpen(false);
          }}
          keyword={keyword}
          onKeywordChange={setKeyword}
          grade={grade}
          onGradeChange={setGrade}
          genre={genre}
          onGenreChange={setGenre}
          helperText="선택 모달 UI와 validation 문구 확인용 예시입니다."
          emptyMessage="조건에 맞는 예시 카드가 없습니다."
        />

        <ExchangeDecisionModal
          isOpen={Boolean(decisionModalType)}
          onClose={() => {
            setDecisionModalType(null);
            setActiveProposal(null);
          }}
          onConfirm={() => {
            setDecisionModalType(null);
            setActiveProposal(null);
          }}
          decision={decisionModalType ?? "reject"}
          cardName={mapProposalToCard(activeProposal ?? {}).name}
          grade={mapProposalToCard(activeProposal ?? {}).grade}
        />
      </div>
    </main>
  );
}
