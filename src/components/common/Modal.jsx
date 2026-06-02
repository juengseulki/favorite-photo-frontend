"use client";

import { createPortal } from "react-dom";
import { useEffect } from "react";
import Image from "next/image";

const SIZE_CLASSES = {
  default: "w-[345px] tablet:w-[400px] desktop:w-[560px]",
  form: "w-[345px] tablet:w-[744px] desktop:w-[1160px]",
  point: "w-[345px] tablet:w-[600px] desktop:w-[455px]",
};

export default function Modal({
  isOpen,
  title,
  children,
  actions,
  onClose,
  size = "default",
  className = "",
  bodyClassName = "",
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-[15px]">
      <section
        role="dialog"
        aria-modal="true"
        className={`
          relative
          max-h-[90vh]
          overflow-y-auto
          rounded-[2px]
          border border-[#5A5A5A]
          bg-[#161616]
          px-6 py-8
          text-white
          tablet:px-10
          desktop:px-10
          ${SIZE_CLASSES[size]}
          ${className}
        `}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute right-5 top-5 z-10"
        >
          <Image src="/img/icons/close.png" alt="" width={24} height={24} />
        </button>

        {title && (
          <h2 className="text-center text-[18px] font-bold desktop:text-[20px]">{title}</h2>
        )}

        <div className={`mt-8 ${bodyClassName}`}>{children}</div>

        {actions && <div className="mt-8 flex justify-center gap-3">{actions}</div>}
      </section>
    </div>,
    document.body,
  );
}
