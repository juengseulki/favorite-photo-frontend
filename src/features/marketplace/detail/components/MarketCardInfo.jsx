import GradeBadge from "@/components/common/Grade/GradeBadge";
import { getGenreLabel } from "@/lib/constants/marketOptions";

export default function MarketCardInfo({ card }) {
  return (
    <>
      <div className="flex items-center gap-[8px]">
        <GradeBadge grade={card.grade} size="md" />
        <span className="h-[12px] w-[1px] bg-gray-400" />
        <span className="text-[14px] text-gray-300">{getGenreLabel(card.genre)}</span>
      </div>

      <h1 className="mt-[12px] text-[24px] font-bold text-white tablet:text-[30px]">{card.name}</h1>

      {card.description && (
        <p className="mt-[12px] text-[14px] leading-[1.6] text-gray-200 tablet:text-[16px]">
          {card.description}
        </p>
      )}

      <div className="my-[24px] h-[1px] bg-gray-400" />

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

      <div className="my-[24px] h-[1px] bg-gray-400" />
    </>
  );
}
