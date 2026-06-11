import { NextResponse } from "next/server";

const MOCK_SALES = [
  {
    saleId: 1,
    cardId: 101,
    name: "아이유 콘서트 포토카드",
    imageUrl: "https://picsum.photos/seed/sale1/400/300",
    grade: "LEGENDARY",
    genre: "CONCERT",
    price: 15000,
    status: "ON_SALE",
    remainingQuantity: 3,
    totalQuantity: 5,
    createdAt: "2026-06-01T10:00:00Z",
  },
  {
    saleId: 2,
    cardId: 102,
    name: "BTS 팬미팅 한정판",
    imageUrl: "https://picsum.photos/seed/sale2/400/300",
    grade: "SUPER_RARE",
    genre: "FAN_MEETING",
    price: 8000,
    status: "ON_SALE",
    remainingQuantity: 1,
    totalQuantity: 2,
    createdAt: "2026-06-03T14:30:00Z",
  },
  {
    saleId: 3,
    cardId: 103,
    name: "뉴진스 앨범 포토카드",
    imageUrl: "https://picsum.photos/seed/sale3/400/300",
    grade: "RARE",
    genre: "ALBUM",
    price: 3000,
    status: "SOLD_OUT",
    remainingQuantity: 0,
    totalQuantity: 3,
    createdAt: "2026-05-20T09:00:00Z",
  },
  {
    saleId: 4,
    cardId: 104,
    name: "르세라핌 팬싸 포토카드",
    imageUrl: "https://picsum.photos/seed/sale4/400/300",
    grade: "COMMON",
    genre: "FAN_SIGN",
    price: 2000,
    status: "CANCELED",
    remainingQuantity: 0,
    totalQuantity: 1,
    createdAt: "2026-05-10T11:00:00Z",
  },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const filtered = status ? MOCK_SALES.filter((s) => s.status === status) : MOCK_SALES;

  return NextResponse.json({
    data: {
      sales: filtered,
      totalCount: filtered.length,
      page: 1,
      limit: 15,
    },
    message: "success",
  });
}
