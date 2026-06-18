// TODO: 이 훅은 현재 어디서도 import되지 않습니다.
// PurchaseConfirmModal 등에 연결하거나, 사용하지 않는다면 삭제를 검토해 주세요.
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { purchaseCard } from "@/lib/api/marketApi";

export function usePurchaseCard(saleId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (quantity) => purchaseCard({ saleId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MARKET.DETAIL(saleId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MARKET.ROOT });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH.ME() });
    },
  });
}
