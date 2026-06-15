"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getMarketCards } from "@/lib/api/marketApi";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { QUERY_STALE_TIME } from "@/lib/constants/queryOptions";
import { normalizeMarketCard } from "@/lib/utils/marketMappers";

export function useMarketCards({ limit }) {
  const [gradeState, setGradeState] = useState("");
  const [genreState, setGenreState] = useState("");
  const [sortState, setSortState] = useState("latest");
  const [keywordState, setKeywordState] = useState("");
  const [cursor, setCursor] = useState();
  const [cursorHistory, setCursorHistory] = useState([]);

  const filters = useMemo(
    () => ({
      limit,
      keyword: keywordState.trim(),
      grade: gradeState,
      genre: genreState,
      sort: sortState,
    }),
    [genreState, gradeState, keywordState, limit, sortState],
  );

  const { data, isPending } = useQuery({
    queryKey: QUERY_KEYS.MARKET.LIST({ ...filters, cursor }),
    queryFn: async () => {
      const result = await getMarketCards({
        ...filters,
        cursor,
      });

      const cards = Array.isArray(result?.cards) ? result.cards : [];

      return {
        ...result,
        cards: cards.map(normalizeMarketCard),
      };
    },
    staleTime: QUERY_STALE_TIME.MEDIUM,
    retry: false,
  });

  const resetPagination = () => {
    setCursor(undefined);
    setCursorHistory([]);
  };

  const setGrade = (value) => {
    setGradeState(value);
    resetPagination();
  };

  const setGenre = (value) => {
    setGenreState(value);
    resetPagination();
  };

  const setSort = (value) => {
    setSortState(value);
    resetPagination();
  };

  const setKeyword = (value) => {
    setKeywordState(value);
    resetPagination();
  };

  const handlePrevPage = () => {
    setCursorHistory((prev) => {
      const nextHistory = prev.slice(0, -1);
      setCursor(nextHistory.at(-1));
      return nextHistory;
    });
  };

  const handleNextPage = () => {
    if (!data?.nextCursor) return;

    setCursorHistory((prev) => [...prev, data.nextCursor]);
    setCursor(data.nextCursor);
  };

  return {
    cards: data?.cards ?? [],
    data,
    isPending,
    page: cursorHistory.length + 1,
    grade: gradeState,
    genre: genreState,
    sort: sortState,
    keyword: keywordState,
    setGrade,
    setGenre,
    setSort,
    setKeyword,
    handlePrevPage,
    handleNextPage,
  };
}
