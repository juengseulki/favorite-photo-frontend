"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const SIZE_CLASSES = {
  lg: "h-[60px] w-[520px]",
  md: "h-[55px] w-[440px]",
  sm: "h-[55px] w-[345px]",
  sort: "h-[50px] w-[180px]",
};

const LABEL_SIZE_CLASSES = {
  md: "text-[16px]",
  lg: "text-[20px]",
};

const ICON_SIZE = {
  lg: 28,
  md: 24,
  sm: 22,
  sort: 18,
};

export default function Dropdown({
  label,
  labelSize = "md",
  placeholder = "선택",
  options = [],
  value,
  onChange,
  size = "md",
  iconSize,
  error,
  className = "",
  buttonClassName = "",
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    const close = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", close);

    return () => window.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative flex flex-col gap-[10px] ${className}`}>
      {label && (
        <span className={`font-bold text-white ${LABEL_SIZE_CLASSES[labelSize]}`}>{label}</span>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`
          flex items-center justify-between
          rounded-[2px]
          border
          bg-black
          px-5
          text-[14px]
          text-white
          ${SIZE_CLASSES[size]}
          ${error ? "border-red" : "border-gray-200"}
          ${buttonClassName}
        `}
      >
        <span className={`${selected ? "text-white" : "text-gray-300"} shrink-0`}>
          {selected?.label || placeholder}
        </span>

        <Image
          src="/img/icons/down.png"
          alt=""
          width={iconSize || ICON_SIZE[size]}
          height={iconSize || ICON_SIZE[size]}
        />
      </button>

      {open && (
        <ul
          className={`
            absolute
            top-full
            z-30
            mt-2
            h-auto
            overflow-hidden
            rounded-[2px]
            border
            border-gray-400
            bg-gray-500
            ${SIZE_CLASSES[size]}
          `}
        >
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className="
                  h-[50px]
                  w-full
                  px-5
                  text-left
                  text-[14px]
                  text-white
                  hover:bg-gray-450
                "
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-[12px] text-red">{error}</p>}
    </div>
  );
}
