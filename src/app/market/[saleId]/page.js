"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useMarketCardDetail } from "@/features/marketplace/hooks/useMarketCardDetail";
import { usePurchaseCard } from "@/features/marketplace/hooks/usePurchaseCard";
import { useAuth } from "@/providers/AuthProvider";
import GradeBadge from "@/components/common/Grade/GradeBadge";
import Button from "@/components/common/Button";
import { getGenreLabel } from "@/lib/constants/marketOptions";

export default function MarketCardDetailPage() {
  const { saleId } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const { data: card, isPending, isError } = useMarketCardDetail(Number(saleId));
  const { mutate: purchase, isPending: isPurchasing } = usePurchaseCard(Number(saleId));

  const [quantity, setQuantity] = useState(1);
  const [purchaseError, setPurchaseError] = useState("");
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const handleQuantityChange = (e) => {
    const val = Number(e.target.value);
    if (val < 1) return;
    if (card && val > card.remainingQuantity) return;
    setQuantity(val);
  };

  const handlePurchase = () => {
    setPurchaseError("");
    setPurchaseSuccess(false);

    purchase(quantity, {
      onSuccess: () => {
        setPurchaseSuccess(true);
        setQuantity(1);
      },
      onError: (err) => {
        const message = err?.response?.data?.error?.message ?? "구매에 실패했습니다.";
        setPurchaseError(message);
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

  if (isError || !card) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-[16px]">
        <p className="text-[14px] text-gray-300">카드 정보를 불러올 수 없습니다.</p>
        <Button variant="secondary" size="sm" onClick={() => router.push("/market")}>
          목록으로
        </Button>
      </div>
    );
  }

  const canPurchase = user && !card.isSoldOut && card.remainingQuantity > 0;
  const totalPrice = (card.price * quantity).toLocaleString();

  return (
    <main
      className="
        mx-auto w-full
        px-[20px] py-[40px]
        tablet:px-[40px] tablet:py-[60px]
        desktop:max-w-[1200px] desktop:px-[60px]
      "
    >
      {/* 뒤로가기 */}
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-[24px] flex items-center gap-[8px] text-[14px] text-gray-300 hover:text-white transition"
      >
        <Image src="/img/icons/back.png" alt="" width={16} height={16} />
        목록으로
      </button>

      <div
        className="
          flex flex-col gap-[32px]
          tablet:flex-row tablet:gap-[48px]
          desktop:gap-[80px]
        "
      >
        {/* 좌측: 카드 이미지 */}
        <div className="relative shrink-0 w-full tablet:w-[342px] desktop:w-[440px]">
          <div
            className="
              relative w-full
              aspect-[4/3]
              border border-gray-400 bg-gray-500
              overflow-hidden
            "
          >
            <Image
              src={card.imageUrl}
              alt={card.name}
              fill
              className="object-cover"
              sizes="(max-width: 744px) 100vw, (max-width: 1200px) 342px, 440px"
              priority
            />

            {/* 품절 오버레이 */}
            {card.isSoldOut && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                <span className="text-[24px] font-bold text-gray-300">SOLD OUT</span>
              </div>
            )}
          </div>

          {/* 로고 */}
          <div className="mt-[16px] flex justify-center">
            <div className="relative h-[18px] w-[100px]">
              <Image src="/img/logos/logo.png" alt="최애의 포토" fill className="object-contain" />
            </div>
          </div>
        </div>

        {/* 우측: 카드 정보 + 구매 */}
        <div className="flex flex-1 flex-col">
          {/* 등급 · 장르 */}
          <div className="flex items-center gap-[8px]">
            <GradeBadge grade={card.grade} size="md" />
            <span className="h-[12px] w-[1px] bg-gray-400" />
            <span className="text-[14px] text-gray-300">{getGenreLabel(card.genre)}</span>
          </div>

          {/* 카드명 */}
          <h1 className="mt-[12px] text-[24px] font-bold text-white tablet:text-[30px]">
            {card.name}
          </h1>

          {/* 설명 */}
          {card.description && (
            <p className="mt-[12px] text-[14px] leading-[1.6] text-gray-200 tablet:text-[16px]">
              {card.description}
            </p>
          )}

          {/* 구분선 */}
          <div className="my-[24px] h-[1px] bg-gray-400" />

          {/* 상세 정보 */}
          <dl className="space-y-[14px] text-[14px] tablet:text-[16px]">
            <div className="flex justify-between">
              <dt className="text-gray-300">가격</dt>
              <dd className="font-bold text-main">{card.price.toLocaleString()} P</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-300">잔여 수량</dt>
              <dd className="text-white">
                {card.remainingQuantity} / {card.totalQuantity}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-300">판매자</dt>
              <dd className="text-white">{card.sellerNickname}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-300">제작자</dt>
              <dd className="text-white">{card.creatorNickname}</dd>
            </div>
          </dl>

          {/* 구분선 */}
          <div className="my-[24px] h-[1px] bg-gray-400" />

          {/* 구매 영역 */}
          {!user ? (
            <p className="text-[14px] text-gray-300">
              구매하려면{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-main underline hover:brightness-110"
              >
                로그인
              </button>
              이 필요합니다.
            </p>
          ) : card.isSoldOut ? (
            <p className="text-[14px] font-bold text-gray-300">품절된 상품입니다.</p>
          ) : (
            <div className="flex flex-col gap-[16px]">
              {/* 수량 조절 */}
              <div className="flex items-center gap-[16px]">
                <span className="text-[14px] text-gray-300">수량</span>
                <div className="flex items-center border border-gray-400 rounded-[2px]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-[40px] h-[40px] text-white text-[18px] hover:bg-gray-450 transition"
                  >
                    −
                  </button>
                  <span className="w-[48px] text-center text-[16px] font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(card.remainingQuantity, q + 1))}
                    className="w-[40px] h-[40px] text-white text-[18px] hover:bg-gray-450 transition"
                  >
                    +
                  </button>
                </div>
                <span className="ml-auto text-[16px] font-bold text-white">{totalPrice} P</span>
              </div>

              {/* 구매 버튼 */}
              <Button
                variant="primary"
                size="full"
                onClick={handlePurchase}
                disabled={isPurchasing || !canPurchase}
              >
                {isPurchasing ? "구매 중..." : "구매하기"}
              </Button>

              {purchaseError && <p className="text-[13px] text-red">{purchaseError}</p>}

              {purchaseSuccess && <p className="text-[13px] text-main">구매가 완료되었습니다!</p>}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
