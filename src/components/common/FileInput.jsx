"use client";

import { useRef, useState } from "react";

const SIZE_CLASSES = {
  lg: "w-[520px]",
  md: "w-[440px]",
  sm: "w-[345px]",
};

const INPUT_SIZE_CLASSES = {
  lg: "w-[390px]",
  md: "w-[310px]",
  sm: "w-[215px]",
};

const LABEL_SIZE_CLASSES = {
  md: "text-[16px]",
  lg: "text-[20px]",
};

export default function FileInput({
  label,
  size = "md",
  labelSize = "md",
  error,
  className = "",
  onChange,
}) {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFileName(file.name);
    onChange?.(file);
  };

  return (
    <div className={`flex flex-col gap-[10px] ${className}`}>
      {label && (
        <span className={`font-bold text-white ${LABEL_SIZE_CLASSES[labelSize]}`}>{label}</span>
      )}

      <div className={`flex items-center gap-[10px] ${SIZE_CLASSES[size]}`}>
        <div
          className={`
            flex h-[60px] items-center rounded-[2px] border bg-[#0F0F0F]
            px-5 text-[14px] text-white
            ${INPUT_SIZE_CLASSES[size]}
            ${error ? "border-red-500" : "border-[#DDDDDD]"}
          `}
        >
          <span className={fileName ? "truncate text-white" : "truncate text-[#777777]"}>
            {fileName || "사진 업로드"}
          </span>
        </div>

        <button
          type="button"
          onClick={handleClick}
          className="
            h-[60px] w-[120px] rounded-[2px] border border-[#EFFF04]
            text-[14px] font-bold text-[#EFFF04]
          "
        >
          파일 선택
        </button>

        <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleChange} />
      </div>

      {error && <p className="text-[12px] text-red-500">{error}</p>}
    </div>
  );
}
