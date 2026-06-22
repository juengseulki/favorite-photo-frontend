"use client";

import { useRouter } from "next/navigation";

import {
  useNotifications,
  useReadAllNotifications,
  useReadNotification,
} from "../hooks/useNotifications";

export default function NotificationList({
  variant = "page",
  onClickItem,
  showHeader = true,
  limit,
}) {
  const router = useRouter();

  const isDropdown = variant === "dropdown";

  const { data } = useNotifications();
  const notifications = Array.isArray(data) ? data : [];

  const displayNotifications = limit ? notifications.slice(0, limit) : notifications;

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  const { mutate: readNotification } = useReadNotification();
  const { mutate: readAllNotifications } = useReadAllNotifications();

  const handleClick = (notification) => {
    readNotification(notification.id);

    onClickItem?.();

    if (notification.linkUrl) {
      router.push(notification.linkUrl);
    }
  };

  const getTimeAgo = (createdAt) => {
    const diff = Math.floor((new Date() - new Date(createdAt)) / 1000);

    if (diff < 60) return `${diff}초 전`;

    const min = Math.floor(diff / 60);
    if (min < 60) return `${min}분 전`;

    const hour = Math.floor(min / 60);
    if (hour < 24) return `${hour}시간 전`;

    return `${Math.floor(hour / 24)}일 전`;
  };

  return (
    <div className="w-full">
      {showHeader && (
        <div className="mb-[20px] flex justify-between">
          <span className="text-[16px] text-white">안 읽은 알림 {unreadCount}개</span>

          {unreadCount > 0 && (
            <button onClick={() => readAllNotifications()} className="cursor-pointer text-main">
              모두 읽음
            </button>
          )}
        </div>
      )}

      {displayNotifications.length === 0 ? (
        <p className="text-gray-300">알림이 없습니다.</p>
      ) : (
        <ul>
          {displayNotifications.map((item) => (
            <li
              key={item.id}
              onClick={() => handleClick(item)}
              className={`
                cursor-pointer
                border-b
                border-[#3E3E3E]

                transition-colors
                hover:bg-gray-500/40

                ${isDropdown ? "px-0 py-[14px]" : "px-[5px] py-[22px] tablet:px-[20px]"}

                ${item.isRead ? "opacity-50" : ""}
              `}
            >
              <p
                className={`
                  break-words
                  text-white
                  ${isDropdown ? "text-[14px]" : "text-[16px] tablet:text-[18px]"}
                `}
              >
                {item.content}
              </p>

              <p className="mt-2 text-[12px] text-gray-300">{getTimeAgo(item.createdAt)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
