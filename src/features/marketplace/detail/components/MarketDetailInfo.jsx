"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import GradeBadge from "@/components/common/Grade/GradeBadge";
import { ROUTES } from "@/lib/constants/routes";
import QuantitySelector from "./QuantitySelector";
import PurchaseConfirmModal from "./PurchaseConfirmModal";
import PurchaseResultModal from "./PurchaseResultModal";
import { usePurchaseMarketCard } from "../hooks/usePurchaseMarketCard";

export default function MarketDetailInfo({ sale }) {
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [purchaseResult, setPurchaseResult] = useState(null);

  const saleId = sale.id ?? sale.saleId;
  const price = sale.price ?? 0;
  const totalQuantity = sale.totalQuantity ?? sale.quantity ?? 1;
  const remainingQuantity = sale.remainingQuantity ?? totalQuantity;
  const isSoldOut = sale.status === "SOLD_OUT" || remainingQuantity <= 0;

  const totalPrice = useMemo(() => price * quantity, [price, quantity]);

  const { mutate: purchaseCard, isPending } = usePurchaseMarketCard(saleId);

  const handlePurchase = () => {
    if (!saleId || isSoldOut) return;

    purchaseCard(
      { quantity },
      {
        onSuccess: () => {
          setIsPurchaseModalOpen(false);
          setPurchaseResult("success");
        },
        onError: () => {
          setIsPurchaseModalOpen(false);
          setPurchaseResult("fail");
        },
      },
    );
  };

  return (
    <aside className="flex w-full min-w-0 shrink flex-col tablet:w-[342px] desktop:h-[612px] desktop:w-[440px] desktop:shrink-0">
      <div className="flex items-center justify-between border-b border-gray-450 pb-[12px] desktop:pb-[24px]">
        <div className="flex min-w-0 items-center gap-[8px] pb-[20px] mt-[20px] desktop:gap-[15px]">
          <GradeBadge grade={sale.grade} size="m" />
          <span className="text-[16px] text-gray-300 desktop:text-[24px]">|</span>
          <span className="text-[16px] text-gray-300 desktop:text-[24px]">{sale.genre}</span>
        </div>

        <span className="text-[18px] font-bold underline underline-offset-4 mt-[30px] pb-[30px] desktop:text-[24px]">
          {sale.sellerNickname}
        </span>
      </div>

      <p className="border-b border-gray-450 py-[20px] text-[16px] leading-[22px] text-white desktop:py-[29px] desktop:text-[18px] desktop:leading-normal">
        {sale.description}
      </p>

      <div className="border-b border-gray-450 py-[20px] desktop:py-[24px]">
        <InfoRow label="가격" value={`${price.toLocaleString()} P`} />
        <InfoRow
          label="잔여"
          value={`${remainingQuantity} / ${totalQuantity}`}
          className="mt-[10px]"
        />
      </div>

      <div className="mt-[20px] flex items-center justify-between desktop:mt-[24px]">
        <span className="text-[18px] text-white desktop:text-[20px]">구매수량</span>
        <QuantitySelector value={quantity} min={1} max={remainingQuantity} onChange={setQuantity} />
      </div>

      <div className="mt-[18px] flex items-center justify-between desktop:mt-[29px]">
        <span className="text-[18px] text-white desktop:text-[20px]">총 가격</span>
        <strong className="text-[20px] font-bold text-white desktop:text-[24px]">
          {totalPrice.toLocaleString()} P{" "}
          <span className="text-[16px] font-normal text-gray-300 desktop:text-[20px]">
            ({quantity}장)
          </span>
        </strong>
      </div>

      <Button
        variant={isSoldOut ? "disabled" : "primary"}
        size="lg"
        className="mt-[40px] h-[55px] w-full rounded-[2px] py-0 text-[16px] font-bold desktop:mt-[80px] desktop:h-[60px] desktop:text-[18px]"
        onClick={() => {
          if (!isSoldOut) setIsPurchaseModalOpen(true);
        }}
        disabled={isSoldOut}
      >
        {isSoldOut ? "품절" : "포토카드 구매하기"}
      </Button>

      <PurchaseConfirmModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        sale={sale}
        quantity={quantity}
        totalPrice={totalPrice}
        onConfirm={handlePurchase}
        isSubmitting={isPending}
      />

      <PurchaseResultModal
        isOpen={!!purchaseResult}
        isSuccess={purchaseResult === "success"}
        onClose={() => setPurchaseResult(null)}
        onConfirm={() => {
          if (purchaseResult === "success") router.push(ROUTES.MY_GALLERY);
          else router.push(ROUTES.MARKET);
        }}
        cardName={sale.name}
        grade={sale.grade}
        quantity={quantity}
      />
    </aside>
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
