import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getRandomBoxStatus, openRandomBox } from "@/lib/api/pointApi";

export const boxes = [
  { id: 1, src: "/img/random_box/box1_lf.png" },
  { id: 2, src: "/img/random_box/box2_ct.png" },
  { id: 3, src: "/img/random_box/box3_rg.png" },
];

// 00시 00분
const formatRemainingTime = (seconds = 0) => {
  const minutes = Math.floor(seconds / 60);
  const restSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}분 ${String(restSeconds).padStart(2, "0")}초`;
};

export function useRandomBox(isOpen) {
  const [selectedBox, setSelectedBox] = useState(null);

  const { data: randomBoxStatus, isLoading } = useQuery({
    queryKey: ["randomBoxStatus"],
    queryFn: getRandomBoxStatus,
    enabled: isOpen,
  });

  const { mutate: openBox } = useMutation({
    mutationFn: openRandomBox,
  });

  const remainingTimeText = formatRemainingTime(randomBoxStatus?.remainingSeconds);

  const canOpen = randomBoxStatus?.canOpen ?? false;

  const handleSelectBox = (boxId) => {
    setSelectedBox(boxId);
  };

  const handleOpenBox = () => {
    openBox(selectedBox);
  };

  return {
    boxes,
    selectedBox,
    setSelectedBox,
    handleSelectBox,
    handleOpenBox,
    randomBoxStatus,
    isLoading,
    canOpen,
    remainingTimeText,
  };
}
