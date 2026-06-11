import Button from "@/components/common/Button";
import Dropdown from "@/components/common/Dropdown";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";

export default function CreatePhotoCard() {
  return (
    <div className="mx-auto max-w-[1920px] px-[20px] desktop:px-[220px] gap-[80px]">
      <div className="hidden justify-between border-b-2 border-gray-100 desktop:flex mb-[80px]">
        <span className="text-[62px] font-normal tracking-[-0.03em] font-brand">포토카드 생성</span>
      </div>
      <form className="flex flex-col justify-center items-center gap-[65px] mb-30">
        <Input label={"포토카드 이름"} placeholder="포토카드 이름을 입력해주세요" />
        <Dropdown label={"등급"} placeholder="등급을 선택해 주세요" />
        <Dropdown label={"장르"} placeholder="장르를 선택해 주세요" />
        <Input label={"가격"} placeholder="가격을 입력해 주세요" />
        <Input label={"총 발행량"} placeholder="총 발행향을 입력해주세요" />
        <Input label={"사진 업로드"} placeholder="사진 업로드" />
        <Textarea label={"포토카드 설명"} placeholder="카드 설명을 입력해 주세요" />
        <Button size="create">생성하기</Button>
      </form>
    </div>
  );
}
