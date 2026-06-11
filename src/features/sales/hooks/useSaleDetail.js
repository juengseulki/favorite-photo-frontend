import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { getSaleDetail } from "@/lib/api/salesApi";

export function useSaleDetail(saleId) {
  return useQuery({
    queryKey: QUERY_KEYS.SALES.DETAIL(saleId),
    queryFn: () => getSaleDetail(saleId),
    enabled: !!saleId,
    select: (res) => res.data,
  });
}
