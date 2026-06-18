"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";
import { loginUser } from "@/lib/api/authApi";
import { useAuth } from "@/providers/AuthProvider";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import SocialButtons from "./SocialButtons";
import { ERROR_MESSAGES } from "@/lib/constants/errorMessages";

function OAuthErrorAlert({ onError }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("error") === "oauth_failed") {
      onError(ERROR_MESSAGES.OAUTH_FAILED);
    }
  }, [searchParams, onError]);

  return null;
}

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { user, isLoading: authLoading, login } = useAuth();

  const redirectUrl = searchParams.get("redirect") ?? ROUTES.HOME;

  const signupHref =
    redirectUrl !== ROUTES.HOME
      ? `${ROUTES.SIGNUP}?redirect=${encodeURIComponent(redirectUrl)}`
      : ROUTES.SIGNUP;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      router.replace(ROUTES.HOME);
    }
  }, [authLoading, user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const res = await loginUser({ email, password });

      login(res.data.data);

      router.replace(redirectUrl);
    } catch (err) {
      setError(err.response?.data?.error?.message || ERROR_MESSAGES.LOGIN_FAILED_GENERIC);
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-[520px] flex-col gap-[34px] px-4 tablet:px-0"
    >
      <OAuthErrorAlert onError={setError} />

      <Input
        size="lg"
        inputClassName="!w-full"
        label="이메일"
        type="email"
        placeholder="이메일을 입력해 주세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        size="lg"
        inputClassName="!w-full"
        label="비밀번호"
        type={showPassword ? "text" : "password"}
        placeholder="비밀번호를 입력해 주세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={
          <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
            <Image
              src={showPassword ? "/img/icons/visible.png" : "/img/icons/invisible.png"}
              alt=""
              width={24}
              height={24}
            />
          </button>
        }
        required
      />

      {error && <p className="-mt-[24px] text-[13px] text-[#FF483D]">{error}</p>}

      <Button variant="primary" type="submit" disabled={isLoading} className="!h-[60px] !w-full">
        {isLoading ? "로그인 중..." : "로그인"}
      </Button>

      <SocialButtons />

      <p className="text-center text-[14px] text-white tablet:text-[16px]">
        최애의 포토가 처음이신가요?{" "}
        <Link href={signupHref} prefetch={false} className="!text-main underline">
          회원가입하기
        </Link>
      </p>
    </form>
  );
}

export default function LoginForm() {
  return (
    <Suspense fallback={null}>
      <LoginFormContent />
    </Suspense>
  );
}
