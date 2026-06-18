"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExchangeProposal } from "@/lib/api/exchangeApi";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";

export function useCreateExchangeSale(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExchangeProposal,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EXCHANGES.ROOT });
      await options.onSuccess?.(data, variables, context);
    },
    onError: options.onError,
  });
}
