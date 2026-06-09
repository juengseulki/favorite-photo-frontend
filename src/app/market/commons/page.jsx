import Button from "@/components/common/Button";
import { ExchangeCard, PhotoCard } from "@/components/common/Card";
import Dropdown from "@/components/common/Dropdown";
import FileInput from "@/components/common/FileInput";
import { GradeBadge, GradeChip } from "@/components/common/Grade";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";

export const metadata = {
  title: "Sale 상세페이지",
  description: "Sale 상세 페이지입니다. 카드의 상세 정보 확인 및 카드 구매가 가능합니다.",
};

const SaleDetailPage = () => {
  return (
    <>
      버튼
      <Button />
      드롭다운
      <Dropdown />
      fileinput
      <FileInput />
      input
      <Input />
      텍스트에리어
      <Textarea />
      그레이드뱃지
      <GradeBadge />
      그레이드칩
      <GradeChip />
    </>
  );
};

export default SaleDetailPage;
