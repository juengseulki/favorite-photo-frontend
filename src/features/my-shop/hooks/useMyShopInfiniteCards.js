import { getMyShopCards } from "@/lib/api/myShopApi";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useMyShopInfiniteCards = ({
  keyword,
  grade,
  genre,
  tradeType,
  isSoldOut,
  limit,
  sort,
}) => {
  return useInfiniteQuery({
    queryKey: ["MyShopInfiniteCards", { keyword, grade, genre, tradeType, isSoldOut, limit, sort }], //이 값들이 변경되면, 데이터 패치 또한 다시 일어나게 하기 위함.
    queryFn: async ({ pageParam = 1 }) =>
      getMyShopCards({ keyword, grade, genre, tradeType, isSoldOut, page: pageParam, limit, sort }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.meta;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};
