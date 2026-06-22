import Image from "next/image";
import GradeBadge from "@/components/common/Grade/GradeBadge";
import Button from "@/components/common/Button";
import { card } from "./cardStyles";

const GRADE_HOVER_EFFECT = {
  COMMON: "hover:shadow-[0_0_18px_rgba(255,255,255,0.25)]",
  RARE: "hover:shadow-[0_0_20px_rgba(41,182,246,0.45)]",
  SUPER_RARE: "hover:shadow-[0_0_24px_rgba(168,85,247,0.55)]",
  LEGENDARY: "hover:shadow-[0_0_30px_rgba(232,255,0,0.65)]",
};

export default function ExchangeCard({ card: item, onReject, onAccept }) {
  const hoverEffect = GRADE_HOVER_EFFECT[item.grade] ?? GRADE_HOVER_EFFECT.COMMON;

  return (
    <article
      className={`
        ${card.base}
        ${card.exchangeSize}
        group
        transition-all
        duration-300
        hover:-translate-y-2
        ${hoverEffect}
      `}
    >
      <div className={`${card.image} overflow-hidden`}>
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <h3 className={card.title}>{item.name}</h3>

      <div className={card.metaWrap}>
        <div className={card.metaInner}>
          <div className={card.gradeLine}>
            <GradeBadge grade={item.grade} size="xs" />

            <span className={card.divider} />

            <span className={card.genre}>{item.genre}</span>

            <span className={`${card.divider} hidden tablet:block`} />

            <span className={card.purchaseTextDesktop}>{item.price} P에 구매</span>
          </div>

          <span className={card.nickname}>
            {item.ownerNickname ??
              item.owner?.nickname ??
              item.sellerNickname ??
              item.seller?.nickname ??
              item.creatorNickname ??
              item.creator?.nickname ??
              ""}
          </span>

          <span className={card.purchaseTextMobile}>{item.price} P에 구매</span>
        </div>
      </div>

      <p className={card.description}>{item.description}</p>

      <div className={card.buttonArea}>
        <Button variant="secondary" size="xs" className="flex-1" onClick={onReject}>
          <span className="tablet:hidden">거절</span>
          <span className="hidden tablet:inline">거절하기</span>
        </Button>

        <Button variant="primary" size="xs" className="flex-1" onClick={onAccept}>
          <span className="tablet:hidden">승인</span>
          <span className="hidden tablet:inline">승인하기</span>
        </Button>
      </div>
    </article>
  );
}
