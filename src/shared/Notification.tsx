
export default function Notification({message}: {message: string}) {

    return (
        <div className="animate-notification-slide fixed gap-8 p-2 z-20 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 min-w-[300px] bg-btn-primary dark:bg-sakura rounded-xl">            
            <p className="text-neutral-100 text-xl text-center font-bold">{message}</p>
        </div>
    )
}