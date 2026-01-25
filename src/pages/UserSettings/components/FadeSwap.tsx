import { useEffect, useState } from "react";

export function FadeSwap({ children, triggerKey }: { children: React.ReactNode; triggerKey: any }) {
  const [displayed, setDisplayed] = useState(children);
  const [fadeState, setFadeState] = useState<"fade-in" | "fade-out">("fade-in");

  useEffect(() => {
    setFadeState("fade-out");
    const timeout = setTimeout(() => {
      setDisplayed(children);
      setFadeState("fade-in");
    }, 120);

    return () => clearTimeout(timeout);
  }, [triggerKey, children]);

  return (
    <div
      className={`transition-opacity duration-120 ease-in-out ${
        fadeState === "fade-in" ? "opacity-100" : "opacity-0"
      }`}
    >
      {displayed}
    </div>
  );
}
