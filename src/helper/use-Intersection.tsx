import { useCallback, useRef } from "react";

export const useIntersection = (
  onIntersect: () => void,
  onNotIntersect: () => void,
  threshold?: number
) => {
  const observerRef = useRef<IntersectionObserver>();
  const intersectionRef = useCallback((div: HTMLDivElement | null) => {
    if (div) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              onIntersect();
            } else {
              onNotIntersect();
            }
          });
        },
        { threshold }
      );
      observerRef.current = observer;
      observer.observe(div);
    } else {
      observerRef.current?.disconnect();
    }
  }, []);

  return intersectionRef;
};
