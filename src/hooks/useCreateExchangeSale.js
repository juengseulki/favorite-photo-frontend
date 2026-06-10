"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExchangeSale } from "@/lib/api/exchangeApi";

const EXCHANGE_SALES_QUERY_KEY = ["exchange-sales"];

export function useCreateExchangeSale(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExchangeSale,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: EXCHANGE_SALES_QUERY_KEY });
      await options.onSuccess?.(data, variables, context);
    },
    onError: options.onError,
  });
}
