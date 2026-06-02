"use client";

import { useState } from "react";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";

export default function ModalTestPage() {
  const [modalType, setModalType] = useState(null);

  const closeModal = () => setModalType(null);

  return (
    <main className="flex min-h-screen items-center justify-center gap-5 bg-black">
      <Button onClick={() => setModalType("buy")}>구매 모달</Button>

      <Button onClick={() => setModalType("form")}>수정 폼 모달</Button>

      <Button onClick={() => setModalType("point")}>랜덤 포인트 모달</Button>

      {/* 구매 확인 모달 */}
      <Modal
        isOpen={modalType === "buy"}
        title="포토카드 구매"
        onClose={closeModal}
        actions={<Button size="sm">구매하기</Button>}
      >
        <p className="text-center text-[14px] text-[#DDDDDD]">
          [LEGENDARY | 우리집 앞마당]
          <br />
          2장을 구매하시겠습니까?
        </p>
      </Modal>

      {/* 수정하기 폼 모달 */}
      <Modal
        isOpen={modalType === "form"}
        title="수정하기"
        size="form"
        onClose={closeModal}
        actions={
          <>
            <Button variant="secondary" size="lg">
              취소하기
            </Button>

            <Button size="lg">수정하기</Button>
          </>
        }
      >
        <div className="space-y-8">
          <section className="flex gap-10">
            <div className="h-[250px] flex-1 bg-gray-700">이미지 영역</div>

            <div className="flex flex-1 flex-col gap-5">
              <label>
                총 판매 수량
                <input className="mt-2 w-full border bg-transparent p-3" defaultValue="2" />
              </label>

              <label>
                장당 가격
                <input className="mt-2 w-full border bg-transparent p-3" defaultValue="20" />
              </label>
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-[18px] font-bold">교환 희망 정보</h3>

            <div className="grid grid-cols-2 gap-5">
              <input placeholder="등급" className="border bg-transparent p-3" />

              <input placeholder="장르" className="border bg-transparent p-3" />
            </div>

            <textarea
              placeholder="교환 희망 설명"
              className="
                mt-5
                h-[120px]
                w-full
                resize-none
                border
                bg-transparent
                p-3
              "
            />
          </section>
        </div>
      </Modal>

      {/* 랜덤 포인트 모달 */}
      <Modal isOpen={modalType === "point"} title="랜덤포인트" size="point" onClose={closeModal}>
        <div className="flex flex-col items-center gap-6">
          <div
            className="
              flex
              h-[220px]
              w-[220px]
              items-center
              justify-center
              rounded-full
              bg-lime-300
              text-[80px]
              font-bold
              text-black
            "
          >
            P
          </div>

          <strong className="text-[24px]">2P 획득!</strong>

          <p className="text-center text-[14px] text-gray-400">
            다음 기회까지 남은 시간
            <br />
            <span className="text-[#EFFF04]">59분 59초</span>
          </p>
        </div>
      </Modal>
    </main>
  );
}
