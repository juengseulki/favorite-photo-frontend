"use client";

import HopeExchangeDetail from "@/features/sales/components/HopeExchangeDetail";
import MarketMiniLogo from "@/features/sales/components/MarketMiniLogo";
import SailDetail from "@/features/sales/components/SailDetail";

export default function SaleDetailClient() {
  return (
    <>
      <MarketMiniLogo />
      <SailDetail />
      <HopeExchangeDetail />
    </>
  );
}
