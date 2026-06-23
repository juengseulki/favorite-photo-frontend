import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { getReceivedExchangeProposals } from "@/lib/api/exchangeProposalApi";
import { useAuth } from "@/providers/AuthProvider";

export function useExchangeProposals(saleId) {
  const { user, isLoading } = useAuth();

  return useQuery({
    queryKey: QUERY_KEYS.EXCHANGES.RECEIVED({ saleId }),

    queryFn: () => getReceivedExchangeProposals({ limit: 50 }),

    enabled: !isLoading && !!user && !!saleId,

    select: (res) =>
      (res.data?.items ?? []).filter((item) => Number(item.sale?.id) === Number(saleId)),
  });
}
