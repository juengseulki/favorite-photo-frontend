"use client";

import Button from "@/components/common/Button";

const HopeExchangeDetail = () => {
  const handleExchange = () => {};
  return (
    <div className="flex flex-col gap-[60px] mb-[100px]">
      <div className="pb-[20px] border-solid border-b-2 border-gray-100 flex justify-between">
        <div className="text-[40px] font-bold">교환 희망 정보</div>
        <Button onCick={handleExchange} className="cursor-pointer">
          교환하기
        </Button>
      </div>
      <div className="flex flex-col gap-[20px]">
        <div className="text-white text-[24px] font-bold">푸릇푸릇</div>
        <div className="flex gap-[15px] items-center">
          <div className="text-blue text-[24px] font-bold">등급</div>
          <div className="w-[2px] h-[24px] bg-gray-400" />
          <div className="text-gray-300 text-[24px] font-bold">장르</div>
        </div>
      </div>
    </div>
  );
};

export default HopeExchangeDetail;
