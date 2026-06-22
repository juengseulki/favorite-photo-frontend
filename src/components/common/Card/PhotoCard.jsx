import Image from "next/image";
import GradeBadge from "@/components/common/Grade/GradeBadge";
import { getGenreLabel } from "@/lib/constants/marketOptions";
import { card } from "./cardStyles";

const GRADE_HOVER_EFFECT = {
  COMMON: "hover:shadow-[0_0_18px_rgba(255,255,255,0.25)]",
  RARE: "hover:shadow-[0_0_20px_rgba(41,182,246,0.45)]",
  SUPER_RARE: "hover:shadow-[0_0_24px_rgba(168,85,247,0.55)]",
  LEGENDARY: "hover:shadow-[0_0_30px_rgba(232,255,0,0.65)]",
};

const CARD_IMAGE_SIZES = "(min-width: 1920px) 360px, (min-width: 744px) 302px, 150px";
const LOGO_IMAGE_SIZES = "138px";

function getImageSrc(imageUrl) {
  const SERVER_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") ?? "";

  if (!imageUrl) return "/img/images/img1.png";
  if (imageUrl.startsWith("http")) return imageUrl;
  if (imageUrl.startsWith("/")) return imageUrl;

  return `${SERVER_URL}/${imageUrl}`;
}

function StatusOverlay({ item }) {
  if (item.status === "SOLD_OUT" || item.isSoldOut) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black/60">
        <span
          style={{ transform: "rotate(-24deg)" }}
          className="
            flex h-[74px] w-[74px]
            items-center justify-center rounded-full
            border-[3px] border-red
            text-center text-[18px] font-bold leading-[1.05]
            text-red
            tablet:h-[110px] tablet:w-[110px] tablet:border-[4px] tablet:text-[26px]
            desktop:h-[124px] desktop:w-[124px] desktop:text-[30px]
          "
        >
          SOLD
          <br />
          OUT
        </span>
      </div>
    );
  }

  if (item.status === "ON_SALE") {
    return (
      <div className="absolute left-[10px] top-[10px] rounded-sm bg-black/70 px-[10px] py-[4px]">
        <span className="text-[16px] font-normal text-white">판매 중</span>
      </div>
    );
  }

  if (item.status === "PENDING") {
    return (
      <div className="absolute left-[10px] top-[10px] rounded-sm bg-black/70 px-[10px] py-[4px]">
        <span className="text-[16px] font-normal text-main">교환 제시 대기 중</span>
      </div>
    );
  }

  return null;
}

export default function PhotoCard({ card: item, revealStatus = false }) {
  const imageSrc = getImageSrc(item.imageUrl);
  const hoverEffect = GRADE_HOVER_EFFECT[item.grade] ?? GRADE_HOVER_EFFECT.COMMON;

  return (
    <article
      className={`
        ${card.base}
        ${card.defaultSize}
        group
        cursor-pointer
        transition-all
        duration-300
        hover:-translate-y-2
        ${hoverEffect}
      `}
    >
      <div className={`${card.image} overflow-hidden`}>
        <Image
          src={imageSrc}
          alt={item.name}
          fill
          sizes={CARD_IMAGE_SIZES}
          className={`
            object-cover
            transition-transform
            duration-300
            group-hover:scale-105
            ${item.isSoldOut ? "brightness-[0.45] blur-[1px]" : ""}
          `}
        />

        {revealStatus && <StatusOverlay item={item} />}
        {!revealStatus && item.isSoldOut && <StatusOverlay item={item} />}
      </div>

      <h3 className={card.title}>{item.name}</h3>

      <div className={card.metaWrap}>
        <div className={card.metaInner}>
          <div className={card.gradeLine}>
            <GradeBadge grade={item.grade} size="xs" />
            <span className={card.divider} />
            <span className={card.genre}>{getGenreLabel(item.genre)}</span>
          </div>

          <span className={card.nickname}>{item.seller?.nickname ?? item.creator?.nickname}</span>
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
        <Image
          src="/img/logos/logo.png"
          alt="최애의 포토"
          fill
          sizes={LOGO_IMAGE_SIZES}
          className="object-contain"
        />
      </div>
    </article>
  );
}
