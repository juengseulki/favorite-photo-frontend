"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import { getSentExchangeProposals } from "@/lib/api/exchangeProposalApi";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";

export function useSentExchangeProposals(saleId) {
  const { isLoading, user } = useAuth();

  return useQuery({
    queryKey: QUERY_KEYS.EXCHANGES.SENT({ saleId }),
    queryFn: () => getSentExchangeProposals({ limit: 50 }),
    enabled: !isLoading && !!user && !!saleId,
    select: (res) =>
      (res.data?.items ?? []).filter((item) => Number(item.sale?.id) === Number(saleId)),
  });
}
