"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelExchangeProposal } from "@/lib/api/exchangeProposalApi";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";

export function useCancelExchangeProposal(saleId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (proposalId) => cancelExchangeProposal(proposalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EXCHANGES.ROOT });
      if (saleId) {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MARKET.DETAIL(Number(saleId)) });
      }
    },
  });
}
