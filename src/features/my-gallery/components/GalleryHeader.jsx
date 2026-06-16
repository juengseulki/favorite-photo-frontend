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

  return (
    <>
      <div className="border-b-2 border-gray-100 pb-[20px]">
        <div className="flex items-center justify-between">
          <span className="text-[24px] font-bold tracking-[-0.03em] tablet:text-[32px] desktop:text-[62px]">
            마이갤러리
          </span>

          <div className="hidden tablet:block">
            <Button size="lg" onClick={handleCreateCard} disabled={!canCreate}>
              포토카드 생성하기 ({remainingCount}/{limitCount})
            </Button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 z-50 w-full bg-black px-[20px] pb-[16px] pt-[12px] tablet:hidden">
        <Button size="full" onClick={handleCreateCard} disabled={!canCreate}>
          포토카드 생성하기 ({remainingCount}/{limitCount})
        </Button>
      </div>
    </>
  );
}
