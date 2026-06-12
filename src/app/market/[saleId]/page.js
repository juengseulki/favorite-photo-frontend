"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import Button from "@/components/common/Button";
import { useMarketCardDetail } from "@/features/marketplace/hooks/useMarketCardDetail";
import { usePurchaseCard } from "@/features/marketplace/hooks/usePurchaseCard";
import { useAuth } from "@/providers/AuthProvider";

import MarketCardImage from "@/features/marketplace/detail/components/MarketCardImage";
import MarketCardInfo from "@/features/marketplace/detail/components/MarketCardInfo";
import PurchaseBox from "@/features/marketplace/detail/components/PurchaseBox";
import { usePurchaseForm } from "@/features/marketplace/detail/hooks/usePurchaseForm";

export default function MarketCardDetailPage() {
  const { saleId } = useParams();
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();

  const numericSaleId = Number(saleId);

  const { data: card, isPending, isError } = useMarketCardDetail(numericSaleId);

  const { mutate: purchase, isPending: isPurchasing } = usePurchaseCard(numericSaleId);

  const {
    quantity,
    purchaseError,
    purchaseSuccess,
    totalPrice,
    setPurchaseError,
    decreaseQuantity,
    increaseQuantity,
    resetAfterSuccess,
  } = usePurchaseForm(card);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.replace("/");
    }
  }, [isAuthLoading, user, router]);

  const handlePurchase = () => {
    setPurchaseError("");

    purchase(quantity, {
      onSuccess: resetAfterSuccess,
      onError: (err) => {
        const message = err?.response?.data?.error?.message ?? "구매에 실패했습니다.";
        setPurchaseError(message);
      },
    });
  };

  if (isAuthLoading || isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-[14px] text-gray-300">
        불러오는 중...
      </div>
    );
  }

  if (!user) return null;

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

  const canPurchase = !card.isSoldOut && card.remainingQuantity > 0;

  return (
    <main
      className="
        mx-auto w-full
        px-[20px] py-[40px]
        tablet:px-[40px] tablet:py-[60px]
        desktop:max-w-[1200px] desktop:px-[60px]
      "
    >
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-[24px] flex items-center gap-[8px] text-[14px] text-gray-300 transition hover:text-white"
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
        <MarketCardImage card={card} />

        <div className="flex flex-1 flex-col">
          <MarketCardInfo card={card} />

          <PurchaseBox
            card={card}
            quantity={quantity}
            totalPrice={totalPrice}
            canPurchase={canPurchase}
            isPurchasing={isPurchasing}
            purchaseError={purchaseError}
            purchaseSuccess={purchaseSuccess}
            onDecrease={decreaseQuantity}
            onIncrease={increaseQuantity}
            onPurchase={handlePurchase}
          />
        </div>
      </div>
    </main>
  );
}
