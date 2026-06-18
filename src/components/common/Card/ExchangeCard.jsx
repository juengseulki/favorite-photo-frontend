import Image from "next/image";
import GradeBadge from "@/components/common/Grade/GradeBadge";
import Button from "@/components/common/Button";
import { card } from "./cardStyles";

export default function ExchangeCard({ card: item, onReject, onAccept }) {
  return (
    <article className={`${card.base} ${card.exchangeSize}`}>
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

            <span className={`${card.divider} hidden tablet:block`} />

            <span className={card.purchaseTextDesktop}>{item.price} P에 구매</span>
          </div>

          <span className={card.nickname}>{item.creator.nickname}</span>

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
