import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import FileInput from "@/components/common/FileInput";

export default function InputTestPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] p-20">
      <div className="flex flex-col gap-10">
        <Input label="포토카드 이름" placeholder="포토카드 이름을 입력해 주세요" size="lg" />

        <Input label="가격" placeholder="가격을 입력해 주세요" size="lg" />

        <Input label="비밀번호" type="password" placeholder="비밀번호를 입력해 주세요" size="lg" />

        <Input label="검색" variant="search" placeholder="검색" size="searchLg" />

        <FileInput label="사진 업로드" size="lg" />

        <Textarea label="포토카드 설명" placeholder="카드 설명을 입력해 주세요" size="lg" />
      </div>
    </main>
  );
}
