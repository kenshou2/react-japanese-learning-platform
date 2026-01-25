import { useRef, useState } from "react";
import Popup from "./Popup";

interface SelectFormProps {
    selectOptions: string[];
    current: string | null;
    setCurrent: React.Dispatch<React.SetStateAction<string | null>>;
    customStyles?: string | null;
}
export default function SelectForm({selectOptions, current, setCurrent, customStyles=null}: SelectFormProps) {
    const [selectOpen, setSelectOpen] = useState(false);

    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <div className={`${customStyles ?? ''} flex flex-col`}>
            <div className="relative">
                <button ref={buttonRef} type="button" onClick={() => setSelectOpen(!selectOpen)} className='w-full px-2 py-1 bg-neutral-300 dark:bg-neutral-600 rounded-md select-none cursor-pointer'>{current}</button>
                <Popup isOpen={selectOpen} onClose={() => setSelectOpen(false)} ignoreRef={buttonRef}>                    
                    <ul className='absolute top-full right-0 z-40 w-full flex flex-col px-1 py-1 mt-1 gap-1 bg-neutral-300 dark:bg-neutral-600 rounded-md'>
                        {selectOptions.map((option, i) =>
                            <li
                                key={i}
                                className={`${option === current ? 'bg-neutral-400 dark:bg-neutral-500' : ''} hover:bg-neutral-400 dark:hover:bg-neutral-500 rounded-md select-none`}
                                >                                
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrent(option);
                                        setSelectOpen(!selectOpen);
                                    }}
                                    className="w-full h-full px-2 py-1 text-left cursor-pointer">
                                    {option}
                                </button>                                
                            </li>
                        )
                        }
                    </ul>
                </Popup>
            </div>
        </div>
    )
}