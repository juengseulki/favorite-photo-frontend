"use client";

import { PhotoCard } from "@/components/common/Card";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import { GradeChip } from "@/components/common/Grade";
import Dropdown from "@/components/common/Dropdown";
import Input from "@/components/common/Input";
import Pagination from "@/components/common/Pagination";
import { useQuery } from "@tanstack/react-query";

const GRADE_OPTIONS = [
  { label: "COMMON", value: "COMMON" },
  { label: "RARE", value: "RARE" },
  { label: "SUPER RARE", value: "SUPER_RARE" },
  { label: "LEGENDARY", value: "LEGENDARY" },
];

export const GENRE_OPTIONS = [
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

  useEffect(() => {
    if (isLoading) return;

    const myGalleryCards = async () => {
      try {
        const response = await axiosInstance.get(
          `/me/cards?page=${meta.page}&limit=${meta.limit}&grade=${grade}&genre=${genre}`,
        );
        console.log(response.data.data);
        setCards(response.data.data.items);
        setMeta(response.data.data.meta);
        setGrades(response.data.data.gradeCount);
      } catch (error) {
        console.error(error);
      }
    };

    myGalleryCards();
  }, [meta.page, isLoading, grade, genre, meta.limit]);

  return (
    <div className="max-w-[1920px] px-[220px]">
      <div className="flex justify-between border-b-2 border-[#EEEEEE]">
        <span className="text-[62px] font-normal tracking-[-0.03em]">마이갤러리</span>
        <Button>포토카드 생성하기</Button>
      </div>
      <div className="flex flex-col gap-[20px] mt-10 pb-10 border-b border-[#5A5A5A] ">
        <span>{user ? `${user.nickname}님이 보유한 포토카드 (${meta.totalCopyCount}장)` : ""}</span>
        <div className="flex gap-[20px]">
          {grades.map(({ grade, count }) => (
            <GradeChip key={grade} grade={grade} count={count} />
          ))}
        </div>
      </div>
      <div className="flex gap-3 mt-3 mb-15">
        <Input labelSize="md" variant="search" placeholder="검색" size="searchLg" />
        <Dropdown
          placeholder="등급"
          size="sort"
          options={GRADE_OPTIONS}
          value={grade}
          onChange={setGrade}
        />
        <Dropdown
          placeholder="장르"
          size="sort"
          options={GENRE_OPTIONS}
          value={genre}
          onChange={setGenre}
        />
      </div>
      <div className="grid grid-cols-3 gap-30">
        {cards.map((card) => {
          return <PhotoCard key={card.id} card={card} />;
        })}
      </div>
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
  );
}
