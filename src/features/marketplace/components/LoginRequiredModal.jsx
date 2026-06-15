"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";

export default function LoginRequiredModal({ isOpen, onClose, redirectUrl = "/" }) {
  const router = useRouter();

  const handleLoginMove = () => {
    onClose();
    router.push(`${ROUTES.LOGIN}?redirect=${encodeURIComponent(redirectUrl)}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center px-[20px] py-[16px] text-center">
        <p className="text-[18px] font-bold text-white">로그인이 필요합니다.</p>

        <p className="mt-[20px] text-[14px] leading-[22px] text-gray-300">
          로그인 후 이용해주세요!
          <br />
          다양한 서비스를 만나려면 로그인이 필요합니다.
        </p>

        <Button size="xs" className="mt-[30px]" onClick={handleLoginMove}>
          확인
        </Button>
      </div>
    </Modal>
  );
}
