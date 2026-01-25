import { useEffect, useRef, useState } from "react";

export default function Carousel3D() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const count = 6;
  const radius = 200;

  const angleRef = useRef(0);        // current rotation
  const scrollDeltaRef = useRef(0);  // rotation delta from scroll

  // Initial card layout
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    Array.from(container.children).forEach((el, i) => {
      const itemAngle = (360 / count) * i;
      (el as HTMLElement).style.transform = `
        rotateX(${itemAngle}deg)
        translateZ(${radius}px)
        rotateX(${-itemAngle}deg)
      `;
    });
  }, []);

  // Scroll listener with instant snap
  useEffect(() => {
    let snapTimeout: number;

    const handleWheel = (e: WheelEvent) => {
      if (!isHovered) return;
      e.preventDefault(); // stop page scroll

      scrollDeltaRef.current += e.deltaY * 0.02; // rotation sensitivity

      // reset snap timer
      if (snapTimeout) clearTimeout(snapTimeout);
      snapTimeout = window.setTimeout(() => {
        const anglePerCard = 360 / count;
        const snappedAngle = Math.round(angleRef.current / anglePerCard) * anglePerCard;
        angleRef.current = snappedAngle;
        scrollDeltaRef.current = 0;
      }, 50); // 50ms after last scroll event
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (snapTimeout) clearTimeout(snapTimeout);
    };
  }, [isHovered]);

  // Animation loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame: number;

    const animate = () => {
      // Update rotation based on scroll delta
      if (Math.abs(scrollDeltaRef.current) > 0.001) {
        angleRef.current = (angleRef.current + scrollDeltaRef.current) % 360;

        // Apply transforms to cards
        Array.from(container.children).forEach((el, i) => {
          const itemAngle = (360 / count) * i + angleRef.current;
          (el as HTMLElement).style.transform = `
            rotateX(${itemAngle}deg)
            translateZ(${radius}px)
            rotateX(${-itemAngle}deg)
          `;
        });

        // Optionally decay scroll delta slightly for smoother feel
        scrollDeltaRef.current *= 0.95;
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="flex items-center justify-center h-[70vh]">
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="absolute w-[250px] h-[200px] top-[30%] left-1/2 -translate-x-1/2 transform-3d transform-[perspective(1000px)] border border-sakura"
      >
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-[#4753B1] rounded-lg flex flex-col justify-between p-3"
          >
            <span>**** **** **** 4321</span>            
          </div>
        ))}
      </div>
    </div>
  );
}
