"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getMarketCards } from "@/lib/api/marketApi";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { QUERY_STALE_TIME } from "@/lib/constants/queryOptions";
import { normalizeMarketCard } from "@/lib/utils/marketMappers";

export const useMarketCards = (filters = {}, options = {}) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.MARKET.LIST(filters),
    queryFn: async ({ pageParam }) => {
      const data = await getMarketCards({
        ...filters,
        cursor: pageParam,
      });
      const cards = Array.isArray(data?.cards) ? data.cards : [];

      return {
        ...data,
        cards: cards.map(normalizeMarketCard),
      };
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    staleTime: QUERY_STALE_TIME.MEDIUM,
    ...options,
  });
};
