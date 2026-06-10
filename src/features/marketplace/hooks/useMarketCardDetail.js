import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { getMarketCardDetail } from "@/lib/api/marketApi";

export function useMarketCardDetail(saleId) {
  return useQuery({
    queryKey: QUERY_KEYS.MARKET.DETAIL(saleId),
    queryFn: () => getMarketCardDetail(saleId),
    enabled: !!saleId,
    select: (res) => res.data,
  });
}
