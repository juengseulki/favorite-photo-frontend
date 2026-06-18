import Image from "next/image";

export default function MarketDetailImage({ imageUrl, name, isSoldOut = false }) {
  return (
    <div
      className="
        relative shrink-0 overflow-hidden bg-gray-500

        h-[259px] w-full
        mobile:h-[259px] mobile:w-[345px]

        tablet:h-[257px] tablet:w-[342px]

        desktop:h-[530px] desktop:w-[960px]
      "
    >
      <Image
        src={imageUrl}
        alt={name}
        fill
        className="object-cover"
        sizes="(min-width: 1920px) 960px, (min-width: 744px) 342px, 345px"
      />

      {isSoldOut && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <Image
            src="/img/icons/soldout.png"
            alt="sold out"
            width={230}
            height={230}
            className="h-[120px] w-[120px] tablet:h-[160px] tablet:w-[160px] desktop:h-[230px] desktop:w-[230px]"
          />
        </div>
      )}
    </div>
  );
}
