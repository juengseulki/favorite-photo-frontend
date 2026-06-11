import Image from "next/image";
import GradeBadge from "@/components/common/Grade/GradeBadge";
import { getGenreLabel } from "@/lib/constants/marketOptions";
import { card } from "./cardStyles";

export default function PhotoCard({ card: item }) {
  const SERVER_URL = process.env.NEXT_PUBLIC_API_BASE_URL.replace("/api", "");

  const imageSrc = item.imageUrl.startsWith("http")
    ? item.imageUrl
    : `${SERVER_URL}${item.imageUrl}`;

  return (
    <article className={`${card.base} ${card.defaultSize}`}>
      <div className={card.image}>
        <Image src={imageSrc} alt={item.name} fill className="object-cover" />
      </div>

      <h3 className={card.title}>{item.name}</h3>

      <div className={card.metaWrap}>
        <div className={card.metaInner}>
          <div className={card.gradeLine}>
            <GradeBadge grade={item.grade} size="xs" />

            <span className={card.divider} />

            <span className={card.genre}>{getGenreLabel(item.genre)}</span>
          </div>

          <span className={card.nickname}>{item.creator.nickname}</span>
        </div>
      </div>

      <div className={card.infoArea}>
        <div className={card.infoRow}>
          <span className={card.infoLabel}>가격</span>
          <span className={card.infoValue}>{Number(item.price).toLocaleString()} P</span>
        </div>

        <div className={card.infoRow}>
          <span className={card.infoLabel}>수량</span>
          <span className={card.infoValue}>{item.count}</span>
        </div>
      </div>

      <div className={card.logoWrap}>
        <Image src="/img/logos/logo.png" alt="최애의 포토" fill className="object-contain" />
      </div>
    </article>
  );
}
