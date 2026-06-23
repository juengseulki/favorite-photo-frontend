"use client";

import Image from "next/image";

export default function ScrollToTop() {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="
        fixed bottom-[100px] right-12.5 z-50
        flex h-14 w-14 flex-col items-center justify-center gap-[3px]
        rounded-full bg-gray-300
        transition-all duration-200
        hover:scale-105 hover:bg-gray-400 hover:shadow-lg
        shadow-md
        cursor-pointer
        text-black hover:bg-gray-400
        active:scale-95
      "
    >
      <Image src="/img/icons/top.png" alt="TOP" width={14} height={8} />
      <span className="text-[11px] font-bold">TOP</span>
    </button>
  );
}
