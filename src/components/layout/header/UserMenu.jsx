"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ROUTES } from "@/lib/constants/routes";
import NotificationButton from "@/features/notifications/components/NotificationButton";

export default function UserMenu({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative flex items-center gap-[30px]">
      <span className="text-[14px] font-bold text-gray-200">
        {(user.point ?? 0).toLocaleString()} P
      </span>

      <NotificationButton />

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          font-brand
          text-[18px]
          text-gray-200
          transition
          hover:text-main
        "
      >
        {user.nickname}
      </button>

      <span className="text-[14px] text-gray-400">|</span>

      <button
        type="button"
        onClick={onLogout}
        className="text-[14px] text-gray-400 transition hover:text-gray-200"
      >
        로그아웃
      </button>

      {isOpen && (
        <div className="absolute right-[40px] top-[40px] z-50 w-[260px] bg-gray-500 px-[24px] py-[22px]">
          <p className="font-brand text-[16px] text-white">안녕하세요, {user.nickname}님!</p>

          <div className="mt-[16px] flex justify-between">
            <span className="text-[12px] text-gray-300">보유 포인트</span>

            <span className="text-[12px] font-bold text-main">
              {(user.point ?? 0).toLocaleString()} P
            </span>
          </div>

          <div className="my-[18px] h-[1px] bg-gray-400" />

          <nav className="flex flex-col gap-[12px] text-[14px] font-bold text-white">
            <Link href={ROUTES.MARKET} onClick={() => setIsOpen(false)}>
              마켓플레이스
            </Link>

            <Link href={ROUTES.MY_GALLERY} onClick={() => setIsOpen(false)}>
              마이갤러리
            </Link>

            <Link href={ROUTES.MY_SHOP} onClick={() => setIsOpen(false)}>
              판매 중인 포토카드
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
