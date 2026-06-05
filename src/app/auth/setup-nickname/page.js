"use client";

import { Suspense } from "react";
import Image from "next/image";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { completeGoogleSignup } from "@/lib/api/authApi";
import { ROUTES } from "@/lib/constants/routes";
import AuthInput from "@/features/auth/components/AuthInput";
import Button from "@/components/common/Button";

function SetupNicknameForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const provider = searchParams.get("provider") ?? "GOOGLE";
  const providerAccountId = searchParams.get("providerAccountId");
  const email = searchParams.get("email");

  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!providerAccountId) {
    router.replace(ROUTES.LOGIN);
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nickname || nickname.length < 2 || nickname.length > 12) {
      setError("닉네임은 2자 이상 12자 이하로 입력해 주세요.");
      return;
    }

    setError("");
    setIsLoading(true);
    try {
      const res = await completeGoogleSignup({ provider, providerAccountId, email, nickname });
      login(res.data.data);
      router.replace(ROUTES.HOME);
    } catch (err) {
      setError(err.response?.data?.error?.message || "오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-[520px] flex-col gap-[34px] px-4 tablet:px-0"
    >
      <div className="flex flex-col gap-2">
        <p className="text-[18px] text-white">서비스에서 사용할 닉네임을 입력해 주세요</p>
        {email && (
          <p className="text-[14px] text-[#A4A4A4]">
            {provider} 계정: {email}
          </p>
        )}
      </div>

      <AuthInput
        label="닉네임"
        type="text"
        placeholder="닉네임을 입력해 주세요"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        error={error}
        required
      />

      <Button variant="primary" type="submit" disabled={isLoading} className="!w-full">
        {isLoading ? "처리 중..." : "시작하기"}
      </Button>
    </form>
  );
}

export default function SetupNicknamePage() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center gap-8 px-4 py-10 tablet:gap-[60px] tablet:px-0">
      <Image
        src="/img/logos/logo.png"
        alt="최애의 포토"
        width={331}
        height={60}
        className="h-auto w-[200px] tablet:w-[331px]"
        priority
      />
      <Suspense fallback={null}>
        <SetupNicknameForm />
      </Suspense>
    </div>
  );
}
