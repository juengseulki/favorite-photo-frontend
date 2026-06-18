import { useMutation, useQueryClient } from "@tanstack/react-query";
import { purchaseMarketCards } from "@/lib/api/marketApi";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { useAuth } from "@/providers/AuthProvider";

export function usePurchaseMarketCard(saleId) {
  const queryClient = useQueryClient();
  const { updatePoint } = useAuth();

  return useMutation({
    mutationFn: ({ quantity }) =>
      purchaseMarketCards({
        saleId,
        quantity,
      }),

    onSuccess: (data) => {
      const newBalance = data?.buyerPoint ?? data?.point ?? data?.balance ?? data?.user?.point;

      if (newBalance !== undefined) {
        updatePoint(newBalance);
      }

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.MARKET.DETAIL(saleId),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.MARKET.ROOT,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.AUTH.ME(),
      });
    },
  });
}
