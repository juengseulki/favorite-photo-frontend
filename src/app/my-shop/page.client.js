"use client";

import MyShopCards from "@/features/my-shop/components/MyShopCards";
import MyShopFilterBar from "@/features/my-shop/components/MyShopFilterBar";
import MyShopGradeSummary from "@/features/my-shop/components/MyShopGradeSummary";
import MyShopHeader from "@/features/my-shop/components/MyShopHeader";
import MyShopPagination from "@/features/my-shop/components/MyShopPagination";

const MyShopClient = () => {
  return (
    <div>
      <MyShopHeader />
      <MyShopGradeSummary />
      <MyShopFilterBar />
      <MyShopCards />
      <MyShopPagination />
    </div>
  );
};

export default MyShopClient;
