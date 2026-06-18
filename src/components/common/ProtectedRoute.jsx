"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";
import { useAuth } from "@/providers/AuthProvider";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(`${ROUTES.SIGNUP}?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isLoading, user, router, pathname]);

  if (isLoading) return null;
  if (!user) return null;

  return children;
}
