"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { respondExchange } from "@/lib/api/exchangeApi";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";

export function useRespondExchange(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: respondExchange,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EXCHANGES.ROOT });
      await options.onSuccess?.(data, variables, context);
    },
    onError: options.onError,
  });
}
