import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { modifySale } from "@/lib/api/salesApi";

export function useModifySale(saleId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => modifySale(saleId, payload),

    onSuccess: async (res) => {
      const updatedSale = res?.data ?? res;

      queryClient.setQueryData(QUERY_KEYS.SALES.DETAIL(saleId), (old) => {
        if (!old) return old;
        return {
          ...old,
          data: {
            ...old.data,
            ...updatedSale,
          },
        };
      });

      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SALES.DETAIL(saleId),
      });

      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.MARKET.DETAIL(saleId),
      });

      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SALES.ROOT,
      });

      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.MARKET.ROOT,
      });

      await queryClient.refetchQueries({
        queryKey: QUERY_KEYS.SALES.DETAIL(saleId),
        type: "active",
      });
    },
  });
}
