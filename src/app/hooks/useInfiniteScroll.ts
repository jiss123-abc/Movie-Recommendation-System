import { useEffect, useRef, useState } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Hook for implementing infinite scroll
 * Returns a ref to attach to the sentinel element and loading state
 */
export function useInfiniteScroll(
  onLoadMore: () => void,
  options: UseInfiniteScrollOptions = {}
) {
  const { threshold = 0.1, rootMargin = '100px' } = options;
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
        
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [onLoadMore, threshold, rootMargin]);

  return { sentinelRef, isIntersecting };
}
