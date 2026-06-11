import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getRandomBoxStatus, openRandomBox } from "@/lib/api/pointApi";
import { useAuth } from "@/providers/AuthProvider";

export const BOXES = [
  { id: 1, src: "/img/random_box/box1_lf.png" },
  { id: 2, src: "/img/random_box/box2_ct.png" },
  { id: 3, src: "/img/random_box/box3_rg.png" },
];

export function useRandomBox(isOpen) {
  const { updatePoint } = useAuth();

  const [selectedBox, setSelectedBox] = useState(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [resultPoint, setResultPoint] = useState(null);

  const { data: randomBoxStatus } = useQuery({
    queryKey: ["randomBoxStatus"],
    queryFn: async () => {
      const data = await getRandomBoxStatus();

      setRemainingSeconds(data.remainingSeconds);

      return data;
    },
    enabled: isOpen,
  });

  const { mutate: openBox } = useMutation({
    mutationFn: openRandomBox,
    onSuccess: async (data) => {
      const status = await getRandomBoxStatus();

      setRemainingSeconds(status.remainingSeconds);
      setResultPoint(data.amount);
      updatePoint(data.balance);
    },
  });

  useEffect(() => {
    if (!isOpen) return;
    if (remainingSeconds <= 0) return;

    const timer = setTimeout(() => {
      setRemainingSeconds((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isOpen, remainingSeconds]);

  // 00시 00분 형식
  const formatRemainingTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const restSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}분 ${String(restSeconds).padStart(2, "0")}초`;
  };

  const remainingTimeText = formatRemainingTime(remainingSeconds);

  const handleSelectBox = (boxId) => {
    setSelectedBox(boxId);
  };

  const handleOpenBox = () => {
    openBox(selectedBox);
  };

  const isResult = resultPoint !== null;

  const resetRandomBox = () => {
    setResultPoint(null);
    setSelectedBox(null);
  };

  return {
    BOXES,
    selectedBox,
    setSelectedBox,
    handleSelectBox,
    handleOpenBox,
    randomBoxStatus,
    remainingTimeText,
    resultPoint,
    isResult,
    resetRandomBox,
  };
}
