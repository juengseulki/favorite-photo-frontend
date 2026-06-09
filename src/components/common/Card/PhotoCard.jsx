import Image from "next/image";
import GradeBadge from "@/components/common/Grade/GradeBadge";
import { card } from "./cardStyles";

export default function PhotoCard({ card: item }) {
  return (
    <article className={`${card.base} ${card.defaultSize}`}>
      <div className={card.image}>
        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
      </div>

      <h3 className={card.title}>{item.name}</h3>

      <div className={card.metaWrap}>
        <div className={card.metaInner}>
          <div className={card.gradeLine}>
            <GradeBadge grade={item.grade} size="xs" />

            <span className={card.divider} />

            <span className={card.genre}>{item.genre}</span>
          </div>

          <span className={card.creatorNickname}>{item.creatorNickname}</span>
        </div>
      </div>

      <div className={card.infoArea}>
        <div className={card.infoRow}>
          <span className={card.infoLabel}>가격</span>
          <span className={card.infoValue}>{item.initialPrice} P</span>
        </div>

        <div className={card.infoRow}>
          <span className={card.infoLabel}>수량</span>
          <span className={card.infoValue}>{item.quantity}</span>
        </div>
      </div>

      <div className={card.logoWrap}>
        <Image src="/img/logos/logo.png" alt="최애의 포토" fill className="object-contain" />
      </div>
    </article>
  );
}
