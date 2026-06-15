import Image from "next/image";

export default function MarketDetailImage({ imageUrl, name }) {
  return (
    <div className="relative aspect-[1.35/1] w-full shrink-0 overflow-hidden bg-gray-500 desktop:h-[530px] desktop:w-[960px] desktop:aspect-auto">
      <Image src={imageUrl} alt={name} fill className="object-cover" sizes="960px" />
    </div>
  );
}
