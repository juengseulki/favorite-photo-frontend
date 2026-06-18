import { useEffect } from "react";

export default function useInfiniteScroll({
  targetRef,
  enabled,
  onIntersect,
  rootMargin = "200px",
  threshold = 0,
}) {
  useEffect(() => {
    const target = targetRef.current;

    if (!target || !enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [targetRef, enabled, onIntersect, rootMargin, threshold]);
}
