import Dropdown from "@/components/common/Dropdown";
import Input from "@/components/common/Input";
import {
  MARKET_GENRE_OPTIONS,
  MARKET_GRADE_OPTIONS,
  MARKET_SALE_STATUS_OPTIONS,
  MARKET_SORT_OPTIONS,
} from "@/lib/constants/marketOptions";

export default function MarketFilterBar({
  grade,
  genre,
  saleStatus,
  sort,
  keyword,
  onGradeChange,
  onGenreChange,
  onSaleStatusChange,
  onSortChange,
  onKeywordChange,
}) {
  return (
    <section className="mt-[20px] tablet:mt-[30px]">
      <div className="flex w-full flex-col gap-[20px] tablet:flex-row tablet:items-center tablet:justify-between">
        <div className="flex w-full min-w-0 flex-col gap-[20px] tablet:w-auto tablet:flex-row tablet:items-center tablet:gap-[16px] desktop:gap-[35px]">
          <Input
            className="w-full tablet:w-auto"
            inputClassName="w-full tablet:w-[170px] desktop:w-[320px]"
            labelSize="md"
            variant="search"
            placeholder="검색"
            size="searchLg"
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
          />

          <div className="hidden gap-[16px] tablet:flex desktop:gap-[35px]">
            <Dropdown
              placeholder="등급"
              size="sort"
              options={MARKET_GRADE_OPTIONS}
              value={grade}
              onChange={onGradeChange}
              buttonClassName="h-auto w-auto border-0 px-0 tablet:text-[12px] desktop:text-[14px]"
            />

            <Dropdown
              placeholder="장르"
              size="sort"
              options={MARKET_GENRE_OPTIONS}
              value={genre}
              onChange={onGenreChange}
              buttonClassName="h-auto w-auto border-0 px-0 tablet:text-[12px] desktop:text-[14px]"
            />

            <Dropdown
              placeholder="매진여부"
              size="sort"
              options={MARKET_SALE_STATUS_OPTIONS}
              value={saleStatus}
              onChange={onSaleStatusChange}
              buttonClassName="h-auto w-auto border-0 px-0 tablet:text-[12px] desktop:text-[14px]"
            />
          </div>
        </div>

        <div className="hidden tablet:block">
          <Dropdown
            placeholder="정렬"
            size="sort"
            options={MARKET_SORT_OPTIONS}
            value={sort}
            onChange={onSortChange}
            buttonClassName="tablet:w-[120px] tablet:text-[12px] desktop:w-[180px] desktop:text-[14px]"
          />
        </div>
      </div>
    </section>
  );
}
