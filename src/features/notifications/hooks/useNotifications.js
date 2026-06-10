import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import {
  getNotifications,
  readAllNotifications,
  readNotification,
} from "@/lib/api/notificationApi";

export function useNotifications() {
  return useQuery({
    queryKey: QUERY_KEYS.NOTIFICATIONS.LIST(),

    queryFn: async () => {
      const response = await getNotifications();

      return response.data.data.items;
    },

    staleTime: 1000 * 30,
  });
}

export function useReadNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: readNotification,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.NOTIFICATIONS.ROOT,
      });
    },
  });
}

export function useReadAllNotifications() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: readAllNotifications,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.NOTIFICATIONS.ROOT,
      });
    },
  });
}
