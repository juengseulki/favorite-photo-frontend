"use client";

import Image from "next/image";
import Button from "@/components/common/Button";
import { ROUTES } from "@/lib/constants/routes";
import { useRouter } from "next/navigation";

export default function GalleryHeader({ createStatus }) {
  const router = useRouter();

  if (!createStatus) return null;

  const handleCreateCard = () => {
    router.push(ROUTES.CREATE_CARD);
  };

  const remainingCount = createStatus.remainingCreateCount;
  const limitCount = createStatus.monthlyCreateLimit;
  const canCreate = createStatus.canCreate;
  const year = createStatus.year;
  const month = createStatus.month;

  return (
    <>
      <div className="mb-[20px] flex h-[60px] items-center justify-center border-b border-gray-450 tablet:hidden">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="뒤로가기"
          className="absolute left-[15px] flex h-[22px] w-[22px] items-center justify-center"
        >
          <Image src="/img/icons/back.png" alt="" width={22} height={22} />
        </button>

        <span className="font-brand text-[16px] font-bold text-white">마이갤러리</span>
      </div>

      <div className="hidden border-b-2 border-gray-100 pb-[20px] tablet:block">
        <div className="flex items-center justify-between">
          <span className="font-brand text-[32px] font-bold tracking-[-0.03em] desktop:text-[62px]">
            마이갤러리
          </span>

          <Button size="lg" onClick={handleCreateCard} disabled={!canCreate}>
            {year}년 {month}월 포토카드 생성하기 ({remainingCount}/{limitCount})
          </Button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 z-10 w-full bg-black px-[20px] pb-[16px] pt-[12px] tablet:hidden">
        <Button size="full" onClick={handleCreateCard} disabled={!canCreate}>
          {year}년 {month}월 포토카드 생성하기 ({remainingCount}/{limitCount})
        </Button>
      </div>
    </>
  );
}
