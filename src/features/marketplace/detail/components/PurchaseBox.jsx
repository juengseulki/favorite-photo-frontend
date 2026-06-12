import Button from "@/components/common/Button";
import QuantitySelector from "./QuantitySelector";

export default function PurchaseBox({
  card,
  quantity,
  totalPrice,
  canPurchase,
  isPurchasing,
  purchaseError,
  purchaseSuccess,
  onDecrease,
  onIncrease,
  onPurchase,
}) {
  if (card.isSoldOut) {
    return <p className="text-[14px] font-bold text-gray-300">품절된 상품입니다.</p>;
  }

  return (
    <div className="flex flex-col gap-[16px]">
      <QuantitySelector
        quantity={quantity}
        totalPrice={totalPrice}
        onDecrease={onDecrease}
        onIncrease={onIncrease}
      />

      <Button
        variant="primary"
        size="full"
        onClick={onPurchase}
        disabled={isPurchasing || !canPurchase}
      >
        {isPurchasing ? "구매 중..." : "구매하기"}
      </Button>

      {purchaseError && <p className="text-[13px] text-red">{purchaseError}</p>}

      {purchaseSuccess && <p className="text-[13px] text-main">구매가 완료되었습니다!</p>}
    </div>
  );
}
