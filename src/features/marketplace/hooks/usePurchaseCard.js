import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { purchaseCard } from "@/lib/api/marketApi";

export function usePurchaseCard(saleId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (quantity) => purchaseCard({ saleId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MARKET.DETAIL(saleId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MARKET.ROOT });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH.ME() });
    },
  });
}
