import Image from "next/image";
import GradeBadge from "@/components/common/Grade/GradeBadge";
import { getGenreLabel } from "@/lib/constants/marketOptions";
import { card } from "./cardStyles";

export default function PhotoCard({ card: item, revealStatus = false }) {
  const SERVER_URL = process.env.NEXT_PUBLIC_API_BASE_URL.replace("/api", "");

  const imageSrc = item.imageUrl?.startsWith("http")
    ? item.imageUrl
    : item.imageUrl?.startsWith("/")
      ? item.imageUrl
      : `${SERVER_URL}/${item.imageUrl}`;

  return (
    <article className={`${card.base} ${card.defaultSize}`}>
      <div className={`${card.image} relative`}>
        <Image src={imageSrc} alt={item.name} fill className="object-cover" />
        {revealStatus &&
          (card.status === "SOLD_OUT" ? (
            <div className="w-full h-full bg-black bg-opacity-30 absolute inset-0">
              <Image src="/img/icons/soldout.png" alt="품절 아이콘" fill />
            </div>
          ) : (
            <div className="px-[10px] py-[4px] bg-black bg-opacity-5 rounded-sm absolute top-[10px] left-[10px]">
              {card.status === "ON_SALE" && (
                <div className="text-[16px] font-normal text-white ">판매 중</div>
              )}
              {card.status === "PENDING" && (
                <div className="text-[16px] font-normal text-main ">교환 제시 대기 중</div>
              )}
            </div>
          ))}
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
