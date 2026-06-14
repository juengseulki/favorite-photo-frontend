import Image from "next/image";

import Dropdown from "@/components/common/Dropdown";
import {
  MARKET_GENRE_OPTIONS,
  MARKET_GRADE_OPTIONS,
  MARKET_SORT_OPTIONS,
} from "@/lib/constants/marketOptions";

function FilterControls({ grade, genre, onGradeChange, onGenreChange }) {
  return (
    <>
      <Dropdown
        placeholder="등급"
        size="sort"
        options={MARKET_GRADE_OPTIONS}
        value={grade}
        onChange={onGradeChange}
      />

      <Dropdown
        placeholder="장르"
        size="sort"
        options={MARKET_GENRE_OPTIONS}
        value={genre}
        onChange={onGenreChange}
      />
    </>
  );
}

export default function MarketMobileFilter({ sort, onSortChange, onOpenFilter }) {
  return (
    <div className="mt-[30px] flex items-center justify-between border-t border-gray-400 pt-[30px] tablet:hidden">
      <button
        type="button"
        onClick={onOpenFilter}
        className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[2px] border border-gray-200 bg-black"
        aria-label="필터 열기"
      >
        <Image src="/img/icons/filter.png" alt="" width={15} height={15} />
      </button>

      <Dropdown
        placeholder="정렬"
        size="sort"
        options={MARKET_SORT_OPTIONS}
        value={sort}
        onChange={onSortChange}
      />
    </div>
  );
}

MarketMobileFilter.FilterControls = FilterControls;
