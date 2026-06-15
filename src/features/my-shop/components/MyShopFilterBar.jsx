"use client";

import Dropdown from "@/components/common/Dropdown";
import Input from "@/components/common/Input";
import { GENRE_OPTIONS, GRADE_OPTIONS } from "@/lib/constants/galleryOptions";
import { SOLDOUT_OPTIONS, TRADE_OPTIONS } from "@/lib/constants/myShopOptions";

const MyShopFilterBar = ({
  grade,
  onGradeChange,
  genre,
  onGenreChange,
  tradeType,
  onTradeTypeChange,
  isSoldOut,
  onIsSoldOutChange,
}) => {
  return (
    <div className="flex gap-[10px] tablet:gap-[30px] desktop:gap-[60px]">
      <div className="tablet:hidden">filtericon</div>
      <Input
        size="searchMd"
        labelSize="md"
        variant="search"
        inputClassName="w-full"
        placeholder="검색"
      />
      <div className="hidden tablet:flex tablet:gap-[25px] desktop:gap-[45px]">
        <Dropdown
          placeholder="등급"
          size=""
          iconSize={22}
          options={GRADE_OPTIONS}
          value={grade}
          onChange={onGradeChange}
          buttonClassName="gap-[10px] border-none text-gray-200 font-bold h-[22px] w-[88px]"
        />
        <Dropdown
          placeholder="장르"
          size="sort"
          options={GENRE_OPTIONS}
          value={genre}
          onChange={onGenreChange}
        />
        <Dropdown
          placeholder="판매방법"
          size="sort"
          options={TRADE_OPTIONS}
          value={tradeType}
          onChange={onTradeTypeChange}
        />
        <Dropdown
          placeholder="매진여부"
          size="sort"
          options={SOLDOUT_OPTIONS}
          value={isSoldOut}
          onChange={onIsSoldOutChange}
        />
      </div>
    </div>
  );
};

export default MyShopFilterBar;
