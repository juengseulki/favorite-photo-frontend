import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { rejectExchangeProposal } from "@/lib/api/exchangeProposalApi";

export function useRejectExchangeProposal(saleId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (proposalId) => rejectExchangeProposal(proposalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EXCHANGES.ROOT });
      if (saleId) {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SALES.DETAIL(saleId) });
      }
    },
  });
}
