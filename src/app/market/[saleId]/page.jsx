import SaleDetailClient from "./page.client";

export const metadata = {
  title: "Sale 상세페이지",
  description: "Sale 상세 페이지입니다. 카드의 상세 정보 확인 및 카드 구매가 가능합니다.",
};

const SaleDetailPage = () => {
  return <SaleDetailClient />;
};

export default SaleDetailPage;
