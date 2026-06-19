import Image from "next/image";
import Dropdown from "@/components/common/Dropdown";
import Input from "@/components/common/Input";
import { GRADE_OPTIONS, GENRE_OPTIONS } from "@/lib/constants/galleryOptions";

export default function GalleryFilterBar({
  grade,
  genre,
  keyword,
  onGradeChange,
  onGenreChange,
  onKeywordChange,
  onOpenFilter,
}) {
  return (
    <div className="mt-3 mb-3 flex justify-between gap-3 tablet:mb-20 tablet:justify-start">
      <button
        type="button"
        onClick={onOpenFilter}
        className="flex h-[50px] w-[50px] shrink-0 items-center justify-center border border-gray-200 bg-black tablet:hidden"
      >
        <Image src="/img/icons/filter.png" alt="모바일 필터 버튼" width={15} height={15} />
      </button>

      <Input
        inputClassName="w-full"
        labelSize="md"
        variant="search"
        placeholder="검색"
        size="searchLg"
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
      />

      <div className="hidden tablet:flex items-center">
        <Dropdown
          placeholder="등급"
          size=""
          options={GRADE_OPTIONS}
          value={grade}
          onChange={onGradeChange}
          iconSize={22}
          buttonClassName="gap-[10px] border-none text-gray-200 font-bold h-[22px]"
        />
      </div>

      <div className="hidden tablet:flex items-center">
        <Dropdown
          placeholder="장르"
          size=""
          options={GENRE_OPTIONS}
          value={genre}
          onChange={onGenreChange}
          iconSize={22}
          buttonClassName="gap-[10px] border-none text-gray-200 font-bold h-[22px]"
        />
      </div>
    </div>
  );
}
