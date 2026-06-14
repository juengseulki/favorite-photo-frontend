"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useMySales } from "@/features/sales/hooks/useMySales";
import GradeBadge from "@/components/common/Grade/GradeBadge";
import { getGenreLabel, getSaleStatusLabel } from "@/lib/constants/cardOptions";
import { ROUTES } from "@/lib/constants/routes";

const STATUS_TABS = [
  { label: "전체", value: "" },
  { label: "판매 중", value: "ON_SALE" },
  { label: "판매 완료", value: "SOLD_OUT" },
];

const STATUS_BADGE_CLASSES = {
  ON_SALE: "bg-main text-black",
  SOLD_OUT: "bg-gray-400 text-gray-200",
  CANCELED: "bg-gray-450 text-gray-300",
};

export default function MyShopPage() {
  const [activeStatus, setActiveStatus] = useState("");

  const { data, isPending, isError } = useMySales(activeStatus ? { status: activeStatus } : {});

  const sales = data?.sales ?? [];

  return (
    <main
      className="
        mx-auto w-full
        px-[20px] py-[40px]
        tablet:px-[40px] tablet:py-[60px]
        desktop:max-w-[1200px] desktop:px-[60px]
      "
    >
      <h1 className="text-[24px] font-bold text-white tablet:text-[30px]">나의 판매 포토카드</h1>

      {/* 상태 필터 */}
      <div className="mt-[24px] flex gap-[8px]">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveStatus(tab.value)}
            className={`
              h-[38px] rounded-[2px] px-[16px]
              text-[14px] font-bold transition
              ${
                activeStatus === tab.value
                  ? "bg-main text-black"
                  : "border border-gray-400 bg-transparent text-gray-300 hover:border-gray-200 hover:text-white"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 로딩 */}
      {isPending && (
        <div className="mt-[60px] flex justify-center text-[14px] text-gray-300">
          불러오는 중...
        </div>
      )}

      {/* 에러 */}
      {isError && (
        <div className="mt-[60px] flex justify-center text-[14px] text-red">
          판매 목록을 불러오는 데 실패했습니다.
        </div>
      )}

      {/* 빈 목록 */}
      {!isPending && !isError && sales.length === 0 && (
        <div className="mt-[60px] flex flex-col items-center gap-[12px] text-center">
          <p className="text-[16px] text-gray-300">등록된 판매 카드가 없습니다.</p>

          <Link
            href={ROUTES.MY_GALLERY}
            className="text-[14px] text-main underline hover:brightness-110"
          >
            마이갤러리에서 카드 판매하기
          </Link>
        </div>
      )}

      {/* 판매 카드 */}
      {!isPending && sales.length > 0 && (
        <ul
          className="
            mt-[32px] grid gap-[16px]
            grid-cols-2
            tablet:grid-cols-3 tablet:gap-[20px]
            desktop:grid-cols-4
          "
        >
          {sales.map((sale) => (
            <li key={sale.saleId}>
              <Link href={ROUTES.MY_SHOP_DETAIL(sale.saleId)}>
                <article
                  className="
                    flex flex-col overflow-hidden
                    border border-gray-400 bg-gray-500
                    transition hover:border-gray-200
                  "
                >
                  {/* 이미지 */}
                  <div className="relative aspect-[4/3] w-full bg-gray-450">
                    <Image
                      src={sale.imageUrl}
                      alt={sale.name}
                      fill
                      className="object-cover"
                      sizes="
                        (max-width: 744px) 50vw,
                        (max-width: 1200px) 33vw,
                        25vw
                      "
                    />

                    {sale.status !== "ON_SALE" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                        <span className="text-[16px] font-bold text-gray-200 tablet:text-[20px]">
                          {getSaleStatusLabel(sale.status)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 내용 */}
                  <div className="flex flex-col gap-[6px] p-[10px] tablet:p-[16px]">
                    <div className="flex items-center gap-[6px]">
                      <GradeBadge grade={sale.grade} size="xs" />

                      <span className="h-[10px] w-[1px] shrink-0 bg-gray-400" />

                      <span className="truncate text-[10px] text-gray-300 tablet:text-[12px]">
                        {getGenreLabel(sale.genre)}
                      </span>
                    </div>

                    <p className="truncate text-[12px] font-bold text-white tablet:text-[16px]">
                      {sale.name}
                    </p>

                    <p className="text-[12px] font-bold text-main tablet:text-[14px]">
                      {sale.price?.toLocaleString()} P
                    </p>

                    <p className="text-[10px] text-gray-300 tablet:text-[12px]">
                      잔여 {sale.remainingQuantity} / {sale.totalQuantity}
                    </p>

                    <span
                      className={`
                        mt-[4px] self-start rounded-[2px]
                        px-[8px] py-[2px]
                        text-[10px] font-bold tablet:text-[12px]
                        ${STATUS_BADGE_CLASSES[sale.status] ?? "bg-gray-400 text-gray-200"}
                      `}
                    >
                      {getSaleStatusLabel(sale.status)}
                    </span>
                  </div>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
