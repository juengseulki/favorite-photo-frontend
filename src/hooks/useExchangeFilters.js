"use client";

import { useMemo, useState } from "react";
import { EXCHANGE_FILTER_ALL } from "@/lib/constants/exchangeOptions";

export function useExchangeFilters(initialFilters = {}) {
  const [keyword, setKeyword] = useState(initialFilters.keyword ?? "");
  const [grade, setGrade] = useState(initialFilters.grade ?? EXCHANGE_FILTER_ALL);
  const [genre, setGenre] = useState(initialFilters.genre ?? EXCHANGE_FILTER_ALL);

  const filters = useMemo(
    () => ({
      keyword,
      grade,
      genre,
    }),
    [genre, grade, keyword],
  );

  const resetFilters = () => {
    setKeyword("");
    setGrade(EXCHANGE_FILTER_ALL);
    setGenre(EXCHANGE_FILTER_ALL);
  };

  return {
    keyword,
    setKeyword,
    grade,
    setGrade,
    genre,
    setGenre,
    filters,
    resetFilters,
  };
}
