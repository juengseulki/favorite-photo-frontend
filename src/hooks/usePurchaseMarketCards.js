"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { purchaseMarketCards } from "@/lib/api/marketApi";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";

export const usePurchaseMarketCards = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: purchaseMarketCards,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MARKET.ROOT });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POINTS.ROOT });

      options.onSuccess?.(...args);
    },
    ...options,
  });
};
