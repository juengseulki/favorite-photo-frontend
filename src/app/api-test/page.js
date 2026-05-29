"use client";

import { useQuery } from "@tanstack/react-query";
import { getHealth } from "@/lib/api/healthApi";

export default function ApiTestPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["health"],
    queryFn: getHealth,
  });

  if (isLoading) return <div className="p-10">백엔드 연결 확인 중...</div>;

  if (isError) {
    return <div className="p-10 text-red-500">연결 실패: {error.message}</div>;
  }

  return (
    <div className="p-10">
      <h1 className="mb-4 text-2xl font-bold">API 연결 테스트</h1>
      <pre className="rounded-lg bg-gray-100 p-4">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
