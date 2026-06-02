"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";
import { createUser } from "@/lib/api/authApi";
import { useAuth } from "@/providers/AuthProvider";
import PrimaryButton from "@/components/common/PrimaryButton";
import AuthInput from "./AuthInput";

export default function SignupForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const next = {};
    if (form.password.length < 8) next.password = "비밀번호는 8자 이상 입력해 주세요.";
    if (form.password !== form.passwordConfirm)
      next.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const res = await createUser({
        email: form.email,
        nickname: form.nickname,
        password: form.password,
      });
      login(res.data.data);
      router.push(ROUTES.HOME);
    } catch (err) {
      const code = err.response?.data?.error?.code;
      const message = err.response?.data?.error?.message;

      if (code === "EMAIL_CONFLICT") setErrors({ email: message });
      else if (code === "NICKNAME_CONFLICT") setErrors({ nickname: message });
      else setErrors({ general: message || "회원가입에 실패했습니다." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-[440px] flex-col gap-4">
      <AuthInput
        type="email"
        placeholder="이메일을 입력해 주세요"
        value={form.email}
        onChange={handleChange("email")}
        error={errors.email}
        required
      />

      <AuthInput
        type="text"
        placeholder="닉네임을 입력해 주세요"
        value={form.nickname}
        onChange={handleChange("nickname")}
        error={errors.nickname}
        required
      />

      <AuthInput
        type="password"
        placeholder="8자 이상 입력해 주세요"
        value={form.password}
        onChange={handleChange("password")}
        error={errors.password}
        required
      />

      <AuthInput
        type="password"
        placeholder="비밀번호를 한번 더 입력해 주세요"
        value={form.passwordConfirm}
        onChange={handleChange("passwordConfirm")}
        error={errors.passwordConfirm}
        required
      />

      {errors.general && <p className="text-[14px] text-[#FF483D]">{errors.general}</p>}

      <PrimaryButton type="submit" disabled={isLoading} className="mt-2">
        {isLoading ? "가입 중..." : "가입하기"}
      </PrimaryButton>

      <p className="text-center text-[14px] text-[#A4A4A4]">
        이미 최애의포토 회원이신가요?{" "}
        <Link href={ROUTES.LOGIN} className="font-bold text-[#DDDDDD] underline">
          로그인하기
        </Link>
      </p>
    </form>
  );
}
