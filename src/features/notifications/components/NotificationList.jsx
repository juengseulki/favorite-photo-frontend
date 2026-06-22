"use client";

import { useRouter } from "next/navigation";

import {
  useNotifications,
  useReadAllNotifications,
  useReadNotification,
} from "../hooks/useNotifications";

export default function NotificationList({ onClickItem, showHeader = true, limit }) {
  const router = useRouter();

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
    <div>
      {showHeader && (
        <div className="mb-4 flex justify-between">
          <span className="text-white">안 읽은 알림 {unreadCount}개</span>

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
                py-5
                hover:bg-gray-500/40
                ${item.isRead ? "opacity-50" : ""}
              `}
            >
              <p className="text-white">{item.content}</p>

              <p className="mt-2 text-[12px] text-gray-300">{getTimeAgo(item.createdAt)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
