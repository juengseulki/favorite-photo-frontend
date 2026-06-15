import { PhotoCard } from "@/components/common/Card";
import Link from "next/link";

const MyShopCards = ({ cards }) => {
  if (cards.length === 0) {
    return <div className="text-gray-200">판매&교환 카드가 없습니다.</div>;
  }
  return (
    <div
      className="
          grid
          grid-cols-2
          justify-items-center
          gap-x-[15px]
          gap-y-[20px]
  
          tablet:grid-cols-2
          tablet:gap-x-[10px]
          tablet:gap-y-[20px]
  
          desktop:grid-cols-3
          desktop:justify-items-start
          desktop:gap-x-[80px]
          desktop:gap-y-[80px]
        "
    >
      {cards.map((card) => (
        <Link key={card.saleId} href={`/my-shop/${card.saleId}`}>
          <PhotoCard card={card} revealStatus={true} />
        </Link>
      ))}
    </div>
  );
};

export default MyShopCards;
