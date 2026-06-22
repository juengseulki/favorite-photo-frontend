"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useAuth } from "@/providers/AuthProvider";
import PointModal from "./randomBoxModal";
import { getRandomBoxStatus } from "@/lib/api/pointApi";

const MIN_DELAY = 3000;
const MAX_DELAY = 8000;

export default function RandomPointModalGate() {
  const { user, isLoading } = useAuth();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isLoading || !user) return;

    let timerId;

    const openWithSurpriseDelay = () => {
      const delay = Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1)) + MIN_DELAY;

      timerId = window.setTimeout(() => {
        setIsOpen(true);
      }, delay);
    };

    const checkRandomBox = async () => {
      try {
        const forceOpen =
          process.env.NODE_ENV === "development" && searchParams.get("randomPoint") === "open";

        if (forceOpen) {
          setIsOpen(true);
          return;
        }

        const res = await getRandomBoxStatus();
        const canOpen = res?.data?.data?.canOpen ?? res?.data?.canOpen;

        if (canOpen) {
          openWithSurpriseDelay();
        }
      } catch {
        // 랜덤포인트 체크 실패는 앱 사용을 막지 않음
      }
    };

    checkRandomBox();

    return () => {
      if (timerId) window.clearTimeout(timerId);
    };
  }, [isLoading, user, searchParams]);

  return <PointModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
