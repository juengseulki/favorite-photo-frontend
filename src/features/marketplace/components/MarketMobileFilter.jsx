import Image from "next/image";

import Dropdown from "@/components/common/Dropdown";
import {
  MARKET_GENRE_OPTIONS,
  MARKET_GRADE_OPTIONS,
  MARKET_SALE_STATUS_OPTIONS,
  MARKET_SORT_OPTIONS,
} from "@/lib/constants/marketOptions";

const withOptionCounts = (options, counts = {}) =>
  options.map((option) =>
    option.value
      ? {
          ...option,
          label: `${option.label} ${counts[option.value] ?? 0}`,
        }
      : option,
  );

function FilterControls({
  grade,
  genre,
  saleStatus,
  counts,
  onGradeChange,
  onGenreChange,
  onSaleStatusChange,
}) {
  const gradeOptions = withOptionCounts(MARKET_GRADE_OPTIONS, counts?.grades);
  const genreOptions = withOptionCounts(MARKET_GENRE_OPTIONS, counts?.genres);
  const saleStatusOptions = withOptionCounts(MARKET_SALE_STATUS_OPTIONS, counts?.saleStatuses);

  return (
    <>
      <Dropdown
        placeholder="등급"
        size="sort"
        options={gradeOptions}
        value={grade}
        onChange={onGradeChange}
      />

      <Dropdown
        placeholder="장르"
        size="sort"
        options={genreOptions}
        value={genre}
        onChange={onGenreChange}
      />

      <Dropdown
        placeholder="매진여부"
        size="sort"
        options={saleStatusOptions}
        value={saleStatus}
        onChange={onSaleStatusChange}
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
