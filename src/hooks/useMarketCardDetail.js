"use client";

import { useQuery } from "@tanstack/react-query";
import { getMarketCardDetail } from "@/lib/api/marketApi";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { QUERY_STALE_TIME } from "@/lib/constants/queryOptions";
import { normalizeMarketCard } from "@/lib/utils/marketMappers";

export const useMarketCardDetail = (saleId, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.MARKET.DETAIL(saleId),
    queryFn: async () => {
      const data = await getMarketCardDetail(saleId);
      return normalizeMarketCard(data);
    },
    enabled: Boolean(saleId),
    staleTime: QUERY_STALE_TIME.SHORT,
    ...options,
  });
};
