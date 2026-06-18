import Button from "@/components/common/Button";

export default function MarketHeader({ onSellClick }) {
  return (
    <>
      <div className="hidden items-center justify-between border-b-2 border-gray-100 pb-[20px] tablet:flex tablet:pb-[30px]">
        <h1 className="font-brand text-[42px] font-bold leading-none text-white desktop:text-[62px]">
          마켓플레이스
        </h1>

        <Button
          type="button"
          onClick={onSellClick}
          className="hidden tablet:flex tablet:h-[50px] tablet:w-[300px] tablet:text-[14px] desktop:h-[60px] desktop:w-[440px] desktop:text-[18px]"
        >
          나의 포토카드 판매하기
        </Button>
      </div>

      <Button
        type="button"
        onClick={onSellClick}
        className="fixed bottom-[20px] left-[15px] right-[15px] z-20 flex h-[55px] rounded-[2px] text-[18px] tablet:hidden"
      >
        나의 포토카드 판매하기
      </Button>
    </>
  );
}
