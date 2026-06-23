import Image from "next/image";
import Button from "@/components/common/Button";
import GradeBadge from "@/components/common/Grade/GradeBadge";
import { getGenreLabel } from "@/lib/constants/marketOptions";

export default function MyExchangeProposalCard({ proposal, onCancel, isCanceling = false }) {
  const card =
    proposal.offeredCard ?? proposal.card ?? proposal.offeredCardCopy?.photoCard ?? proposal;

  const nickname =
    proposal.ownerNickname ??
    card.ownerNickname ??
    card.owner?.nickname ??
    card.sellerNickname ??
    card.seller?.nickname ??
    card.creatorNickname ??
    card.creator?.nickname ??
    "";

  const description =
    proposal.description ?? proposal.message ?? card.description ?? "교환 제시 내용이 없습니다.";

  return (
    <article className="w-full border border-gray-400 bg-gray-500 p-[36px] text-white tablet:w-[390px]">
      <div className="relative h-[236px] w-full overflow-hidden bg-black">
        <Image src={card.imageUrl} alt={card.name} fill sizes="390px" className="object-cover" />
      </div>

      <h3 className="mt-[24px] truncate text-[22px] font-bold text-white">{card.name}</h3>

      <div className="mt-[12px] flex items-center justify-between gap-[12px]">
        <div className="flex min-w-0 flex-wrap items-center gap-x-[10px] gap-y-[4px]">
          <GradeBadge grade={card.grade} size="xs" />

          <span className="h-[14px] w-px shrink-0 bg-gray-400" />

          <span className="text-[14px] text-gray-300">{getGenreLabel(card.genre)}</span>

          {proposal.price && (
            <>
              <span className="h-[14px] w-px shrink-0 bg-gray-400" />

              <span className="text-[14px] text-gray-300">
                {Number(proposal.price).toLocaleString()} P에 구매
              </span>
            </>
          )}
        </div>

        <span className="shrink-0 text-[14px] font-bold text-white underline underline-offset-4">
          {nickname}
        </span>
      </div>

      <p className="mt-[36px] min-h-[48px] break-words text-[16px] leading-[24px] text-white">
        {description}
      </p>

      <Button
        variant="secondary"
        className="mt-[50px] h-[55px] w-full"
        onClick={() => onCancel?.(proposal)}
        disabled={isCanceling}
      >
        {isCanceling ? "취소 중..." : "취소하기"}
      </Button>
    </article>
  );
}
