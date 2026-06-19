"use client";

import { useMemo, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { getMarketCards } from "@/lib/api/marketApi";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { QUERY_STALE_TIME } from "@/lib/constants/queryOptions";
import { normalizeMarketCard } from "@/lib/utils/marketMappers";

export function useMarketCards({ limit }) {
  const [gradeState, setGradeState] = useState("");
  const [genreState, setGenreState] = useState("");
  const [saleStatusState, setSaleStatusState] = useState("");
  const [sortState, setSortState] = useState("latest");
  const [keywordState, setKeywordState] = useState("");

  const filters = useMemo(
    () => ({
      limit,
      keyword: keywordState.trim(),
      grade: gradeState,
      genre: genreState,
      saleStatus: saleStatusState,
      sort: sortState,
    }),
    [genreState, gradeState, keywordState, limit, saleStatusState, sortState],
  );

  const countFilters = useMemo(
    () => ({
      limit: 1,
      keyword: keywordState.trim(),
      sort: sortState,
    }),
    [keywordState, sortState],
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

  const { data: countData } = useQuery({
    queryKey: [...QUERY_KEYS.MARKET.ROOT, "filter-counts", countFilters],
    queryFn: () => getMarketCards(countFilters),
    staleTime: QUERY_STALE_TIME.MEDIUM,
    retry: false,
  });

  const currentCounts = data?.pages[0]?.counts;

  return {
    cards: data?.pages.flatMap((page) => page.cards ?? []) ?? [],
    counts: countData?.counts ?? currentCounts,
    resultCounts: currentCounts,
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
