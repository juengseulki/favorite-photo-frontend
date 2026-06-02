"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";
import { useAuth } from "@/providers/AuthProvider";

function GuestMenu() {
  return (
    <div className="flex items-center gap-[30px]">
      <Link href={ROUTES.LOGIN} className="text-[14px] font-medium text-[#DDDDDD]">
        로그인
      </Link>
      <Link href={ROUTES.SIGNUP} className="text-[14px] font-medium text-[#DDDDDD]">
        회원가입
      </Link>
    </div>
  );
}

function UserMenu({ user, onLogout }) {
  return (
    <div className="flex items-center gap-[30px]">
      <button type="button" aria-label="알림" className="flex items-center justify-center">
        <Image src="/img/icons/alarm_default.png" alt="알림" width={24} height={24} />
      </button>

      <span className="text-[18px] font-bold text-[#DDDDDD]">{user.nickname}</span>

      <div className="h-[24px] w-px bg-[#5A5A5A]" />

      <button
        type="button"
        onClick={onLogout}
        className="text-[14px] font-normal text-[#5A5A5A] hover:text-[#DDDDDD] transition"
      >
        로그아웃
      </button>
    </div>
  );
}

export default function Header() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push(ROUTES.LOGIN);
  };

  return (
    <header className="h-[80px] bg-[#0F0F0F]">
      <div className="mx-auto flex h-full max-w-[1920px] items-center justify-between px-[80px]">
        <Link href={ROUTES.HOME}>
          <Image src="/img/logos/logo.png" alt="최애의 포토" width={138} height={28} priority />
        </Link>

        {!isLoading && (user ? <UserMenu user={user} onLogout={handleLogout} /> : <GuestMenu />)}
      </div>
    </header>
  );
}
