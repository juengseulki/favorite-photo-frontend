"use client";

import Image from "next/image";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";
import { useRandomBox } from "@/features/point/hooks/useRandomBox";

export default function PointModal({ isOpen, onClose }) {
  const {
    BOXES,
    selectedBox,
    handleSelectBox,
    remainingTimeText,
    handleOpenBox,
    resultPoint,
    randomBoxStatus,
    isResult,
    resetRandomBox,
  } = useRandomBox(isOpen);

  const handleClose = () => {
    resetRandomBox();
    onClose();
  };

  return (
    <>
      {!isResult ? (
        <Modal size="point" isOpen={isOpen} onClose={handleClose}>
          <div className="flex flex-col gap-[94px]">
            <section className="flex flex-col items-center gap-[40px]">
              <h2 className="flex text-[46px] font-normal font-brand">
                <span>랜덤</span>
                <span className="text-main">포인트</span>
              </h2>

              <p className="flex flex-col items-center text-[20px] font-bold">
                <span>1시간마다 돌아오는 기회!</span>
                <span>랜덤 상자 뽑기를 통해 포인트를 획득하세요!</span>
              </p>

              <p className="flex gap-[10px]">
                <span className="text-gray-300">다음 기회까지 남은 시간</span>
                <span className="text-main">{remainingTimeText}</span>
              </p>
            </section>

            <section className="flex justify-center text-[46px] font-normal">
              <div className="flex gap-[60px]">
                {BOXES.map((box) => (
                  <Image
                    key={box.id}
                    src={box.src}
                    alt="랜덤박스 이미지"
                    width={246}
                    height={191}
                    onClick={() => handleSelectBox(box.id)}
                    className={`cursor-pointer object-cover ${
                      selectedBox && selectedBox !== box.id ? "opacity-50" : ""
                    }`}
                  />
                ))}
              </div>
            </section>

            <section className="flex justify-center">
              {selectedBox && (
                <Button
                  size="point"
                  disabled={!(randomBoxStatus?.canOpen ?? false)}
                  onClick={handleOpenBox}
                >
                  선택완료
                </Button>
              )}
            </section>
          </div>
        </Modal>
      ) : (
        <Modal size="pointResult" isOpen={isOpen} onClose={handleClose}>
          <div className="flex flex-col items-center gap-[30px]">
            <h2 className="flex text-[46px] font-normal font-brand">
              <span>랜덤</span>
              <span className="text-main">포인트</span>
            </h2>
            <Image src="/img/point/lg.png" alt="포인트 이미지" width={340} height={324} />
            <p className=" text-[32px] font-bold">
              <span className="text-main">{resultPoint}P </span>
              <span>획득!</span>
            </p>
            <p className="flex gap-[10px]">
              <span className="text-gray-300">다음 기회까지 남은 시간</span>
              <span className="text-main">{remainingTimeText}</span>
            </p>
          </div>
        </Modal>
      )}
    </>
  );
}
