"use client";

import Button from "@/components/common/Button";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

const SailDetail = () => {
  const { saleId } = useParams();

  //클라이언트 내에서만 관리되는 상태이므로, useState를 사용함.
  const [userQuantity, setUserQuantity] = useState(0);

  const getSale = async () => {
    //TODO: 백엔드에서 sale 가져오기
  };

  const {
    data: sale,
    isPending: isSalePending,
    error: isSaleError,
  } = useQuery({
    queryKey: ["sale"],
    queryFn: getSale,
  });

  const getAvailableCardQuantity = async () => {
    //TODO: 백엔드에서 Sale의 구매 가능한 카드 개수 가져오기
  };

  const {
    data: availableQuantity,
    isPending: isQuantityPending,
    error: isQuantityError,
  } = useQuery({ queryKey: ["availableQuantity"], queryFn: getAvailableCardQuantity });

  const handlePurchase = () => {};

  const handleQuantityDecrease = () => {
    if (userQuantity === 0) return;
    setUserQuantity((prev) => prev - 1);
  };
  const handleQuantityIncrease = () => {
    if (userQuantity === availableQuantity) return;
    setUserQuantity((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col ">
      <h2 className="pb-[20px] border-solid border-b-2 border-gray-100 text-[40px] font-bold">
        판매 이름
      </h2>
      <div className="flex gap-[80px]">
        <div className="relative w-[960px] h-[720px] ">
          <Image src="/img/images/img1.png" alt="빼기 아이콘" fill />
        </div>
        <div className="flex flex-col gap-[80px] max-w-[440px] min-w-[400px]">
          <div className="flex flex-col gap-[30px] ">
            <div className="flex justify-between">
              <div className="flex gap-[15px]">
                <div className="text-pink text-[24px] font-bold">희귀도</div>
                <div className="w-[1px] h-[29px] bg-gray-400" />
                <div className="text-gray-300 text-[24px] font-bold">장르</div>
              </div>
              <div className="text-[24px] font-bold text-white border-b">판매자 이름</div>
            </div>
            <div className="h-[1px] bg-gray-400" />
            <div className="text-[18px] text-white font-normal">카드 설명</div>
            <div className="h-[1px] bg-gray-400" />
            <div className="flex flex-col gap-[10px]">
              <div className="flex justify-between">
                <div className="text-[20px] text-gray-300 font-normal">가격</div>
                <div className="text-[24px] text-white font-bold">4P</div>
              </div>
              <div className="flex justify-between">
                <div className="text-[20px] text-gray-300 font-normal">잔여</div>
                <div className="flex gap-[5px]">
                  <div className="text-[24px] text-white font-bold">2</div>
                  <div className="text-[24px] text-gray-300 font-normal">/</div>
                  <div className="text-[24px] text-gray-300 font-normal">5</div>
                </div>
              </div>
            </div>
            <div className="h-[1px] bg-gray-400" />
            <div className="flex flex-col gap-[20px]">
              <div className="flex justify-between">
                <div className="text-[20px] text-white font-normal">구매 수량</div>
                <div className="flex justify-between w-[132px] border-[1px] items-center rounded-[2px] border-gray-200 px-[12px] pt-[10px] pb-[16px]">
                  <div
                    onClick={handleQuantityDecrease}
                    className="relative w-[24px] h-[24px] cursor-pointer"
                  >
                    <Image src="/img/icons/minus.png" alt="빼기 아이콘" fill />
                  </div>
                  <div>{userQuantity}</div>
                  <div
                    onClick={handleQuantityIncrease}
                    className="relative w-[24px] h-[24px] cursor-pointer"
                  >
                    <Image src="/img/icons/plus.png" alt="더하기 아이콘" fill />
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-[20px] text-white font-normal">총 가격</div>
                <div className="flex gap-[10px] items-center">
                  <div className="text-[24px] text-white font-bold">8P</div>
                  <div className="text-[20px] text-gray-300 font-normal">(2장)</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Button className="min-w-full" onClick={handlePurchase}>
              포토카드 구매하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SailDetail;
