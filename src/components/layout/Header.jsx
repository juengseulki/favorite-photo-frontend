"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";
import { useAuth } from "@/providers/AuthProvider";
import GuestMenu from "./header/GuestMenu";
import UserMenu from "./header/UserMenu";
import MobileMenu from "./header/MobileMenu";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showMobileHeaderPages = [ROUTES.HOME, ROUTES.MARKET];
  const shouldShowMobileHeader = showMobileHeaderPages.includes(pathname);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    router.push(ROUTES.LOGIN);
  };

  const { data } = useNotifications();
  const notifications = Array.isArray(data) ? data : [];
  const hasUnread = notifications.some((notification) => notification.isRead === false);

  return (
    <header className="relative h-0 bg-black tablet:h-[80px]">
      <div className="hidden h-full items-center justify-between px-[60px] tablet:flex desktop:px-[220px]">
        <Link href={ROUTES.HOME}>
          <Image src="/img/logos/logo.png" alt="최애의 포토" width={138} height={28} priority />
        </Link>

        {user ? <UserMenu user={user} onLogout={handleLogout} /> : <GuestMenu />}
      </div>

      <div className="flex h-full items-center justify-between px-5 tablet:hidden">
        <button
          type="button"
          aria-label="메뉴"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-6 w-6 items-center justify-center"
        >
          <Image src="/img/icons/menu.png" alt="" width={20} height={20} />
        </button>

        <Link href={ROUTES.HOME}>
          <Image src="/img/logos/logo.png" alt="최애의 포토" width={92} height={18} priority />
        </Link>

        {user ? (
          <Link
            href={ROUTES.Notification}
            className="flex h-6 w-6 items-center justify-center relative"
          >
            <Image src="/img/icons/alarm_default.png" alt="" width={22} height={22} />
            {hasUnread && (
              <span className="absolute right-0 top-0 h-[8px] w-[8px] rounded-full bg-red" />
            )}
          </Link>
        ) : (
          <Link href={ROUTES.LOGIN} prefetch={false} className="text-[12px] text-gray-200">
            로그인
          </Link>
        )}
      </div>
      {shouldShowMobileHeader && (
        <div className="flex h-[60px] items-center justify-between px-5 tablet:hidden">
          <button
            type="button"
            aria-label="메뉴"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-6 w-6 items-center justify-center"
          >
            <Image src="/img/icons/menu.png" alt="" width={20} height={20} />
          </button>

          <Link href={ROUTES.HOME}>
            <Image src="/img/logos/logo.png" alt="최애의 포토" width={92} height={18} priority />
          </Link>

          {user ? (
            <button
              type="button"
              aria-label="알림"
              className="flex h-6 w-6 items-center justify-center"
            >
              <Image src="/img/icons/alarm_default.png" alt="" width={22} height={22} />
            </button>
          ) : (
            <Link href={ROUTES.LOGIN} prefetch={false} className="text-[12px] text-gray-200">
              로그인
            </Link>
          )}
        </div>
      )}

      {shouldShowMobileHeader && (
        <MobileMenu
          user={user}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onLogout={handleLogout}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </header>
  );
}
