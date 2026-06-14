import { useQuery } from "@tanstack/react-query";

import { getMarketDetail } from "@/lib/api/marketApi";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";

export function useMarketDetail(saleId) {
  return useQuery({
    queryKey: QUERY_KEYS.MARKET.DETAIL(saleId),
    queryFn: () => getMarketDetail(saleId),
    enabled: !!saleId,
  });
}
