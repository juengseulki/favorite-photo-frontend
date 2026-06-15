import Button from "@/components/common/Button";

export default function MarketHeader({ onSellClick }) {
  return (
    <div className="flex items-center justify-between border-b-2 border-gray-100 pb-[20px] tablet:pb-[30px]">
      <h1 className="font-brand text-[28px] font-bold leading-none text-white tablet:text-[42px] desktop:text-[62px]">
        마켓플레이스
      </h1>

      <Button
        type="button"
        onClick={onSellClick}
        className="hidden desktop:flex desktop:h-[60px] desktop:w-[440px] desktop:text-[18px]"
      >
        나의 포토카드 판매하기
      </Button>
    </div>
  );
}
