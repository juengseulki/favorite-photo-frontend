import Image from "next/image";

export default function MarketCardImage({ card }) {
  return (
    <div className="relative w-full shrink-0 tablet:w-[342px] desktop:w-[440px]">
      <div
        className="
          relative w-full
          aspect-[4/3]
          overflow-hidden
          border border-gray-400
          bg-gray-500
        "
      >
        <Image
          src={card.imageUrl}
          alt={card.name}
          fill
          className="object-cover"
          sizes="(max-width: 743px) 100vw, (max-width: 1199px) 342px, 440px"
          priority
        />

        {card.isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <span className="text-[24px] font-bold text-gray-300">SOLD OUT</span>
          </div>
        )}
      </div>

      <div className="mt-[16px] flex justify-center">
        <div className="relative h-[18px] w-[100px]">
          <Image
            src="/img/logos/logo.png"
            alt="최애의 포토"
            fill
            className="object-contain"
            sizes="100px"
          />
        </div>
      </div>
    </div>
  );
}
