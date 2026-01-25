import { useState, useContext, createContext, type ReactNode } from 'react';

interface ActiveUserContextType {
  activeUserId: number;
  setActiveUserId: React.Dispatch<React.SetStateAction<number>>;
}

const ActiveUserContext = createContext<ActiveUserContextType | undefined>(undefined);

export function ActiveUserProvider({ children }: { children: ReactNode }) {
  const [activeUserId, setActiveUserId] = useState<number>(1); // TODO: Add real authenticaiton logic

  return <ActiveUserContext.Provider value={{ activeUserId, setActiveUserId }}>{children}</ActiveUserContext.Provider>;
}

export function useActiveUser() {
  const context = useContext(ActiveUserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
}