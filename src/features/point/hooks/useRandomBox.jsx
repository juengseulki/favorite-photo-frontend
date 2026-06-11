import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getRandomBoxStatus, openRandomBox } from "@/lib/api/pointApi";

export const BOXES = [
  { id: 1, src: "/img/random_box/box1_lf.png" },
  { id: 2, src: "/img/random_box/box2_ct.png" },
  { id: 3, src: "/img/random_box/box3_rg.png" },
];

export function useRandomBox(isOpen) {
  const [selectedBox, setSelectedBox] = useState(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  const { data: randomBoxStatus, isLoading } = useQuery({
    queryKey: ["randomBoxStatus"],
    queryFn: getRandomBoxStatus,
    enabled: isOpen,
  });

  const { mutate: openBox } = useMutation({
    mutationFn: openRandomBox,
  });

  useEffect(() => {
    if (!isOpen || !randomBoxStatus) return;

    const timer = setTimeout(() => {
      setRemainingSeconds(randomBoxStatus.remainingSeconds ?? 0);
    }, 0);

    return () => clearTimeout(timer);
  }, [isOpen, randomBoxStatus?.remainingSeconds]);

  useEffect(() => {
    if (!isOpen) return;
    if (remainingSeconds <= 0) return;

    const timer = setInterval(() => {
      setRemainingSeconds((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
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

  return {
    BOXES,
    selectedBox,
    setSelectedBox,
    handleSelectBox,
    handleOpenBox,
    randomBoxStatus,
    isLoading,
    remainingTimeText,
  };
}
