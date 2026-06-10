"use client";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import saleApi from "@/lib/api/saleApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const SailDetail = () => {
  const router = useRouter();

  const { saleId } = useParams();

  //클라이언트 내에서만 관리되는 상태이므로, useState를 사용함.
  const [userQuantity, setUserQuantity] = useState(1); //1장이상 구매할 것이므로, 첫 숫자를 1로 해줌.
  const [purchaseModal, setPurchaseModal] = useState(false);

  //---필요한 정보를 가져오기---
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
  //총 카드 개수
  const {
    data: totalQuantity,
    isPending: isTotalQuantityPending,
    error: isTotalQuantityError,
  } = useQuery({
    queryKey: ["totalQuantity", saleId],
    queryFn: async () => await saleApi.getSaleCountActive({ saleId }),
    enabled: !!saleId,
  });
  //남은 카드 개수
  const {
    data: remainedQuantity,
    isPending: isRemainedQuantityPending,
    error: isRemainedQuantityError,
  } = useQuery({
    queryKey: ["remainedQuantity", saleId],
    queryFn: async () => await saleApi.getSaleCountActive({ saleId }),
    enabled: !!saleId,
  });
  //포토카드 정보
  const {
    data: photocard,
    isPending: isPhotocardPending,
    error: isPhotocardError,
  } = useQuery({
    queryKey: ["photocard", saleId],
    queryFn: async () => await saleApi.getPhotocardBySaleId({ saleId }),
    enabled: !!saleId,
  });
  //purchase mutate
  const { mutate: purchaseMutate, isPending: isPurchasePending } = useMutation({
    mutationFn: async () => await saleApi.createPurchase({ saleId, quantity: userQuantity }),
    onSuccess: () => {
      //TODO: 성공 시 메세지 띄우기
      queryClient.invalidateQueries({ queryKey: ["remainedQuantity", saleId] });
      setUserQuantity(1);
      router.push(`/market`); //메인 페이지로 이동
    },
    onError: () => {
      //TODO: 에러 발생 시 메세지 띄우기
    },
  });

  //---핸들링 함수---
  const enterPurchaseModal = () => {
    setPurchaseModal(true);
  };
  const handleQuantityDecrease = () => {
    if (userQuantity === 1) return;
    setUserQuantity((prev) => prev - 1);
  };
  const handleQuantityIncrease = () => {
    if (userQuantity >= remainedQuantity) {
      setUserQuantity(remainedQuantity); //혹시라도 오류로 remainedQuantity보다 더 높은 숫자가 입력되었을 시에 대한 방지.
      return;
    }
    setUserQuantity((prev) => prev + 1);
  };
  const queryClient = useQueryClient();
  const handlePurchase = () => {
    purchaseMutate();
  };

  //로딩 화면
  if (isSalePending || isTotalQuantityPending || isRemainedQuantityPending || isPhotocardPending) {
    return <div>로딩 중...</div>;
  }

  //에러 화면
  if (
    isSaleError ||
    isPhotocardError ||
    isRemainedQuantityError ||
    isTotalQuantityError ||
    !sale ||
    !photocard ||
    remainedQuantity === undefined ||
    !totalQuantity
  ) {
    return <div>데이터를 불러오던 중 오류가 발생했습니다. </div>;
  }

  return (
    <>
      <Modal
        isOpen={purchaseModal}
        title="포토카드 구매"
        actions={
          <Button size="sm" onClick={handlePurchase}>
            {isPurchasePending ? "구매 중.." : "구매하기"}
          </Button>
        }
        onClose={() => setPurchaseModal(false)}
      >
        <p className="text-center text-[14px] text-[#DDDDDD]">
          {`${photocard.grade} | ${photocard.name}`}
          <br />
          {userQuantity}장을 구매하시겠습니까?
        </p>
      </Modal>
      <div className="flex flex-col gap-[70px] ">
        <h2 className="pb-[20px] border-solid border-b-2 border-gray-100 text-[40px] font-bold">
          {photocard.name}
        </h2>
        <div className="flex gap-[80px]">
          <div className="relative w-[960px] h-[720px] ">
            <Image src="/img/images/img1.png" alt="빼기 아이콘" fill />
          </div>
          <div className="flex flex-col gap-[80px] max-w-[440px] min-w-[400px]">
            <div className="flex flex-col gap-[30px] ">
              <div className="flex justify-between">
                <div className="flex gap-[15px]">
                  <div className="text-pink text-[24px] font-bold">{photocard.grade}</div>
                  <div className="w-[2px] h-[29px] bg-gray-400" />
                  <div className="text-gray-300 text-[24px] font-bold">{photocard.genre}</div>
                </div>
                <div className="text-[24px] font-bold text-white border-b">판매자 이름</div>
              </div>
              <div className="h-[1px] bg-gray-400" />
              <div className="text-[18px] text-white font-normal">{photocard.description}</div>
              <div className="h-[1px] bg-gray-400" />
              <div className="flex flex-col gap-[10px]">
                <div className="flex justify-between">
                  <div className="text-[20px] text-gray-300 font-normal">가격</div>
                  <div className="text-[24px] text-white font-bold">{sale.price}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-[20px] text-gray-300 font-normal">잔여</div>
                  <div className="flex gap-[5px]">
                    <div className="text-[24px] text-white font-bold">{remainedQuantity}</div>
                    <div className="text-[24px] text-gray-300 font-normal">/</div>
                    <div className="text-[24px] text-gray-300 font-normal">{totalQuantity}</div>
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
                    <div className="text-[24px] text-white font-bold">
                      {sale.price * userQuantity}
                    </div>
                    <div className="text-[20px] text-gray-300 font-normal">({userQuantity}장)</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Button className="min-w-full cursor-pointer" onClick={enterPurchaseModal}>
                포토카드 구매하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SailDetail;
