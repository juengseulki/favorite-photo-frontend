"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchExchangeCards } from "@/lib/api/exchangeApi";
import { normalizeExchangeCard } from "@/lib/utils/exchangeMappers";

export function useExchangeCards(filters = {}, options = {}) {
  return useQuery({
    queryKey: ["exchange-cards", filters],
    queryFn: async () => {
      const data = await fetchExchangeCards(filters);
      const cards = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];

      return cards
        .map(normalizeExchangeCard)
        .filter((card) => Boolean(card.cardCopyId))
        .filter((card) => Number(card.count ?? 0) > 0);
    },
    staleTime: 1000 * 30,
    ...options,
  });
}
