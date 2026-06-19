import Image from "next/image";
import { useRouter } from "next/navigation";

const MyShopHeader = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex h-[60px] items-center justify-between tablet:hidden">
        <button
          type="button"
          className="relative h-[22px] w-[22px] shrink-0"
          onClick={() => router.push("/market")}
        >
          <Image src="/img/icons/back.png" alt="뒤로가기 아이콘" fill />
        </button>

        <div className="font-brand text-[20px] font-normal">나의 판매 포토카드</div>

        <div className="h-[22px] w-[22px] shrink-0" />
      </div>

      <div className="hidden max-w-[1480px] border-b-2 border-solid border-gray-100 pb-[20px] font-brand font-normal tablet:block tablet:text-[48px] desktop:text-[62px]">
        <div>나의 판매 포토카드</div>
      </div>
    </>
  );
};

export default MyShopHeader;
