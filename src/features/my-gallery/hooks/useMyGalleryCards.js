"use client";

import { useEffect, useRef } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import { getMyGalleryCards } from "@/lib/api/galleryApi";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { formatGalleryCards } from "../utils/formatGalleryCards";

export function useMyGalleryCards({ limit, isMobile, page, grade, genre, keyword }) {
  const { isLoading, user } = useAuth();
  const observerRef = useRef(null);

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
      const currentPage = lastPage.meta.page;
      const totalPages = lastPage.meta.totalPages;

      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: !isLoading && !!user && isMobile,
  });

  const rawCards = isMobile
    ? (infiniteQuery.data?.pages.flatMap((page) => page.items) ?? [])
    : (pageQuery.data?.items ?? []);

  const cards = formatGalleryCards(rawCards);

  const meta = isMobile ? (infiniteQuery.data?.pages[0]?.meta ?? {}) : (pageQuery.data?.meta ?? {});

  const grades = isMobile
    ? (infiniteQuery.data?.pages[0]?.gradeCount ?? [])
    : (pageQuery.data?.gradeCount ?? []);

  useEffect(() => {
    if (!isMobile) return;
    if (!observerRef.current) return;
    if (!infiniteQuery.hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !infiniteQuery.isFetchingNextPage) {
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

  return {
    cards,
    meta,
    grades,
    observerRef,
  };
}
