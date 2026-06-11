"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useSaleDetail } from "@/features/sales/hooks/useSaleDetail";
import { useCancelSale } from "@/features/sales/hooks/useCancelSale";
import GradeBadge from "@/components/common/Grade/GradeBadge";
import Button from "@/components/common/Button";
import { getGenreLabel, getGradeLabel, getSaleStatusLabel } from "@/lib/constants/cardOptions";

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
        router.push("/my-shop");
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
        <Button variant="secondary" size="sm" onClick={() => router.push("/my-shop")}>
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
      {/* 뒤로가기 */}
      <button
        type="button"
        onClick={() => router.push("/my-shop")}
        className="mb-[24px] flex items-center gap-[8px] text-[14px] text-gray-300 transition hover:text-white"
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
        {/* 좌측: 카드 이미지 */}
        <div className="relative shrink-0 w-full tablet:w-[342px] desktop:w-[440px]">
          <div
            className="
              relative w-full aspect-[4/3]
              border border-gray-400 bg-gray-500
              overflow-hidden
            "
          >
            <Image
              src={sale.imageUrl}
              alt={sale.name}
              fill
              className="object-cover"
              sizes="(max-width: 744px) 100vw, (max-width: 1200px) 342px, 440px"
              priority
            />
            {sale.status !== "ON_SALE" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                <span className="text-[24px] font-bold text-gray-300">
                  {sale.status === "SOLD_OUT" ? "SOLD OUT" : "취소됨"}
                </span>
              </div>
            )}
          </div>

          <div className="mt-[16px] flex justify-center">
            <div className="relative h-[18px] w-[100px]">
              <Image src="/img/logos/logo.png" alt="최애의 포토" fill className="object-contain" />
            </div>
          </div>
        </div>

        {/* 우측: 판매 정보 */}
        <div className="flex flex-1 flex-col">
          {/* 등급 · 장르 · 상태 */}
          <div className="flex flex-wrap items-center gap-[8px]">
            <GradeBadge grade={sale.grade} size="md" />
            <span className="h-[12px] w-[1px] bg-gray-400" />
            <span className="text-[14px] text-gray-300">{getGenreLabel(sale.genre)}</span>
            <span
              className={`
                ml-auto rounded-[2px] px-[10px] py-[3px]
                text-[12px] font-bold
                ${STATUS_BADGE_CLASSES[sale.status] ?? "bg-gray-400 text-gray-200"}
              `}
            >
              {getSaleStatusLabel(sale.status)}
            </span>
          </div>

          {/* 카드명 */}
          <h1 className="mt-[12px] text-[24px] font-bold text-white tablet:text-[30px]">
            {sale.name}
          </h1>

          {/* 설명 */}
          {sale.description && (
            <p className="mt-[12px] text-[14px] leading-[1.6] text-gray-200 tablet:text-[16px]">
              {sale.description}
            </p>
          )}

          {/* 구분선 */}
          <div className="my-[24px] h-[1px] bg-gray-400" />

          {/* 판매 정보 */}
          <dl className="space-y-[14px] text-[14px] tablet:text-[16px]">
            <div className="flex justify-between">
              <dt className="text-gray-300">가격</dt>
              <dd className="font-bold text-main">{sale.price?.toLocaleString()} P</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-300">잔여 수량</dt>
              <dd className="text-white">
                {sale.remainingQuantity} / {sale.totalQuantity}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-300">등록일</dt>
              <dd className="text-white">{new Date(sale.createdAt).toLocaleDateString("ko-KR")}</dd>
            </div>
          </dl>

          {/* 교환 희망 정보 */}
          {hasExchange && (
            <>
              <div className="my-[24px] h-[1px] bg-gray-400" />
              <div>
                <h2 className="mb-[14px] text-[16px] font-bold text-white">교환 희망 정보</h2>
                <dl className="space-y-[14px] text-[14px] tablet:text-[16px]">
                  {sale.exchangeGrade && (
                    <div className="flex justify-between">
                      <dt className="text-gray-300">희망 등급</dt>
                      <dd className="text-white">{getGradeLabel(sale.exchangeGrade)}</dd>
                    </div>
                  )}
                  {sale.exchangeGenre && (
                    <div className="flex justify-between">
                      <dt className="text-gray-300">희망 장르</dt>
                      <dd className="text-white">{getGenreLabel(sale.exchangeGenre)}</dd>
                    </div>
                  )}
                  {sale.exchangeDescription && (
                    <div className="flex flex-col gap-[6px]">
                      <dt className="text-gray-300">교환 설명</dt>
                      <dd className="text-[14px] leading-[1.6] text-white">
                        {sale.exchangeDescription}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </>
          )}

          {/* 구분선 */}
          <div className="my-[24px] h-[1px] bg-gray-400" />

          {/* 판매 취소 영역 */}
          {sale.status === "ON_SALE" && (
            <div className="flex flex-col gap-[12px]">
              {!showConfirm ? (
                <Button variant="secondary" size="full" onClick={() => setShowConfirm(true)}>
                  판매 취소
                </Button>
              ) : (
                <div className="flex flex-col gap-[10px]">
                  <p className="text-[14px] text-gray-200">
                    판매를 취소하면 카드가 마이갤러리로 돌아옵니다. 정말 취소하시겠습니까?
                  </p>
                  <div className="flex gap-[10px]">
                    <Button
                      variant="secondary"
                      size="full"
                      onClick={() => setShowConfirm(false)}
                      disabled={isCanceling}
                      className="flex-1"
                    >
                      돌아가기
                    </Button>
                    <Button
                      variant="primary"
                      size="full"
                      onClick={handleCancelConfirm}
                      disabled={isCanceling}
                      className="flex-1 !bg-red hover:!brightness-90"
                    >
                      {isCanceling ? "취소 중..." : "판매 취소 확인"}
                    </Button>
                  </div>
                </div>
              )}

              {cancelError && <p className="text-[13px] text-red">{cancelError}</p>}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
