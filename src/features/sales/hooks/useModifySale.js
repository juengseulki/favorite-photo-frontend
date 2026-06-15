import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { modifySale } from "@/lib/api/salesApi";

export function useModifySale(saleId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => modifySale(saleId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SALES.DETAIL(saleId) });
    },
  });
}
