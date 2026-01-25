import { useClickOutside } from "../hooks/useClickOutside";

interface PopupProps<T extends HTMLElement = HTMLElement> {
  isOpen: boolean;
  onClose: () => void;
  ignoreRef?: React.RefObject<T | null>;
  children: React.ReactNode;
  customStyles?: string;
}

export default function Popup<T extends HTMLElement = HTMLElement>({
  isOpen,
  onClose,
  ignoreRef,
  children,
  customStyles,
}: PopupProps<T>) {
  const ref = useClickOutside<HTMLDivElement>(onClose, ignoreRef as React.RefObject<HTMLElement>);
  if (!isOpen) return null;

  return (
    <div ref={ref} className={`${customStyles ?? ""}`}>
      {children}
    </div>
  );
}