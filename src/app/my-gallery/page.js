"use client";

import { PhotoCard } from "@/components/common/Card";
import { useAuth } from "@/providers/AuthProvider";
import { useState, useRef, useEffect } from "react";
import Button from "@/components/common/Button";
import { GradeChip } from "@/components/common/Grade";
import Dropdown from "@/components/common/Dropdown";
import Input from "@/components/common/Input";
import Pagination from "@/components/common/Pagination";
import { getMyGalleryCards } from "@/lib/api/galleryApi";
import Image from "next/image";
import Modal from "@/components/common/Modal";
import useResponsiveLimit from "@/hooks/useResponsiveLimit";
import { GRADE_OPTIONS, GENRE_OPTIONS } from "@/lib/constants/galleryOptions";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { ROUTES } from "@/lib/constants";
import { useRouter } from "next/navigation";

export default function MyGalleryPage() {
  const { isLoading, user } = useAuth();
  const { limit, isMobile } = useResponsiveLimit();
  const observerRef = useRef(null);
  const router = useRouter();

  const [grade, setGrade] = useState("");
  const [genre, setGenre] = useState("");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const commonParams = {
    limit,
    grade,
    genre,
    keyword,
  };

  const pageQuery = useQuery({
    queryKey: QUERY_KEYS.GALLERY.MY_CARDS({
      ...commonParams,
      page,
    }),
    queryFn: () =>
      getMyGalleryCards({
        ...commonParams,
        page,
      }),
    enabled: !isLoading && !!user && !isMobile,
  });

  const infiniteQuery = useInfiniteQuery({
    queryKey: QUERY_KEYS.GALLERY.MY_CARDS(commonParams),
    queryFn: ({ pageParam }) =>
      getMyGalleryCards({
        ...commonParams,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const page = lastPage.meta.page;
      const totalPages = lastPage.meta.totalPages;

      return page < totalPages ? page + 1 : undefined;
    },
    enabled: !isLoading && !!user && isMobile,
  });

  const rawCards = isMobile
    ? (infiniteQuery.data?.pages.flatMap((page) => page.items) ?? [])
    : (pageQuery.data?.items ?? []);

  const cards = rawCards.map((card) => ({
    ...card,
    creator: {
      nickname: card.creatorNickname,
    },
    price: card.initialPrice,
    count: card.quantity,
  }));

  console.log(cards);

  const meta = isMobile ? (infiniteQuery.data?.pages[0]?.meta ?? {}) : (pageQuery.data?.meta ?? {});

  const grades = isMobile
    ? (infiniteQuery.data?.pages[0]?.gradeCount ?? [])
    : (pageQuery.data?.gradeCount ?? []);

  // 하단 감지용
  useEffect(() => {
    if (!isMobile) return;
    if (!observerRef.current) return;
    if (!infiniteQuery.hasNextPage) return;

    const observer = new IntersectionObserver((t) => {
      if (t[0].isIntersecting && !infiniteQuery.isFetchingNextPage) {
        infiniteQuery.fetchNextPage();
      }
    });

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [
    isMobile,
    infiniteQuery.fetchNextPage,
    infiniteQuery.hasNextPage,
    infiniteQuery.isFetchingNextPage,
  ]);

  return (
    <div className="mx-auto max-w-[1920px] px-[20px] desktop:px-[220px]">
      <div className="hidden justify-between border-b-2 border-gray-100 desktop:flex">
        <span className="text-[62px] font-normal tracking-[-0.03em]">마이갤러리</span>
        <Button onClick={() => router.push(ROUTES.CREATE_CARD)}>포토카드 생성하기</Button>
      </div>
      <div className="fixed bottom-0 left-0 z-50 w-full px-[20px] pb-[20px] tablet:hidden">
        <Button size="full" onClick={() => router.push(ROUTES.CREATE_CARD)}>
          포토카드 생성하기
        </Button>
      </div>
      <div className="mt-10 flex flex-col gap-[20px] border-b border-gray-400 pb-3 desktop:pb-10">
        <p className="flex gap-[10px] items-center">
          <span className="text-[14px] font-bold leading-none desktop:text-[24px]">
            {user ? `${user.nickname}님이 보유한 포토카드` : ""}
          </span>
          <span className="text-[12px] font-normal leading-none text-gray-300 desktop:text-[20px]">
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
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex h-[50px] w-[50px] shrink-0 items-center justify-center border border-gray-200 bg-black tablet:hidden"
        >
          <Image src="/img/icons/filter.png" alt="모바일 필터 버튼" width={15} height={15} />
        </button>
        <Input
          inputClassName="w-full"
          labelSize="md"
          variant="search"
          placeholder="검색"
          size="searchLg"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setPage(1);
          }}
        />

        <div className="hidden tablet:block">
          <Dropdown
            placeholder="등급"
            size="sort"
            options={GRADE_OPTIONS}
            value={grade}
            onChange={(value) => {
              setGrade(value);
              setPage(1);
            }}
          />
        </div>

        <div className="hidden tablet:block">
          <Dropdown
            placeholder="장르"
            size="sort"
            options={GENRE_OPTIONS}
            value={genre}
            onChange={(value) => {
              setGenre(value);
              setPage(1);
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-[20px] desktop:grid-cols-3 desktop:gap-[120px]">
        {cards.map((card) => {
          return <PhotoCard key={card.id} card={card} />;
        })}
      </div>
      <div ref={observerRef} className="h-[1px] tablet:hidden" />
      <div className="hidden tablet:block">
        <Pagination
          page={page}
          totalCount={meta?.totalCount ?? 0}
          pageSize={limit}
          onPageChange={setPage}
        />
      </div>
      <Modal isOpen={isModalOpen} title="필터" onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col gap-3 justify-center items-center">
          <Dropdown
            placeholder="등급"
            size="sort"
            options={GRADE_OPTIONS}
            value={grade}
            onChange={(value) => {
              setGrade(value);
              setPage(1);
            }}
          />
          <Dropdown
            placeholder="장르"
            size="sort"
            options={GENRE_OPTIONS}
            value={genre}
            onChange={(value) => {
              setGenre(value);
              setPage(1);
            }}
          />
        </div>
      </Modal>
    </div>
  );
}
