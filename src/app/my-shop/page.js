import MyShopClient from "./page.client";

export const metadata = {
  title: "나의 판매 포토카드",
  description:
    "나의 판매 포토카드 페이지 입니다. 내가 판매한 포토카드와, 교환 제시한 포토카드 목록을 확인할 수 있습니다.",
};

const MyShopPage = () => {
  return <MyShopClient />;
};

export default MyShopPage;
