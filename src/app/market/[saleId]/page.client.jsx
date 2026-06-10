"use client";

import HopeExchangeDetail from "@/features/sales/components/HopeExchangeDetail";
import MarketMiniLogo from "@/features/sales/components/MarketMiniLogo";
import SailDetail from "@/features/sales/components/SailDetail";

export default function SaleDetailClient() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-[60px] max-w-[1480px]">
        <MarketMiniLogo />
        <div className="flex flex-col gap-[120px]">
          <SailDetail />
          <HopeExchangeDetail />
        </div>
      </div>
    </div>
  );
}
