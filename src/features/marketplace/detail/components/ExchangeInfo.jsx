import Button from "@/components/common/Button";
import GradeBadge from "@/components/common/Grade/GradeBadge";

export default function ExchangeInfo({ exchange, onOpenExchangeModal }) {
  return (
    <section
      className="
        mt-[120px]
        desktop:mt-[108px]
      "
    >
      {/* 제목 + 버튼 */}
      <div
        className="
          flex items-center justify-between
          border-b border-gray-200
          pb-[20px]
        "
      >
        <h2
          className="
            text-[22px] font-bold
            tablet:text-[28px]
            desktop:text-[40px]
          "
        >
          교환 희망 정보
        </h2>

        <Button
          variant="primary"
          onClick={onOpenExchangeModal}
          className="
            hidden
            tablet:flex

            tablet:h-[55px]
            tablet:w-[342px]

            desktop:h-[60px]
            desktop:w-[440px]
          "
        >
          포토카드 교환하기
        </Button>
      </div>

      {/* 내용 */}
      <div
        className="
          mt-[30px]
          desktop:mt-[48px]
        "
      >
        <p
          className="
            text-[16px] font-bold
            desktop:text-[24px]
          "
        >
          {exchange.description}
        </p>

        <div
          className="
            mt-[20px] flex items-center gap-[10px]
            desktop:mt-[35px]
          "
        >
          <GradeBadge grade={exchange.grade} />

          <span className="h-[14px] w-px bg-gray-400" />

          <span
            className="
              text-[14px] text-gray-300
              desktop:text-[18px]
            "
          >
            {exchange.genre}
          </span>
        </div>
      </div>

      {/* 모바일 버튼은 하단 */}
      <Button
        variant="primary"
        onClick={onOpenExchangeModal}
        className="
          mt-[30px]
          flex h-[55px] w-full

          tablet:hidden
        "
      >
        포토카드 교환하기
      </Button>
    </section>
  );
}
