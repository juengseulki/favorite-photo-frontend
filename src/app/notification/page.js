"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import NotificationList from "@/features/notifications/components/NotificationList";

export default function NotificationPage() {
  const router = useRouter();

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black px-[15px] pb-[80px] pt-[20px] tablet:px-[60px] tablet:pt-[50px] desktop:px-[220px]">
        <section className="mx-auto max-w-[1040px]">
          <button
            type="button"
            onClick={() => router.back()}
            className="
                mb-[30px]
                flex
                items-center
                gap-[10px]
                cursor-pointer
                text-[16px]
                text-white
              "
          >
            <Image src="/img/icons/back.png" alt="" width={22} height={22} />

            <span className="hidden tablet:block">이전으로</span>
          </button>

          <div className="border-b border-gray-200 pb-[20px]">
            <h1 className="font-brand text-[32px] font-bold text-white tablet:text-[48px] desktop:text-[62px]">
              알림
            </h1>
          </div>

          <div className="mt-[20px]">
            <NotificationList />
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}
