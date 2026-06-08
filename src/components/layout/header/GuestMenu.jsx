import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";

export default function GuestMenu() {
  return (
    <div className="flex items-center gap-[30px]">
      <Link href={ROUTES.LOGIN} className="text-[14px] font-medium text-gray-200">
        로그인
      </Link>

      <Link href={ROUTES.SIGNUP} className="text-[14px] font-medium text-gray-200">
        회원가입
      </Link>
    </div>
  );
}
