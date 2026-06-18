"use client";

import Image from "next/image";
import { useState } from "react";
import NotificationDropdown from "./NotificationDropdown";
import { useNotifications } from "../hooks/useNotifications";
export default function NotificationButton() {
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useNotifications();
  const notifications = Array.isArray(data) ? data : [];
  const hasUnread = notifications.some((notification) => notification.isRead === false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="알림"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative"
      >
        <Image src="/img/icons/alarm_default.png" alt="알림" width={24} height={24} />

        {hasUnread && (
          <span className="absolute right-0 top-0 h-[8px] w-[8px] rounded-full bg-red" />
        )}
      </button>

      {isOpen && <NotificationDropdown setIsOpen={setIsOpen} />}
    </div>
  );
}
