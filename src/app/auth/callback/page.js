"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { setAccessToken } from "@/lib/api/axiosInstance";
import { getMe } from "@/lib/api/authApi";
import { ROUTES } from "@/lib/constants/routes";

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const error = searchParams.get("error");
    const token = searchParams.get("token");

    if (error || !token) {
      router.replace(`${ROUTES.LOGIN}?error=oauth_failed`);
      return;
    }

    const finalize = async () => {
      setAccessToken(token);
      const meRes = await getMe();
      login({ user: meRes.data.data.user, accessToken: token });
      router.replace(ROUTES.MARKET);
    };

    finalize().catch(() => router.replace(`${ROUTES.LOGIN}?error=oauth_failed`));
  }, []);

  return <p className="text-[16px] text-[#A4A4A4]">로그인 처리 중...</p>;
}

export default function AuthCallbackPage() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
      <Suspense fallback={<p className="text-[16px] text-[#A4A4A4]">로그인 처리 중...</p>}>
        <CallbackHandler />
      </Suspense>
    </div>
  );
}
