import Image from "next/image";
import { useRouter } from "next/navigation";

const MyShopHeader = () => {
  const router = useRouter();
  return (
    <>
      <div className="tablet:hidden flex justify-between gap-[20px] h-[60px] font-brand text-[20px] font-normal ">
        <button
          className="w-[22px] h-[22px] relative shrink-0"
          onClick={() => router.push("/market")}
        >
          <Image src="/img/icons/back.png" alt="뒤로가기 아이콘" fill />
        </button>
        <div className="shrink-0">나의 판매 포토카드</div>
        <div className="w-[22px] h-[22px] shrink-0" />
      </div>
      <div className="hidden tablet:block max-w-[1480px] font-brand tablet:text-[48px] desktop:text-[62px] font-normal border-solid border-b-2 border-gray-100 ">
        <div>나의 판매 포토카드</div>
      </div>
    </>
  );
};

export default MyShopHeader;
