"use client";

import Image from "next/image";

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
    <div className="flex gap-[20px] items-center mb-50 justify-center">
      <Image
        src="/img/icons/left.png"
        alt="이전 페이지"
        type="button"
        className="cursor-pointer w-[24px] h-[24px]"
        width={24}
        height={24}
        disabled={page === 1}
        onClick={handlePrev}
      />

      {pages.map((item, index) =>
        item === "..." ? (
          <span key={index}>...</span>
        ) : (
          <button key={index} type="button" onClick={() => onPageChange(item)}>
            {item}
          </button>
        ),
      )}

      <Image
        src="/img/icons/right.png"
        alt="다음 페이지"
        className="cursor-pointer w-[24px] h-[24px]"
        width={24}
        height={24}
        disabled={page === totalPages}
        onClick={handleNext}
      />

      <select value={pageSize} onChange={handleSizeChange}>
        {pageSizeOptions.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
}
