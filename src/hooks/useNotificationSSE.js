"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";

export default function useNotificationSSE({ enabled = true } = {}) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return;

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const eventSource = new EventSource(`${baseUrl}/notifications/stream`, {
      withCredentials: true,
    });

    eventSource.addEventListener("connected", () => {
      console.log("SSE 알림 연결 성공");
    });

    eventSource.addEventListener("notification", (event) => {
      const notification = JSON.parse(event.data);

      queryClient.setQueryData(QUERY_KEYS.NOTIFICATIONS.LIST, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          items: [notification, ...(oldData.items ?? [])],
          meta: {
            ...oldData.meta,
            totalCount: (oldData.meta?.totalCount ?? 0) + 1,
            unreadCount: (oldData.meta?.unreadCount ?? 0) + 1,
          },
        };
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.NOTIFICATIONS.LIST,
      });
    });

    eventSource.onerror = (error) => {
      console.error("SSE 알림 연결 오류", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [enabled, queryClient]);
}
