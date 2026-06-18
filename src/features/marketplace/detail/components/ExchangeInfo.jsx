import Button from "@/components/common/Button";
import GradeBadge from "@/components/common/Grade/GradeBadge";

export default function ExchangeInfo({ exchange, onOpenExchangeModal }) {
  return (
    <section className="mt-[60px] desktop:mt-[108px]">
      <div className="flex flex-col gap-[20px] border-b border-gray-200 pb-[16px] desktop:flex-row desktop:items-center desktop:justify-between desktop:pb-[17px]">
        <h2 className="text-[20px] font-bold leading-none desktop:text-[40px]">교환 희망 정보</h2>

        <Button
          variant="primary"
          size="lg"
          className="hidden h-[60px] w-[440px] rounded-[2px] text-[18px] font-bold desktop:block"
          onClick={onOpenExchangeModal}
        >
          포토카드 교환하기
        </Button>
      </div>

      <p className="mt-[48px] text-[24px] font-bold leading-none text-white">
        {exchange.description || "교환 희망 정보가 없습니다."}
      </p>

      <div className="mt-[35px] flex items-center gap-[15px]">
        {exchange.grade && <GradeBadge grade={exchange.grade} size="lg" />}

        {exchange.grade && exchange.genre && <span className="text-[24px] text-gray-300">|</span>}

        {exchange.genre && <span className="text-[24px] text-gray-300">{exchange.genre}</span>}
      </div>

      <Button
        variant="primary"
        size="lg"
        className="mt-[32px] h-[55px] w-full rounded-[2px] text-[16px] font-bold desktop:hidden"
        onClick={onOpenExchangeModal}
      >
        포토카드 교환하기
      </Button>
    </section>
  );
}
