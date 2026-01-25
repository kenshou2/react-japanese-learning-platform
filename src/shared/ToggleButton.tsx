interface ToggleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    state: boolean;
    onToggle: () => void;
}
export default function ToggleButton({state, onToggle}: ToggleButtonProps) {
    return (
        <div 
            onClick={() => onToggle()}
            className={`
                ${state ? 'bg-btn-primary dark:bg-sakura' : 'bg-neutral-400 dark:bg-neutral-600'}
                w-10 h-6 shrink-0 rounded-[100px] transition-[background] duration-300 p-[2px]`}>
            <div 
            className={`
                ${state ? 'ml-4 bg-neutral-100' : 'bg-neutral-200 dark:bg-neutral-400'}
                size-5 rounded-[100px] transition-[margin] duration-200`}>            
            </div>
        </div>
    )
}