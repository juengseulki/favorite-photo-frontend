import Dropdown from "@/components/common/Dropdown";
import Input from "@/components/common/Input";
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

export default function MarketFilterBar({
  grade,
  genre,
  saleStatus,
  sort,
  keyword,
  counts,
  onGradeChange,
  onGenreChange,
  onSaleStatusChange,
  onSortChange,
  onKeywordChange,
}) {
  const gradeOptions = withOptionCounts(MARKET_GRADE_OPTIONS, counts?.grades);
  const genreOptions = withOptionCounts(MARKET_GENRE_OPTIONS, counts?.genres);
  const saleStatusOptions = withOptionCounts(MARKET_SALE_STATUS_OPTIONS, counts?.saleStatuses);

  return (
    <section className="mt-[20px] tablet:mt-[30px]">
      <div className="flex items-center justify-between gap-[20px]">
        <div className="flex items-center gap-[35px]">
          <Input
            inputClassName="w-full"
            labelSize="md"
            variant="search"
            placeholder="검색"
            size="searchLg"
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
          />

          <div className="hidden gap-[35px] tablet:flex">
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
          </div>
        </div>

        <Dropdown
          placeholder="정렬"
          size="sort"
          options={MARKET_SORT_OPTIONS}
          value={sort}
          onChange={onSortChange}
        />
      </div>
    </section>
  );
}
