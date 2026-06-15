import Dropdown from "@/components/common/Dropdown";
import Input from "@/components/common/Input";
import { GENRE_OPTIONS, GRADE_OPTIONS } from "@/lib/constants/galleryOptions";
import { SOLDOUT_OPTIONS, TRADE_OPTIONS } from "@/lib/constants/myShopOptions";
import Image from "next/image";

const MyShopFilterBar = ({
  grade,
  onGradeChange,
  genre,
  onGenreChange,
  tradeType,
  onTradeTypeChange,
  isSoldOut,
  onIsSoldOutChange,
  onOpenFilter,
  keyword,
  onKeywordChange,
}) => {
  return (
    <div className="flex items-center gap-[10px] tablet:gap-[30px] desktop:gap-[60px] my-[20px]">
      <div className="tablet:hidden">
        <button
          type="button"
          onClick={onOpenFilter}
          className="flex h-[50px] w-[50px] shrink-0 items-center justify-center border border-gray-200 bg-black tablet:hidden rounded-sm"
        >
          <Image src="/img/icons/filter.png" alt="모바일 필터 버튼" width={15} height={15} />
        </button>
      </div>
      <Input
        size="searchLg"
        labelSize="md"
        variant="search"
        inputClassName="w-full"
        placeholder="검색"
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
      />
      <div className="hidden tablet:flex tablet:gap-[25px] desktop:gap-[45px]">
        <Dropdown
          placeholder="등급"
          options={GRADE_OPTIONS}
          value={grade}
          onChange={onGradeChange}
          size=""
          iconSize={22}
          buttonClassName="gap-[10px] border-none text-gray-200 font-bold h-[22px] w-[88px]"
        />
        <Dropdown
          placeholder="장르"
          options={GENRE_OPTIONS}
          value={genre}
          onChange={onGenreChange}
          size=""
          iconSize={22}
          buttonClassName="gap-[10px] border-none text-gray-200 font-bold h-[22px] w-[88px]"
        />
        <Dropdown
          placeholder="판매방법"
          options={TRADE_OPTIONS}
          value={tradeType}
          onChange={onTradeTypeChange}
          size=""
          iconSize={22}
          buttonClassName="gap-[10px] border-none text-gray-200 font-bold h-[22px] w-[88px]"
        />
        <Dropdown
          placeholder="매진여부"
          options={SOLDOUT_OPTIONS}
          value={isSoldOut}
          onChange={onIsSoldOutChange}
          size=""
          iconSize={22}
          buttonClassName="gap-[10px] border-none text-gray-200 font-bold h-[22px] w-[88px]"
        />
      </div>
    </div>
  );
};

export default MyShopFilterBar;
