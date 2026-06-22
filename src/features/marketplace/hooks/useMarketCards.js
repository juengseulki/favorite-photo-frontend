"use client";

import { useMemo, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { getMarketCards, getMarketCounts } from "@/lib/api/marketApi";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { QUERY_STALE_TIME } from "@/lib/constants/queryOptions";
import { normalizeMarketCard } from "@/lib/utils/marketMappers";

const EMPTY_COUNTS = {
  grades: {},
  genres: {},
  saleStatuses: {
    onSale: 0,
    soldOut: 0,
  },
};

export function useMarketCards({ limit }) {
  const [gradeState, setGradeState] = useState("");
  const [genreState, setGenreState] = useState("");
  const [saleStatusState, setSaleStatusState] = useState("");
  const [sortState, setSortState] = useState("latest");
  const [keywordState, setKeywordState] = useState("");

  const filters = useMemo(
    () => ({
      limit,
      sort: sortState,
      ...(keywordState.trim() && { keyword: keywordState.trim() }),
      ...(gradeState && { grade: gradeState }),
      ...(genreState && { genre: genreState }),
      ...(saleStatusState && { saleStatus: saleStatusState }),
    }),
    [genreState, gradeState, keywordState, limit, saleStatusState, sortState],
  );

  const countFilters = useMemo(
    () => ({
      ...(keywordState.trim() && { keyword: keywordState.trim() }),
      ...(gradeState && { grade: gradeState }),
      ...(genreState && { genre: genreState }),
      ...(saleStatusState && { saleStatus: saleStatusState }),
    }),
    [genreState, gradeState, keywordState, saleStatusState],
  );

  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: QUERY_KEYS.MARKET.LIST(filters),
    queryFn: async ({ pageParam }) => {
      const result = await getMarketCards({
        ...filters,
        cursor: pageParam,
      });

      const cards = Array.isArray(result?.cards) ? result.cards : [];

      return {
        ...result,
        cards: cards.map(normalizeMarketCard),
      };
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    staleTime: QUERY_STALE_TIME.MEDIUM,
    retry: false,
  });

  const { data: counts = EMPTY_COUNTS } = useQuery({
    queryKey: QUERY_KEYS.MARKET.COUNTS(countFilters),
    queryFn: () => getMarketCounts(countFilters),
    staleTime: QUERY_STALE_TIME.MEDIUM,
    retry: false,
  });

  return {
    cards: data?.pages.flatMap((page) => page.cards ?? []) ?? [],
    counts,
    resultCounts: counts,
    data,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    grade: gradeState,
    genre: genreState,
    saleStatus: saleStatusState,
    sort: sortState,
    keyword: keywordState,
    setGrade: setGradeState,
    setGenre: setGenreState,
    setSaleStatus: setSaleStatusState,
    setSort: setSortState,
    setKeyword: setKeywordState,
  };
}
