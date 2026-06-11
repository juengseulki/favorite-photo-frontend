"use client";

import Image from "next/image";
import { useState } from "react";

export const getPaginationRange = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
};

export default function Pagination({
  page,
  totalCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [4, 5, 6, 7, 8],
}) {
  const totalPages = Math.ceil(totalCount / pageSize);

  const pages = getPaginationRange(page, totalPages);
  const [openDotsIndex, setOpenDotsIndex] = useState(null);

  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (page === 1) return;

    onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page === totalPages) return;

    onPageChange(page + 1);
  };

  const handleSizeChange = (e) => {
    const size = Number(e.target.value);

    onPageSizeChange(size);

    // 페이지 사이즈 바뀌면 첫 페이지로
    onPageChange(1);
  };

  return (
    <div className="flex gap-[20px] items-center mb-50 mt-30 justify-center">
      <Image
        src="/img/icons/left.png"
        alt="이전 페이지"
        type="button"
        className="cursor-pointer w-[24px] h-[24px]"
        width={24}
        height={24}
        // disabled={page === 1}
        onClick={handlePrev}
      />
      <div className="flex gap-[10px] items-center">
        {pages.map((item, index) => {
          const isActive = item === page;

          if (item === "...") {
            const prevPage = pages[index - 1];
            const nextPage = pages[index + 1];

            const dropdownPages = Array.from(
              { length: nextPage - prevPage - 1 },
              (_, i) => prevPage + i + 1,
            );

            return (
              <div key={`dots-${index}`} className="relative">
                <button
                  type="button"
                  className="cursor-pointer w-[50px] h-[50px]"
                  onClick={() => setOpenDotsIndex((prev) => (prev === index ? null : index))}
                >
                  ...
                </button>

                {openDotsIndex === index && (
                  <div
                    className="absolute top-[50px] left-0 w-[50px] max-h-[180px] overflow-y-auto border border-[#EEEEEE] bg-black z-10
            [&::-webkit-scrollbar]:w-[4px]
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-[#5A5A5A]
            [&::-webkit-scrollbar-thumb]:rounded-full"
                  >
                    {dropdownPages.map((pageNumber) => (
                      <button
                        key={pageNumber}
                        type="button"
                        className="cursor-pointer w-full h-[40px]"
                        onClick={() => {
                          onPageChange(pageNumber);
                          setOpenDotsIndex(null);
                        }}
                      >
                        {pageNumber}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              className={`cursor-pointer w-[50px] h-[50px] ${
                isActive ? "rounded-sm border border-[#DDDDDD]" : ""
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <Image
        src="/img/icons/right.png"
        alt="다음 페이지"
        className="cursor-pointer w-[24px] h-[24px]"
        width={24}
        height={24}
        // disabled={page === totalPages}
        onClick={handleNext}
      />
    </div>
  );
}
