"use client";

import Image from "next/image";

const SIZE_CLASSES = {
  lg: "h-[60px] w-[520px]",
  md: "h-[55px] w-[440px]",
  sm: "h-[55px] w-[345px]",
  searchLg: "h-[50px] w-[320px]",
  searchMd: "h-[45px] w-[200px]",
  searchSm: "h-[45px] w-[345px]",
};

export default function Input({
  label,
  error,
  size = "md",
  type = "text",
  variant = "text",
  className = "",
  inputClassName = "",
  icon,
  rightText,
  ...props
}) {
  const isSearch = variant === "search";

  return (
    <label className={`flex flex-col gap-[10px] ${className}`}>
      {label && <span className="text-[14px] font-bold text-white">{label}</span>}

      <div
        className={`
          flex items-center
          rounded-[2px]
          border
          bg-[#0F0F0F]
          px-5
          ${SIZE_CLASSES[size]}
          ${error ? "border-red-500" : "border-[#DDDDDD]"}
          ${inputClassName}
        `}
      >
        <input
          type={type}
          className="
            min-w-0
            flex-1
            bg-transparent
            text-[14px]
            text-white
            outline-none
            placeholder:text-[#777777]
          "
          {...props}
        />

        {rightText && <span className="ml-2 text-[14px] font-bold text-white">{rightText}</span>}

        {isSearch && <Image src="/img/icons/search.png" alt="" width={22} height={22} />}

        {icon && icon}
      </div>

      {error && <p className="text-[12px] text-red-500">{error}</p>}
    </label>
  );
}
