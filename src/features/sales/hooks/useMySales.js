import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { getMySales } from "@/lib/api/salesApi";

export function useMySales(filters = {}) {
  return useQuery({
    queryKey: QUERY_KEYS.SALES.MY(filters),
    queryFn: () => getMySales(filters),
    select: (res) => res.data,
  });
}
