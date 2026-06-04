"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";
import { loginUser } from "@/lib/api/authApi";
import { useAuth } from "@/providers/AuthProvider";
import PrimaryButton from "@/components/common/PrimaryButton";
import AuthInput from "./AuthInput";
import SocialButtons from "./SocialButtons";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await loginUser({ email, password });
      login(res.data.data);
      router.push(ROUTES.HOME);
    } catch (err) {
      setError(err.response?.data?.error?.message || "로그인에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-[520px] flex-col gap-[34px]">
      <AuthInput
        label="이메일"
        type="email"
        placeholder="이메일을 입력해 주세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <AuthInput
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해 주세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className="-mt-[24px] text-[13px] text-[#FF483D]">{error}</p>}

      <PrimaryButton type="submit" disabled={isLoading} className="!w-full">
        {isLoading ? "로그인 중..." : "로그인"}
      </PrimaryButton>

      <SocialButtons />

      <p className="text-center text-[16px] text-white">
        최애의 포토가 처음이신가요?{" "}
        <Link href={ROUTES.SIGNUP} className="text-[#EFFF04] underline">
          회원가입하기
        </Link>
      </p>
    </form>
  );
}
