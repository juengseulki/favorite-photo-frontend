"use client";

import { useRouter } from "next/navigation";
import NotificationList from "./NotificationList";
import { ROUTES } from "@/lib/constants/routes";

export default function NotificationDropdown({ setIsOpen }) {
  const router = useRouter();

  const handleViewAll = () => {
    setIsOpen(false);
    router.push(ROUTES.NOTIFICATION);
  };

  return (
    <div
      className="
        absolute
        right-0
        top-[40px]
        z-50

        w-[320px]
        max-h-[535px]
        overflow-y-auto
        overflow-x-hidden

        bg-gray-500
        p-[20px]

        scroll-hidden
      "
    >
      <NotificationList
        variant="dropdown"
        showHeader
        limit={5}
        onClickItem={() => setIsOpen(false)}
      />

      <button
        type="button"
        onClick={handleViewAll}
        className="
          mt-[16px]
          h-[42px]
          w-full
          cursor-pointer
          border
          border-gray-300
          text-[14px]
          font-bold
          text-white
          transition-colors
          hover:border-main
          hover:text-main
        "
      >
        전체보기
      </button>
    </div>
  );
}
