"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import Pagination from "@/components/common/Pagination";
import useResponsiveLimit from "@/hooks/useResponsiveLimit";
import GalleryHeader from "@/features/my-gallery/components/GalleryHeader";
import GallerySummary from "@/features/my-gallery/components/GallerySummary";
import GalleryFilterBar from "@/features/my-gallery/components/GalleryFilterBar";
import GalleryGrid from "@/features/my-gallery/components/GalleryGrid";
import { useMyGalleryCards } from "@/features/my-gallery/hooks/useMyGalleryCards";
import GalleryFilterSheet from "@/features/my-gallery/components/GalleryFilterSheet";

export default function MyGalleryPage() {
  const { limit, isMobile } = useResponsiveLimit();

  const [grade, setGrade] = useState("");
  const [genre, setGenre] = useState("");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const { cards, meta, grades, observerRef, createStatus } = useMyGalleryCards({
    limit,
    isMobile,
    page,
    grade,
    genre,
    keyword,
  });

  const handleGradeChange = (value) => {
    setGrade(value);
    setPage(1);
  };

  const handleGenreChange = (value) => {
    setGenre(value);
    setPage(1);
  };

  const handleKeywordChange = (value) => {
    setKeyword(value);
    setPage(1);
  };

  const gradeCounts = Object.fromEntries((grades ?? []).map(({ grade, count }) => [grade, count]));

  const genreCounts = cards.reduce((acc, card) => {
    acc[card.genre] = (acc[card.genre] ?? 0) + (card.count ?? card.quantity ?? 1);
    return acc;
  }, {});

  const resultCounts = cards.reduce((total, card) => {
    return total + (card.count ?? card.quantity ?? 1);
  }, 0);

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-[1920px] px-[20px] desktop:px-[220px]">
        <GalleryHeader createStatus={createStatus} />

        <GallerySummary meta={meta} grades={grades} />

        <GalleryFilterBar
          grade={grade}
          genre={genre}
          keyword={keyword}
          onGradeChange={handleGradeChange}
          onGenreChange={handleGenreChange}
          onKeywordChange={handleKeywordChange}
          onOpenFilter={() => setIsModalOpen(true)}
        />

        <GalleryGrid cards={cards} selectedCard={selectedCard} setSelectedCard={setSelectedCard} />

        <div ref={observerRef} className="h-[1px] tablet:hidden" />

        <div className="hidden tablet:block">
          <Pagination
            page={page}
            totalCount={meta?.totalCount ?? 0}
            pageSize={limit}
            onPageChange={setPage}
          />
        </div>

        {/* <GalleryFilterSheet
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          grade={grade}
          genre={genre}
          counts={{
            grades: gradeCounts,
            genres: genreCounts,
          }}
          resultCount={resultCount}
          onGradeChange={handleGradeChange}
          onGenreChange={handleGenreChange}
        /> */}

        <GalleryFilterSheet
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          grade={grade}
          genre={genre}
          counts={{
            grades: gradeCounts,
            genres: genreCounts,
          }}
          resultCounts={resultCounts}
          onGradeChange={handleGradeChange}
          onGenreChange={handleGenreChange}
        />
      </div>
    </ProtectedRoute>
  );
}
