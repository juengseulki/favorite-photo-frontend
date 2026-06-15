"use client";

import { useMemo, useState } from "react";
import Button from "@/components/common/Button";
import GradeBadge from "@/components/common/Grade/GradeBadge";
import QuantitySelector from "./QuantitySelector";
import PurchaseConfirmModal from "./PurchaseConfirmModal";

export default function MarketDetailInfo({ sale }) {
  const [quantity, setQuantity] = useState(1);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  const price = sale.price ?? 0;
  const totalQuantity = sale.totalQuantity ?? sale.quantity ?? 1;
  const remainingQuantity = sale.remainingQuantity ?? totalQuantity;

  const totalPrice = useMemo(() => price * quantity, [price, quantity]);

  return (
    <aside className="flex w-full shrink-0 flex-col desktop:h-[612px] desktop:w-[440px]">
      <div className="flex items-center justify-between border-b border-gray-450 pb-[24px]">
        <div className="flex items-center gap-[15px]">
          <GradeBadge grade={sale.grade} size="lg" />
          <span className="text-[24px] text-gray-300">|</span>
          <span className="text-[24px] text-gray-300">{sale.genre}</span>
        </div>

        <span className="text-[24px] font-bold underline underline-offset-4">
          {sale.sellerNickname}
        </span>
      </div>

      <p className="border-b border-gray-450 py-[29px] text-[18px] leading-normal text-white">
        {sale.description}
      </p>

      <div className="border-b border-gray-450 py-[24px]">
        <InfoRow label="가격" value={`${price.toLocaleString()} P`} />
        <InfoRow
          label="잔여"
          value={`${remainingQuantity} / ${totalQuantity}`}
          className="mt-[10px]"
        />
      </div>

      <div className="mt-[24px] flex items-center justify-between">
        <span className="text-[20px] text-white">구매수량</span>
        <QuantitySelector value={quantity} min={1} max={remainingQuantity} onChange={setQuantity} />
      </div>

      <div className="mt-[29px] flex items-center justify-between">
        <span className="text-[20px] text-white">총 가격</span>
        <strong className="text-[24px] font-bold text-white">
          {totalPrice.toLocaleString()} P{" "}
          <span className="text-[20px] font-normal text-gray-300">({quantity}장)</span>
        </strong>
      </div>

      <Button
        variant="primary"
        size="lg"
        className="mt-[30px] h-[55px] w-full rounded-[2px] text-[16px] font-bold desktop:mt-[80px] desktop:h-[60px] desktop:text-[18px]"
        onClick={() => setIsPurchaseModalOpen(true)}
      >
        포토카드 구매하기
      </Button>

      <PurchaseConfirmModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        sale={sale}
        quantity={quantity}
        totalPrice={totalPrice}
      />
    </aside>
  );
}

function InfoRow({ label, value, className = "" }) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <span className="text-[20px] text-gray-300">{label}</span>
      <strong className="text-right text-[24px] font-bold text-white">{value}</strong>
    </div>
  );
}
