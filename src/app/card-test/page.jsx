"use client";

import PhotoCard from "@/components/common/Card/PhotoCard";
import ExchangeCard from "@/components/common/Card/ExchangeCard";

const mockCards = [
  {
    id: 1,
    name: "스페인 여행",
    description: "스페인 여행 사진도 좋은데.. 우리집 앞마당 포토카드와 교환하고 싶습니다!",
    imageUrl: "/img/images/img1.png",
    grade: "COMMON",
    genre: "풍경",
    Price: 4,
    initialPrice: 4,
    count: 2,
    creator: { nickname: "프로여행러" },
  },
  {
    id: 2,
    name: "How Far I’ll Go",
    description: "여름 바다 풍경 사진과 교환하실래요?",
    imageUrl: "/img/images/img2.png",
    grade: "RARE",
    genre: "풍경",
    Price: 8,
    initialPrice: 8,
    count: 1,
    creator: { nickname: "판스타" },
  },
];

export default function CardTestPage() {
  const handleReject = (cardId) => {
    console.log("거절", cardId);
  };

  const handleAccept = (cardId) => {
    console.log("승인", cardId);
  };

  return (
    <main className="min-h-screen bg-black p-[20px] tablet:p-[40px]">
      <h1 className="mb-[40px] text-[24px] text-white tablet:text-[32px]">📸 PhotoCard Test</h1>

      <section>
        <h2 className="mb-[20px] text-[20px] text-white tablet:text-[24px]">판매 카드</h2>

        <div className="flex flex-wrap gap-[10px] tablet:gap-[24px]">
          {mockCards.map((card) => (
            <PhotoCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      <section className="mt-[80px]">
        <h2 className="mb-[20px] text-[20px] text-white tablet:text-[24px]">교환 제시 카드</h2>

        <div className="flex flex-wrap gap-[10px] tablet:gap-[24px]">
          {mockCards.map((card) => (
            <ExchangeCard
              key={card.id}
              card={card}
              onReject={() => handleReject(card.id)}
              onAccept={() => handleAccept(card.id)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
