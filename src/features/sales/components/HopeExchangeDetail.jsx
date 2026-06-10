"use client";

import Button from "@/components/common/Button";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const HopeExchangeDetail = () => {
  const saleId = useParams();
  //판매 상세 정보
  const {
    data: sale,
    isPending: isSalePending,
    error: isSaleError,
  } = useQuery({
    queryKey: ["sale", saleId], //각각의 Sale을 식별해주기 위해, saleId를 추가.
    queryFn: async () => await saleApi.getSale({ saleId }),
    enabled: !!saleId, //saleId를 읽어오기 전에 실행되는 것을 방지하기 위함.
  });

  const handleExchange = () => {
    //TODO: 교환하기 모달 띄우는 작업 필요
  };

  if (isSalePending) {
    return <div>로딩 중...</div>;
  }
  if (isSaleError || !sale) {
    return <div>데이터를 불러오던 중 오류가 발생했습니다.</div>;
  }
  return (
    <div className="flex flex-col gap-[60px] mb-[100px]">
      <div className="pb-[20px] border-solid border-b-2 border-gray-100 flex justify-between">
        <div className="text-[40px] font-bold">교환 희망 정보</div>
        <Button onCick={handleExchange} className="cursor-pointer">
          교환하기
        </Button>
      </div>
      <div className="flex flex-col gap-[20px]">
        <div className="text-white text-[24px] font-bold">{sale.exchangeDescription}</div>
        <div className="flex gap-[15px] items-center">
          <div className="text-blue text-[24px] font-bold">{sale.exchangeGrade}</div>
          <div className="w-[2px] h-[24px] bg-gray-400" />
          <div className="text-gray-300 text-[24px] font-bold">{sale.exchangeGenre}</div>
        </div>
      </div>
    </div>
  );
};

export default HopeExchangeDetail;
