"use client";

import { useEffect, useState } from "react";

export default function useResponsiveLimit() {
  const [limit, setLimit] = useState(16);

  useEffect(() => {
    const updateLimit = () => {
      const nextLimit = window.innerWidth >= 1200 ? 15 : 16;

      setLimit((prev) => {
        if (prev === nextLimit) return prev;
        return nextLimit;
      });
    };

    updateLimit();

    window.addEventListener("resize", updateLimit);

    return () => {
      window.removeEventListener("resize", updateLimit);
    };
  }, []);

  return limit;
}
