import { notFound } from "next/navigation";

import MarketDetail from "@/features/marketplace/detail/components/MarketDetail";

export default async function MarketDetailPage({ params }) {
  const { saleId } = await params;
  const parsedSaleId = Number(saleId);

  if (!Number.isInteger(parsedSaleId) || parsedSaleId <= 0) {
    notFound();
  }

  return <MarketDetail />;
}
