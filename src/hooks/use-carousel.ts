import { useCallback, useState } from 'react';

const SWIPE_THRESHOLD = 50;

export function useCarousel(itemCount: number) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const next = useCallback(() => {
    if (itemCount > 1) {
      setCurrentIndex((prev) => (prev === itemCount - 1 ? 0 : prev + 1));
    }
  }, [itemCount]);

  const prev = useCallback(() => {
    if (itemCount > 1) {
      setCurrentIndex((prev) => (prev === 0 ? itemCount - 1 : prev - 1));
    }
  }, [itemCount]);

  const goTo = (index: number) => {
    setCurrentIndex(index);
  };

  const touchHandlers = {
    onTouchStart: (e: React.TouchEvent) => {
      setTouchStart(e.targetTouches[0].clientX);
    },
    onTouchMove: (e: React.TouchEvent) => {
      if (touchStart === null) return;
      const touchEnd = e.targetTouches[0].clientX;
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > SWIPE_THRESHOLD;
      const isRightSwipe = distance < -SWIPE_THRESHOLD;

      if (isLeftSwipe) {
        next();
        setTouchStart(null);
      } else if (isRightSwipe) {
        prev();
        setTouchStart(null);
      }
    },
  };

  return {
    currentIndex,
    next,
    prev,
    goTo,
    touchHandlers,
  };
}
