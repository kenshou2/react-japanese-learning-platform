import { useState, useRef, useLayoutEffect } from "react";

type Position = "top" | "right" | "bottom" | "left";

interface TooltipProps {
  children: React.ReactNode;
}

/* --- NOTE: APPLY 'group relative' ON THE PARENT ELEMENT --- */
export default function Tooltip({ children }: TooltipProps) {
  const [position, setPosition] = useState<Position>("top");
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!ref.current || !ref.current.parentElement) return;

    const parentRect = ref.current.parentElement.getBoundingClientRect();    
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Calculate available space around the parent
    const spaceTop = parentRect.top;
    const spaceBottom = vh - parentRect.bottom;
    const spaceLeft = parentRect.left;
    const spaceRight = vw - parentRect.right;

    let newPos: Position = "top";

    // Pick the position with the most space
    const space = [
      { pos: "top" as Position, amount: spaceTop },
      { pos: "bottom" as Position, amount: spaceBottom },
      { pos: "left" as Position, amount: spaceLeft },
      { pos: "right" as Position, amount: spaceRight },
    ];

    space.sort((a, b) => b.amount - a.amount);
    newPos = space[0].pos;

    setPosition(newPos);
  }, []); // run once on mount

  return (
    <span ref={ref} className={`tooltip tooltip-${position}`}>
      {children}
    </span>
  );
}