import { useEffect, useRef } from "react";

export function useClickOutside<T extends HTMLElement>(
  onClickOutside: () => void,
  ignoreRef?: React.RefObject<HTMLElement>
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const popup = ref.current;
      const ignored = ignoreRef?.current;

      if (
        popup &&
        !popup.contains(event.target as Node) &&
        !(ignored && ignored.contains(event.target as Node))
      ) {
        onClickOutside();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClickOutside, ignoreRef]);

  return ref;
}
