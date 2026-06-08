"use client";

import Image from "next/image";
import { useState } from "react";
import NotificationDropdown from "./NotificationDropdown";

export default function NotificationButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button type="button" aria-label="알림" onClick={() => setIsOpen((prev) => !prev)}>
        <Image src="/img/icons/alarm_default.png" alt="알림" width={24} height={24} />
      </button>

      {isOpen && <NotificationDropdown />}
    </div>
  );
}
