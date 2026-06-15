import { getMyShopCards } from "@/lib/api/myShopApi";
import { useQuery } from "@tanstack/react-query";

export const useMyShopCards = ({
  keyword,
  grade,
  genre,
  tradeType,
  isSoldOut,
  page,
  limit,
  sort,
}) => {
  return useQuery({
    queryKey: ["MyShopCards", { keyword, grade, genre, tradeType, isSoldOut, page, limit, sort }], //이 값들이 변경되면, 데이터 패치 또한 다시 일어나게 하기 위함.
    queryFn: () =>
      getMyShopCards({ keyword, grade, genre, tradeType, isSoldOut, page, limit, sort }),
  });
};
