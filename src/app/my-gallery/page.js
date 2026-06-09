"use client";

import { PhotoCard } from "@/components/common/Card";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MyGalleryPage() {
  const { isLoading } = useAuth();

  const [cards, setCards] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1 });
  const [isPageDropdownOpen, setIsPageDropdownOpen] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    const myGalleryCards = async () => {
      try {
        const response = await axiosInstance.get(`/me/cards?page=${meta.page}`);
        console.log(response.data);
        setCards(response.data.data.items);
        setMeta(response.data.data.meta);
      } catch (error) {
        console.error(error);
      }
    };

    myGalleryCards();
  }, [meta.page, isLoading]);

  const totalPages = meta.totalPages;

  const firstPages = [1, 2, 3].filter((page) => page <= totalPages);

  const lastPages =
    totalPages > 3 ? [totalPages - 2, totalPages - 1, totalPages].filter((page) => page > 3) : [];

  const dropdownPages = [];

  for (let i = 4; i <= totalPages - 3; i++) {
    dropdownPages.push(i);
  }

  return (
    <>
      <div className="grid grid-cols-3 p-10 gap-20">
        {cards.map((card) => {
          return <PhotoCard key={card.id} card={card} />;
        })}
      </div>
      <div className="flex gap-[20px] items-center mb-50 justify-center">
        <Image
          src="/img/icons/left.png"
          alt="이전 페이지"
          className="cursor-pointer w-[24px] h-[24px]"
          width={24}
          height={24}
          onClick={() =>
            setMeta((t) => ({
              ...t,
              page: t.page - 1,
            }))
          }
        />
        <div className="flex gap-[10px]">
          {firstPages.map((page) => {
            const isActive = meta.page === page;

            return (
              <button
                key={page}
                className={`cursor-pointer w-[50px] h-[50px] ${
                  isActive ? "rounded-sm border border-[#DDDDDD]" : ""
                }`}
                onClick={() => setMeta((t) => ({ ...t, page }))}
              >
                {page}
              </button>
            );
          })}

          {dropdownPages.length > 0 && (
            <div className="relative">
              <button
                className="cursor-pointer w-[50px] h-[50px]"
                onClick={() => setIsPageDropdownOpen((prev) => !prev)}
              >
                ...
              </button>

              {isPageDropdownOpen && (
                <div
                  className="absolute top-[20px] left-0 w-[50px] h-[180px] overflow-y-auto border-[1px] border-[#EEEEEE] bg-black z-10
  [&::-webkit-scrollbar]:w-[4px]
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-[#5A5A5A]
  [&::-webkit-scrollbar-thumb]:rounded-full"
                >
                  {dropdownPages.map((page) => (
                    <button
                      key={page}
                      className="cursor-pointer w-full h-[40px]"
                      onClick={() => {
                        setMeta((t) => ({ ...t, page }));
                        setIsPageDropdownOpen(false);
                      }}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {lastPages.map((page) => {
            const isActive = meta.page === page;

            return (
              <button
                key={page}
                className={`cursor-pointer w-[50px] h-[50px] ${
                  isActive ? "rounded-sm border border-[#DDDDDD]" : ""
                }`}
                onClick={() => setMeta((t) => ({ ...t, page }))}
              >
                {page}
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
          onClick={() =>
            setMeta((t) => ({
              ...t,
              page: t.page + 1,
            }))
          }
        />
      </div>
    </>
  );
}
