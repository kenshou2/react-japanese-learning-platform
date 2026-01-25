import { useRef } from "react";

type SwipeDirection = "left" | "right" | "up" | "down" | null;

interface SwipeHandlers {
  onSwipe: (direction: SwipeDirection) => void;
  threshold?: number; // minimum px to count as swipe
}

export function useSwipe({ onSwipe, threshold = 50 }: SwipeHandlers) {
  const startX = useRef(0);
  const startY = useRef(0);

  function handleTouchStart(e: React.TouchEvent) {
    const touch = e.touches[0];
    startX.current = touch.clientX;
    startY.current = touch.clientY;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const touch = e.changedTouches[0];
    const dx = touch.clientX - startX.current;
    const dy = touch.clientY - startY.current;

    if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return;

    if (Math.abs(dx) > Math.abs(dy)) {
      onSwipe(dx > 0 ? "right" : "left");
    } else {
      onSwipe(dy > 0 ? "down" : "up");
    }
  }

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  };
}
