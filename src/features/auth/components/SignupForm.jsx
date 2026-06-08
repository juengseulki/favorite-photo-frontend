"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";
import { createUser } from "@/lib/api/authApi";
import { useAuth } from "@/providers/AuthProvider";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import SocialButtons from "./SocialButtons";
import { ERROR_MESSAGES } from "@/lib/constants/errorMessages";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = ERROR_MESSAGES.INVALID_EMAIL;
    if (!form.nickname || form.nickname.length < 2 || form.nickname.length > 12)
      next.nickname = ERROR_MESSAGES.NICKNAME_LENGTH;
    if (form.password.length < 8) next.password = ERROR_MESSAGES.PASSWORD_MIN_LENGTH;
    if (form.password !== form.passwordConfirm)
      next.passwordConfirm = ERROR_MESSAGES.PASSWORD_NOT_MATCH;
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
      else setErrors({ general: message || ERROR_MESSAGES.SIGNUP_FAILED });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-[520px] flex-col gap-[34px] px-4 tablet:px-0"
    >
      <Input
        size="lg"
        inputClassName="!w-full"
        label="이메일"
        type="email"
        placeholder="이메일을 입력해 주세요"
        value={form.email}
        onChange={handleChange("email")}
        error={errors.email}
        required
      />

      <Input
        size="lg"
        inputClassName="!w-full"
        label="닉네임"
        type="text"
        placeholder="닉네임을 입력해 주세요"
        value={form.nickname}
        onChange={handleChange("nickname")}
        error={errors.nickname}
        required
      />

      <Input
        size="lg"
        inputClassName="!w-full"
        label="비밀번호"
        type={showPassword ? "text" : "password"}
        placeholder="8자 이상 입력해 주세요"
        value={form.password}
        onChange={handleChange("password")}
        error={errors.password}
        icon={
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
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

      <Input
        size="lg"
        inputClassName="!w-full"
        label="비밀번호 확인"
        type={showPasswordConfirm ? "text" : "password"}
        placeholder="비밀번호를 한번 더 입력해 주세요"
        value={form.passwordConfirm}
        onChange={handleChange("passwordConfirm")}
        error={errors.passwordConfirm}
        icon={
          <button
            type="button"
            onClick={() => setShowPasswordConfirm((prev) => !prev)}
            aria-label={showPasswordConfirm ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            <Image
              src={showPasswordConfirm ? "/img/icons/visible.png" : "/img/icons/invisible.png"}
              alt=""
              width={24}
              height={24}
            />
          </button>
        }
        required
      />

      {errors.general && <p className="-mt-[24px] text-[13px] text-[#FF483D]">{errors.general}</p>}

      <Button variant="primary" type="submit" disabled={isLoading} className="!w-full">
        {isLoading ? "가입 중..." : "가입하기"}
      </Button>

      <SocialButtons mode="signup" />

      <p className="text-center text-[14px] text-white tablet:text-[16px]">
        이미 최애의포토 회원이신가요?{" "}
        <Link href={ROUTES.LOGIN} className="text-[#EFFF04] underline">
          로그인하기
        </Link>
      </p>
    </form>
  );
}
