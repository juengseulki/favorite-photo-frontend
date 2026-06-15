"use client";

import MyShopCards from "@/features/my-shop/components/MyShopCards";
import MyShopFilterBar from "@/features/my-shop/components/MyShopFilterBar";
import MyShopFilterModal from "@/features/my-shop/components/MyShopFilterModal";
import MyShopGradeSummary from "@/features/my-shop/components/MyShopGradeSummary";
import MyShopHeader from "@/features/my-shop/components/MyShopHeader";
import MyShopPagination from "@/features/my-shop/components/MyShopPagination";
import { useMyShopCards } from "@/features/my-shop/hooks/useMyShopCards";
import { useState } from "react";

const MyShopClient = () => {
  const [keyword, setKeyword] = useState("");
  const [grade, setGrade] = useState("");
  const [genre, setGenre] = useState("");
  const [tradeType, setTradeType] = useState("");
  const [isSoldOut, setIsSoldOut] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(16); //데스크톱 15개, 태블릿 & 모바일 16개

  const [openFilter, setOpenFilter] = useState(false);

  const { data, isLoading, isError, error } = useMyShopCards({
    keyword,
    grade,
    genre,
    tradeType,
    isSoldOut,
    page,
    limit,
  });

  if (isLoading) return <div>로딩 중..</div>;
  if (isError) return <div>데이터를 가져오던 중 에러가 발생했습니다.</div>;

  //items를 가져온 뒤에 접근.
  const items = data.items || [];
  const meta = data.meta;

  //각 Grade별 개수
  const grades = [
    {
      grade: "COMMON",
      count: items.filter((item) => item.grade === "COMMON").length,
    },
    {
      grade: "RARE",
      count: items.filter((item) => item.grade === "RARE").length,
    },
    {
      grade: "SUPER_RARE",
      count: items.filter((item) => item.grade === "SUPER_RARE").length,
    },
    {
      grade: "LEGENDARY",
      count: items.filter((item) => item.grade === "LEGENDARY").length,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1840px] px-[15px] tablet:px-[20px] desktop:px-[220px] ">
      <div className="flex flex-col gap-[15px] tablet:gap-[40px] ">
        <MyShopHeader />
        <MyShopGradeSummary meta={meta} grades={grades} />
        <div className="border-t border-gray-400">
          <MyShopFilterBar
            grade={grade}
            onGradeChange={setGrade}
            genre={genre}
            onGenreChange={setGenre}
            tradeType={tradeType}
            onTradeTypeChange={setTradeType}
            isSoldOut={isSoldOut}
            onIsSoldOutChange={setIsSoldOut}
            openFilter={openFilter}
            onOpenFilter={() => setOpenFilter((prev) => !prev)}
            keyword={keyword}
            onKeywordChange={setKeyword}
          />
        </div>

        <MyShopCards cards={items} />
        <MyShopPagination page={page} meta={meta} limit={limit} setPage={setPage} />
      </div>
      {openFilter && (
        <MyShopFilterModal
          isOpen={openFilter}
          onClose={() => setOpenFilter(false)}
          grade={grade}
          genre={genre}
          tradeType={tradeType}
          isSoldOut={isSoldOut}
          onGradeChange={setGrade}
          onGenreChange={setGenre}
          onTradeTypeChange={setTradeType}
          onIsSoldOutChange={setIsSoldOut}
        />
      )}
    </div>
  );
};

export default MyShopClient;
