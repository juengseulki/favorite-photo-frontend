"use client";

import Image from "next/image";
import { useState } from "react";

export default function AuthInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex w-full flex-col gap-2">
      {label && <label className="text-[14px] font-medium text-[#A4A4A4]">{label}</label>}

      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            h-[60px] w-full bg-[#161616] px-4
            text-[16px] text-[#DDDDDD] placeholder-[#5A5A5A]
            border outline-none transition
            ${error ? "border-[#FF483D]" : "border-[#5A5A5A] focus:border-[#FFFF04]"}
            ${isPassword ? "pr-12" : ""}
          `}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            <Image
              src={showPassword ? "/img/icons/visible.png" : "/img/icons/invisible.png"}
              alt=""
              width={24}
              height={24}
            />
          </button>
        )}
      </div>

      {error && <p className="text-[12px] text-[#FF483D]">{error}</p>}
    </div>
  );
}
