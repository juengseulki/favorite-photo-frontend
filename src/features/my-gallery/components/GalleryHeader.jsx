import Button from "@/components/common/Button";

export default function GalleryHeader() {
  return (
    <>
      <div className="hidden justify-between border-b-2 border-gray-100 desktop:flex">
        <span className="text-[62px] font-normal tracking-[-0.03em]">마이갤러리</span>
        <Button>포토카드 생성하기</Button>
      </div>

      <div className="fixed bottom-0 left-0 z-50 w-full px-[20px] pb-[20px] tablet:hidden">
        <Button size="full">포토카드 생성하기</Button>
      </div>
    </>
  );
}
