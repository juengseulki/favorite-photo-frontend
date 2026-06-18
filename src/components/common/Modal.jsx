"use client";

import { createPortal } from "react-dom";
import { useEffect } from "react";
import Image from "next/image";

const SIZE_CLASSES = {
  default: "w-[345px] tablet:w-[400px] desktop:w-[560px]",
  form: "w-[345px] tablet:w-[744px] desktop:w-[1160px]",
  point: "w-[345px] tablet:w-[600px] desktop:w-[1034px]",
  pointResult: "w-[345px] tablet:w-[600px] desktop:w-[455px]",
  exchange: "w-[345px] tablet:w-[744px] desktop:h-[1000px] desktop:w-[1160px]",
  purchase: "h-[291px] w-[345px] tablet:h-[290px] tablet:w-[400px]",
  purchaseResult: "h-screen w-screen max-h-screen border-0",
  bottomSheet:
    "fixed bottom-0 left-0 right-0 max-h-[90vh] w-full rounded-b-none rounded-t-[16px] tablet:left-1/2 tablet:right-auto tablet:w-[744px] tablet:-translate-x-1/2 desktop:static desktop:w-[1160px] desktop:translate-x-0 desktop:rounded-[2px]",
  mobileFullPage:
    "fixed inset-0 h-screen max-h-screen w-full rounded-none border-0 tablet:bottom-0 tablet:left-1/2 tablet:right-auto tablet:top-auto tablet:h-auto tablet:max-h-[90vh] tablet:w-[744px] tablet:-translate-x-1/2 tablet:rounded-b-none tablet:rounded-t-[16px] desktop:static desktop:h-auto desktop:w-[1160px] desktop:translate-x-0 desktop:rounded-[2px] desktop:border",
};

const SHEET_SIZES = ["bottomSheet", "mobileFullPage"];
const NO_SCROLL_SIZES = ["purchase", "purchaseResult"];
const CLOSE_BUTTON_CLASSES = {
  purchase: "right-5 top-[50px]",
  purchaseResult: "right-5 top-[26px]",
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
  sheetOnTablet = false,
}) {
  const isSheetSize = SHEET_SIZES.includes(size);
  const isNoScroll = NO_SCROLL_SIZES.includes(size);
  const closeButtonClassName = CLOSE_BUTTON_CLASSES[size] ?? "right-5 top-5";

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

  const overlayClassName = sheetOnTablet
    ? "fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-[15px] tablet:items-end desktop:items-center"
    : `fixed inset-0 z-50 flex bg-black/75 ${
        isSheetSize
          ? "items-end justify-center px-0 tablet:px-0 desktop:items-center desktop:px-[15px]"
          : "items-center justify-center px-[15px]"
      }`;

  const sectionClassName = sheetOnTablet
    ? `
        relative
        max-h-[90vh]
        overflow-y-auto
        rounded-[2px]
        border border-gray-400
        bg-gray-500
        px-6 py-8
        text-white
        tablet:rounded-b-none
        tablet:px-8
        tablet:pb-10
        tablet:pt-6
        desktop:rounded-[2px]
        desktop:px-10
        desktop:py-8
        ${SIZE_CLASSES[size]}
        ${className}
      `
    : `
        relative
        ${isNoScroll ? "overflow-hidden" : "max-h-[90vh] overflow-y-auto"}
        border border-gray-400
        bg-gray-500
        text-white
        ${isSheetSize ? "px-5 py-8 tablet:px-10 desktop:px-10" : "max-h-[90vh] rounded-[2px] px-6 py-8 tablet:px-10 desktop:px-10"}
        ${SIZE_CLASSES[size]}
        ${className}
      `;

  return createPortal(
    <div className={overlayClassName}>
      <section role="dialog" aria-modal="true" className={sectionClassName}>
        {sheetOnTablet && (
          <div className="mb-4 hidden justify-center tablet:flex desktop:hidden">
            <div className="h-[4px] w-[56px] rounded-full bg-gray-300" />
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className={`absolute z-10 ${closeButtonClassName}`}
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
