"use client";

import PointModal from "@/features/point/components/randomBoxModal";
import Image from "next/image";
import { useState } from "react";

export default function RandomPoint() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button
        className="hidden tablet:block fixed bottom-6 right-10 z-50 transition-transform duration-200 hover:scale-105 active:scale-95"
        onClick={() => setIsModalOpen(true)}
      >
        <Image src="/img/point/sm.png" alt="랜덤포인트 버튼" width={80} height={80} />
      </button>
      <PointModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
