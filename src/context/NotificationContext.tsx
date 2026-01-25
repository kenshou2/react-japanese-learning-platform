import { createContext, useContext, useState, type ReactNode } from "react";
import Notification from '../shared/Notification';

type NotificationContextType = {
    notify: (msg: string) => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [message, setMessage] = useState<string | null>(null);

    const notify = (msg: string) => {
        setMessage(msg);
        setTimeout(() => setMessage(null), 2000);
    };

    return (
        <NotificationContext.Provider value={{ notify }}>
            {children}
            {message && <Notification message={message} />}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const ctx = useContext(NotificationContext);
    if (!ctx) throw new Error("useNotification must be used inside <NotificationProvider>");
    return ctx.notify;
}
