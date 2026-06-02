"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";
import { loginUser } from "@/lib/api/authApi";
import { useAuth } from "@/providers/AuthProvider";
import PrimaryButton from "@/components/common/PrimaryButton";
import AuthInput from "./AuthInput";

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
    <form onSubmit={handleSubmit} className="flex w-[440px] flex-col gap-4">
      <AuthInput
        type="email"
        placeholder="이메일을 입력해 주세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <AuthInput
        type="password"
        placeholder="비밀번호를 입력해 주세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className="text-[14px] text-[#FF483D]">{error}</p>}

      <PrimaryButton type="submit" disabled={isLoading} className="mt-2">
        {isLoading ? "로그인 중..." : "로그인"}
      </PrimaryButton>

      <p className="text-center text-[14px] text-[#A4A4A4]">
        최애의 포토가 처음이신가요?{" "}
        <Link href={ROUTES.SIGNUP} className="font-bold text-[#DDDDDD] underline">
          회원가입하기
        </Link>
      </p>
    </form>
  );
}
