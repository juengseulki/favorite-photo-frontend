"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { useSaleDetail } from "@/features/sales/hooks/useSaleDetail";
import { useCancelSale } from "@/features/sales/hooks/useCancelSale";

import GradeBadge from "@/components/common/Grade/GradeBadge";
import Button from "@/components/common/Button";

import { getGenreLabel, getGradeLabel, getSaleStatusLabel } from "@/lib/constants/cardOptions";

import { ROUTES } from "@/lib/constants/routes";

const STATUS_BADGE_CLASSES = {
  ON_SALE: "bg-main text-black",
  SOLD_OUT: "bg-gray-400 text-gray-200",
  CANCELED: "bg-gray-450 text-gray-300",
};

export default function MySaleDetailPage() {
  const { saleId } = useParams();
  const router = useRouter();

  const { data: sale, isPending, isError } = useSaleDetail(Number(saleId));

  const { mutate: cancel, isPending: isCanceling } = useCancelSale(Number(saleId));

  const [cancelError, setCancelError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCancelConfirm = () => {
    setCancelError("");

    cancel(undefined, {
      onSuccess: () => {
        router.push(ROUTES.MY_SHOP);
      },

      onError: (err) => {
        const message = err?.response?.data?.error?.message ?? "판매 취소에 실패했습니다.";

        setCancelError(message);
        setShowConfirm(false);
      },
    });
  };

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-[14px] text-gray-300">
        불러오는 중...
      </div>
    );
  }

  if (isError || !sale) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-[16px]">
        <p className="text-[14px] text-gray-300">판매 정보를 불러올 수 없습니다.</p>

        <Button variant="secondary" size="sm" onClick={() => router.push(ROUTES.MY_SHOP)}>
          목록으로
        </Button>
      </div>
    );
  }

  const hasExchange = sale.exchangeGrade || sale.exchangeGenre || sale.exchangeDescription;

  return (
    <main
      className="
        mx-auto w-full
        px-[20px] py-[40px]
        tablet:px-[40px] tablet:py-[60px]
        desktop:max-w-[1200px] desktop:px-[60px]
      "
    >
      <button
        type="button"
        onClick={() => router.push(ROUTES.MY_SHOP)}
        className="
          mb-[24px] flex items-center gap-[8px]
          text-[14px] text-gray-300
          transition hover:text-white
        "
      >
        <Image src="/img/icons/back.png" alt="" width={16} height={16} />
        목록으로
      </button>

      <div
        className="
          flex flex-col gap-[32px]
          tablet:flex-row tablet:gap-[48px]
          desktop:gap-[80px]
        "
      >
        {/* 이미지 */}
        <div className="relative w-full shrink-0 tablet:w-[342px] desktop:w-[440px]">
          <div
            className="
              relative aspect-[4/3] w-full
              overflow-hidden
              border border-gray-400 bg-gray-500
            "
          >
            <Image
              src={sale.imageUrl}
              alt={sale.name}
              fill
              priority
              className="object-cover"
              sizes="
                (max-width: 744px) 100vw,
                (max-width: 1200px) 342px,
                440px
              "
            />

            {sale.status !== "ON_SALE" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                <span className="text-[24px] font-bold text-gray-300">
                  {getSaleStatusLabel(sale.status)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 정보 */}
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-[8px]">
            <GradeBadge grade={sale.grade} size="md" />

            <span className="h-[12px] w-[1px] bg-gray-400" />

            <span className="text-[14px] text-gray-300">{getGenreLabel(sale.genre)}</span>

            <span
              className={`
                ml-auto rounded-[2px]
                px-[10px] py-[3px]
                text-[12px] font-bold
                ${STATUS_BADGE_CLASSES[sale.status]}
              `}
            >
              {getSaleStatusLabel(sale.status)}
            </span>
          </div>

          <h1 className="mt-[12px] text-[24px] font-bold text-white tablet:text-[30px]">
            {sale.name}
          </h1>

          {sale.description && (
            <p className="mt-[12px] text-[14px] leading-[1.6] text-gray-200">{sale.description}</p>
          )}

          <div className="my-[24px] h-[1px] bg-gray-400" />

          <dl className="space-y-[14px] text-[14px] tablet:text-[16px]">
            <div className="flex justify-between">
              <dt className="text-gray-300">가격</dt>
              <dd className="font-bold text-main">{sale.price?.toLocaleString()} P</dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-gray-300">잔여 수량</dt>
              <dd>
                {sale.remainingQuantity} / {sale.totalQuantity}
              </dd>
            </div>
          </dl>

          {hasExchange && (
            <>
              <div className="my-[24px] h-[1px] bg-gray-400" />

              <h2 className="text-[16px] font-bold text-white">교환 희망 정보</h2>

              {sale.exchangeGrade && (
                <p className="mt-[12px] text-gray-300">
                  희망 등급 : {getGradeLabel(sale.exchangeGrade)}
                </p>
              )}

              {sale.exchangeGenre && (
                <p className="mt-[8px] text-gray-300">
                  희망 장르 : {getGenreLabel(sale.exchangeGenre)}
                </p>
              )}
            </>
          )}

          <div className="my-[24px] h-[1px] bg-gray-400" />

          {sale.status === "ON_SALE" && (
            <div>
              {!showConfirm ? (
                <Button variant="secondary" size="full" onClick={() => setShowConfirm(true)}>
                  판매 취소
                </Button>
              ) : (
                <div className="flex flex-col gap-[10px]">
                  <p className="text-[14px] text-gray-200">판매를 취소하시겠습니까?</p>

                  <Button size="full" onClick={handleCancelConfirm} disabled={isCanceling}>
                    {isCanceling ? "취소 중..." : "판매 취소 확인"}
                  </Button>
                </div>
              )}

              {cancelError && <p className="mt-[10px] text-[13px] text-red">{cancelError}</p>}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
