"use client";

import { useEffect, useState } from "react";

export default function useResponsiveLimit() {
  const [responsive, setResponsive] = useState({
    limit: 16,
    isMobile: false,
  });

  useEffect(() => {
    const updateResponsive = () => {
      const width = window.innerWidth;

      setResponsive({
        limit: width >= 1200 ? 15 : 16,
        isMobile: width < 768,
      });
    };

    updateResponsive();

    window.addEventListener("resize", updateResponsive);

    return () => {
      window.removeEventListener("resize", updateResponsive);
    };
  }, []);

  return responsive;
}
