"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useAuth } from "@/providers/AuthProvider";
import PointModal from "./randomBoxModal";
import { getRandomBoxStatus } from "@/lib/api/pointApi";

export default function RandomPointModalGate() {
  const { user, isLoading } = useAuth();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isLoading || !user) return;

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
          setIsOpen(true);
        }
      } catch {
        // 랜덤포인트 체크 실패는 앱 사용을 막지 않음
      }
    };

    checkRandomBox();

    const timer = setInterval(checkRandomBox, 60 * 1000);

    return () => clearInterval(timer);
  }, [isLoading, user, searchParams]);

  if (!user) return null;

  return <PointModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
