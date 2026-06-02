"use client";

import { useState } from "react";
import Dropdown from "@/components/common/Dropdown";

const GRADE_OPTIONS = [
  {
    label: "COMMON",
    value: "COMMON",
  },
  {
    label: "RARE",
    value: "RARE",
  },
  {
    label: "SUPER RARE",
    value: "SUPER_RARE",
  },
  {
    label: "LEGENDARY",
    value: "LEGENDARY",
  },
];

const GENRE_OPTIONS = [
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

const SORT_OPTIONS = [
  {
    label: "최신순",
    value: "latest",
  },
  {
    label: "낮은 가격순",
    value: "price_asc",
  },
  {
    label: "높은 가격순",
    value: "price_desc",
  },
];

export default function DropdownTestPage() {
  const [grade, setGrade] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("");

  return (
    <main className="min-h-screen bg-[#0F0F0F] p-20">
      <div className="flex flex-col gap-10">
        {/* 생성 / 수정 폼 */}
        <Dropdown
          label="등급"
          labelSize="md"
          placeholder="등급을 선택해 주세요"
          size="lg"
          options={GRADE_OPTIONS}
          value={grade}
          onChange={setGrade}
        />

        <Dropdown
          label="장르"
          labelSize="md"
          placeholder="장르를 선택해 주세요"
          size="lg"
          options={GENRE_OPTIONS}
          value={genre}
          onChange={setGenre}
        />

        {/* 작은 정렬 */}
        <Dropdown
          placeholder="최신순"
          size="sort"
          options={SORT_OPTIONS}
          value={sort}
          onChange={setSort}
        />

        {/* 에러 */}
        <Dropdown
          label="에러 상태"
          placeholder="선택해주세요"
          size="lg"
          error="필수 선택입니다."
          options={GRADE_OPTIONS}
        />

        {/* 작은 라벨 테스트 */}
        <Dropdown
          label="모바일 사이즈"
          labelSize="sm"
          placeholder="선택"
          size="sm"
          options={GRADE_OPTIONS}
        />
      </div>
    </main>
  );
}
