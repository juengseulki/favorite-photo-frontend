import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { getReceivedExchangeProposals } from "@/lib/api/exchangeProposalApi";

export function useExchangeProposals(saleId) {
  return useQuery({
    queryKey: QUERY_KEYS.EXCHANGES.RECEIVED({ saleId }),
    queryFn: () => getReceivedExchangeProposals({ limit: 50 }),
    enabled: !!saleId,
    select: (res) => (res.data?.items ?? []).filter((item) => item.sale?.id === saleId),
  });
}
