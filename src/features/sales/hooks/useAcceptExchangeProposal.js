import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { acceptExchangeProposal } from "@/lib/api/exchangeProposalApi";

export function useAcceptExchangeProposal(saleId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (proposalId) => acceptExchangeProposal(proposalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EXCHANGES.ROOT });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SALES.DETAIL(saleId) });
    },
  });
}
