import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { cancelSale } from "@/lib/api/salesApi";

export function useCancelSale(saleId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cancelSale(saleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SALES.ROOT });
    },
  });
}
