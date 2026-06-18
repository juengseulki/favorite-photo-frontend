"use client";

// TODO: src/features/marketplace/hooks/useMarketCards.js 와 동명의 훅이 존재합니다.
// 이 파일은 (filters, options) 범용 버전, features 버전은 limit 특화 + 상태 내장 버전입니다.
// 혼용 시 import 경로 실수로 런타임 오류가 발생할 수 있으니 통합 여부를 검토해 주세요.
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
