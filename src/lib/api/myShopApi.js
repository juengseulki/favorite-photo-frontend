import { axiosInstance } from "@/lib/api/axiosInstance";
import { API_ROUTES } from "@/lib/constants/apiRoutes";

export async function getMyShopCards({
  keyword = "", //값이 들어가지 않았을 경우를 위해.
  grade = "",
  genre = "",
  tradeType = "",
  isSoldOut = "",
  page = 1,
  limit = 15,
  sort = "latest",
}) {
  const response = await axiosInstance.get(
    `${API_ROUTES.SALES.MY}?keyword=${keyword}&grade=${grade}&genre=${genre}&tradeType=${tradeType}&isSoldOut=${isSoldOut}&page=${page}&limit=${limit}&sort=${sort}`,
  );
  return response.data;
}
