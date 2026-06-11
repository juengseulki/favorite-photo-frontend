import { NextResponse } from "next/server";

const MOCK_SALE_DETAILS = {
  1: {
    saleId: 1,
    cardId: 101,
    name: "아이유 콘서트 포토카드",
    description: "2025 아이유 헤르 콘서트 공식 포토카드입니다. 미개봉 상태입니다.",
    imageUrl: "https://picsum.photos/seed/sale1/400/300",
    grade: "LEGENDARY",
    genre: "CONCERT",
    price: 15000,
    status: "ON_SALE",
    isSoldOut: false,
    remainingQuantity: 3,
    totalQuantity: 5,
    exchangeGrade: "LEGENDARY",
    exchangeGenre: "CONCERT",
    exchangeDescription: "동급 콘서트 포토카드로만 교환 희망합니다.",
    createdAt: "2026-06-01T10:00:00Z",
  },
  2: {
    saleId: 2,
    cardId: 102,
    name: "BTS 팬미팅 한정판",
    description: "BTS 팬미팅 공식 굿즈 포토카드. 슬리브 포함.",
    imageUrl: "https://picsum.photos/seed/sale2/400/300",
    grade: "SUPER_RARE",
    genre: "FAN_MEETING",
    price: 8000,
    status: "ON_SALE",
    isSoldOut: false,
    remainingQuantity: 1,
    totalQuantity: 2,
    exchangeGrade: null,
    exchangeGenre: null,
    exchangeDescription: null,
    createdAt: "2026-06-03T14:30:00Z",
  },
  3: {
    saleId: 3,
    cardId: 103,
    name: "뉴진스 앨범 포토카드",
    description: "뉴진스 OMG 앨범 랜덤 포토카드",
    imageUrl: "https://picsum.photos/seed/sale3/400/300",
    grade: "RARE",
    genre: "ALBUM",
    price: 3000,
    status: "SOLD_OUT",
    isSoldOut: true,
    remainingQuantity: 0,
    totalQuantity: 3,
    exchangeGrade: null,
    exchangeGenre: null,
    exchangeDescription: null,
    createdAt: "2026-05-20T09:00:00Z",
  },
  4: {
    saleId: 4,
    cardId: 104,
    name: "르세라핌 팬싸 포토카드",
    description: "르세라핌 팬사인회 공식 포토카드입니다.",
    imageUrl: "https://picsum.photos/seed/sale4/400/300",
    grade: "COMMON",
    genre: "FAN_SIGN",
    price: 2000,
    status: "CANCELED",
    isSoldOut: false,
    remainingQuantity: 0,
    totalQuantity: 1,
    exchangeGrade: null,
    exchangeGenre: null,
    exchangeDescription: null,
    createdAt: "2026-05-10T11:00:00Z",
  },
};

export async function GET(request, { params }) {
  const { saleId } = await params;
  const sale = MOCK_SALE_DETAILS[Number(saleId)];

  if (!sale) {
    return NextResponse.json(
      { error: { code: "SALE_NOT_FOUND", message: "판매 정보를 찾을 수 없습니다." } },
      { status: 404 },
    );
  }

  return NextResponse.json({ data: sale, message: "success" });
}

export async function DELETE(request, { params }) {
  const { saleId } = await params;
  const sale = MOCK_SALE_DETAILS[Number(saleId)];

  if (!sale) {
    return NextResponse.json(
      { error: { code: "SALE_NOT_FOUND", message: "판매 정보를 찾을 수 없습니다." } },
      { status: 404 },
    );
  }

  if (sale.status !== "ON_SALE") {
    return NextResponse.json(
      { error: { code: "SALE_ALREADY_SOLD_OUT", message: "이미 판매 완료된 상품입니다." } },
      { status: 400 },
    );
  }

  return NextResponse.json({ data: null, message: "success" }, { status: 204 });
}
