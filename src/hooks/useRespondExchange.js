"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { respondExchange } from "@/lib/api/exchangeApi";

export function useRespondExchange(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: respondExchange,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: ["exchanges"] });
      await options.onSuccess?.(data, variables, context);
    },
    onError: options.onError,
  });
}
