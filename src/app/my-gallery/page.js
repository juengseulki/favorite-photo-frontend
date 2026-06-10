"use client";

import { PhotoCard } from "@/components/common/Card";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import Button from "@/components/common/Button";
import { GradeChip } from "@/components/common/Grade";
import Dropdown from "@/components/common/Dropdown";
import Input from "@/components/common/Input";
import Pagination from "@/components/common/Pagination";
import { getMyGalleryCards } from "@/lib/api/galleryApi";
import Image from "next/image";

const GRADE_OPTIONS = [
  { label: "등급", value: "" },
  { label: "COMMON", value: "COMMON" },
  { label: "RARE", value: "RARE" },
  { label: "SUPER RARE", value: "SUPER_RARE" },
  { label: "LEGENDARY", value: "LEGENDARY" },
];

export const GENRE_OPTIONS = [
  { label: "장르", value: "" },
  {
    label: "앨범",
    value: "ALBUM",
  },
  {
    label: "특전",
    value: "SPECIAL",
  },
  {
    label: "팬싸",
    value: "FAN_SIGN",
  },
  {
    label: "시즌그리팅",
    value: "SEASON_GREETING",
  },
  {
    label: "콘서트",
    value: "CONCERT",
  },
];

export default function MyGalleryPage() {
  const { isLoading, user } = useAuth();

  const [cards, setCards] = useState([]);
  const [meta, setMeta] = useState({
    page: 1,
    limit: 15,
  });
  const [grades, setGrades] = useState([]);
  const [grade, setGrade] = useState("");
  const [genre, setGenre] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (isLoading) return;

    const myGalleryCards = async () => {
      try {
        const data = await getMyGalleryCards({
          page: meta.page,
          limit: meta.limit,
          grade,
          genre,
          keyword,
        });
        setCards(data.items);
        setMeta(data.meta);
        setGrades(data.gradeCount);
      } catch (error) {
        console.error(error);
      }
    };

    myGalleryCards();
  }, [meta.page, isLoading, grade, genre, meta.limit, keyword]);

  return (
    <div className="mx-auto max-w-[1920px] px-[20px] desktop:px-[220px]">
      <div className="hidden justify-between border-b-2 border-[#EEEEEE] desktop:flex">
        <span className="text-[62px] font-normal tracking-[-0.03em]">마이갤러리</span>
        <Button>포토카드 생성하기</Button>
      </div>
      {/* 모바일 */}
      <div className="fixed bottom-0 left-0 z-50 w-full px-[20px] pb-[20px] tablet:hidden">
        <Button size="full">포토카드 생성하기</Button>
      </div>
      <div className="mt-10 flex flex-col gap-[20px] border-b border-[#5A5A5A] pb-3 desktop:pb-10">
        <p className="flex gap-[10px] items-center">
          <span className="text-[14px] font-bold leading-none desktop:text-[24px]">
            {user ? `${user.nickname}님이 보유한 포토카드` : ""}
          </span>
          <span className="text-[12px] font-normal leading-none text-[#A4A4A4] desktop:text-[20px]">
            ({meta.totalCopyCount}장)
          </span>
        </p>
        <div className="overflow-x-auto">
          <div className="flex w-max gap-[10px]">
            {grades.map(({ grade, count }) => (
              <GradeChip key={grade} grade={grade} count={count} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 mb-3 flex justify-between gap-3 tablet:mb-20 tablet:justify-start">
        <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center border border-[#DDDDDD] bg-[#0F0F0F] tablet:hidden">
          <Image src="/img/icons/filter.png" alt="모바일 필터 버튼" width={15} height={15} />
        </div>
        <Input
          inputClassName="w-full"
          labelSize="md"
          variant="search"
          placeholder="검색"
          size="searchLg"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <div className="hidden tablet:block">
          <Dropdown
            placeholder="등급"
            size="sort"
            options={GRADE_OPTIONS}
            value={grade}
            onChange={setGrade}
          />
        </div>

        <div className="hidden tablet:block">
          <Dropdown
            placeholder="장르"
            size="sort"
            options={GENRE_OPTIONS}
            value={genre}
            onChange={setGenre}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-[20px] desktop:grid-cols-3 desktop:gap-[120px]">
        {cards.map((card) => {
          return <PhotoCard key={card.id} card={card} />;
        })}
      </div>
      <div className="hidden tablet:block">
        <Pagination
          page={meta.page}
          totalCount={meta?.totalCount ?? 0}
          pageSize={meta.limit}
          onPageChange={(page) =>
            setMeta((prev) => ({
              ...prev,
              page,
            }))
          }
          onPageSizeChange={(pageSize) =>
            setMeta((prev) => ({
              ...prev,
              pageSize,
              page: 1,
            }))
          }
        />
      </div>
    </div>
  );
}
