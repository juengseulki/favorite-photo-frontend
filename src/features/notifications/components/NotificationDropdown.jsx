"use client";

import { useRouter } from "next/navigation";
import { useNotifications, useReadNotification } from "../hooks/useNotifications";

export default function NotificationDropdown() {
  const router = useRouter();

  const { data } = useNotifications();
  const notifications = Array.isArray(data) ? data : [];

  const { mutate } = useReadNotification();

  const handleClick = (notification) => {
    mutate(notification.id);

    if (notification.linkUrl) {
      router.push(notification.linkUrl);
    }
  };

  return (
    <div
      className="
        absolute
        right-0
        top-[40px]
        z-50

        w-[320px]
        bg-gray-500
        p-[20px]
      "
    >
      {notifications.length === 0 ? (
        <p className="text-[14px] text-gray-300">알림이 없습니다.</p>
      ) : (
        <ul className="flex flex-col gap-[12px]">
          {notifications.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => handleClick(item)}
                className="
                  w-full
                  text-left
                  text-[14px]
                  text-white
                "
              >
                {item.message}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
