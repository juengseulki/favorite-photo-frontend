"use client";

import { useRouter } from "next/navigation";
import { useNotifications, useReadNotification } from "../hooks/useNotifications";

export default function NotificationDropdown({ setIsOpen }) {
  const router = useRouter();

  const { data } = useNotifications();
  const notifications = Array.isArray(data) ? data : [];

  const { mutate } = useReadNotification();

  const handleClick = (notification) => {
    mutate(notification.id);

    setIsOpen(false);

    if (notification.linkUrl) {
      router.push(notification.linkUrl);
    }
  };

  const getTimeAgo = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);

    const diff = Math.floor((now - created) / 1000);

    if (diff < 60) {
      return `${diff}초 전`;
    }

    const minutes = Math.floor(diff / 60);
    if (minutes < 60) {
      return `${minutes}분 전`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours}시간 전`;
    }

    const days = Math.floor(hours / 24);
    if (days < 30) {
      return `${days}일 전`;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
      return `${months}개월 전`;
    }

    const years = Math.floor(months / 12);
    return `${years}년 전`;
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
        bg-gray-500
        p-[20px]

        scroll-hidden
      "
    >
      {notifications.length === 0 ? (
        <p className="text-[14px] text-gray-300">알림이 없습니다.</p>
      ) : (
        <ul className="flex flex-col gap-[12px]">
          {notifications.map((item) => (
            <li
              key={item.id}
              onClick={() => handleClick(item)}
              className={`w-full text-left flex flex-col gap-[10px] ${item.isRead ? "opacity-50" : "opacity-100"} border-b border-[#3E3E3E] py-5`}
            >
              <p className="text-[14px] text-white"> {item.content}</p>
              <p className="text-[12px] text-gray-300">{getTimeAgo(item.createdAt)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
