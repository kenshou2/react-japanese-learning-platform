import { type Dispatch, type SetStateAction } from "react";
import type { Section } from "../../../types/Article";
import useDeviceType from "../../../hooks/useDeviceType";
import Tooltip from "../../../shared/Tooltip";

interface TableOfContentsProps {
    contents: Section[] | null, 
    isError: boolean, 
    isLoading: boolean, 
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    currentSection: Section | null;    
}
export default function TableOfContents({
        contents, 
        isError, 
        isLoading, 
        isOpen, 
        setIsOpen, 
        currentSection,        
    }: TableOfContentsProps) {    
    const deviceType = useDeviceType();

    return (
        <aside
            aria-label="Article table of contents"
            className="sticky top-30 z-20 self-start text-sm outline-2 rounded-md outline-neutral-300 dark:outline-neutral-600">
            {isError
             ? <p className='text-neutral-400 p-2'>Couldn't load the article table of contents, please try again later.</p>
             : isLoading
              ? <div className="flex flex-col gap-3 rounded-xl p-2">
                    {[...Array(6)].map((_, i) => 
                        <div key={i} className="loading w-full h-5 rounded-md"></div>
                    )}
                </div>
              : <div className="relative">
                <div className={`${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} relative z-20 transition-opacity duration-150 ease-linear flex flex-col`}>
                    <div className="border-b-2 border-b-neutral-300 dark:border-b-neutral-600">
                        <div className="py-2 w-[250px] flex flex-col gap-1">
                            <button 
                                onClick={() => setIsOpen(prev => !prev)}
                                className="group relative self-end mx-2 hover:bg-neutral-300 hover:dark:bg-neutral-600 p-1 rounded-md cursor-pointer">                                
                                {deviceType === 'mouse' && <Tooltip>Close table of contents</Tooltip>}
                                <svg className="size-5 fill-txt-primary" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm120-80v-560H200v560h120Zm80 0h360v-560H400v560Zm-80 0H200h120Z"/></svg>
                            </button>                            
                        </div>
                    </div>
                    <div className="pb-3">
                        <p className="py-3 font-bold text-center whitespace-nowrap">Table of contents</p>
                        <ul>
                            {contents?.map(({id, text}) =>
                                <li key={id} className="px-5 w-[250px] mb-2 font-semibold">
                                    <a                                        
                                        href={`#${id}`}
                                        className={`${currentSection?.id === id ? 'text-btn-primary dark:text-sakura' : ''} py-[2px] w-full text-left cursor-pointer`}>
                                        {text}
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className={`${!isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-opacity duration-150 ease-linear z-10 absolute top-0 left-0`}>
                    <div className="p-2 flex flex-col items-center gap-1 border-b-2 border-b-neutral-300 dark:border-b-neutral-600">
                        <button
                            onClick={() => setIsOpen(prev => !prev)}
                            className="group relative hover:bg-neutral-300 hover:dark:bg-neutral-600 p-1 rounded-md cursor-pointer">
                            {deviceType === 'mouse' && <Tooltip>Open table of contents</Tooltip>}
                            <svg className="size-5 fill-txt-primary" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm120-80v-560H200v560h120Zm80 0h360v-560H400v560Zm-80 0H200h120Z"/></svg>
                        </button>                        
                    </div>
                    <div className="p-2 flex flex-col items-center">
                        <svg className="fill-txt-primary" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M320-280q17 0 28.5-11.5T360-320q0-17-11.5-28.5T320-360q-17 0-28.5 11.5T280-320q0 17 11.5 28.5T320-280Zm0-160q17 0 28.5-11.5T360-480q0-17-11.5-28.5T320-520q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440Zm0-160q17 0 28.5-11.5T360-640q0-17-11.5-28.5T320-680q-17 0-28.5 11.5T280-640q0 17 11.5 28.5T320-600Zm120 320h240v-80H440v80Zm0-160h240v-80H440v80Zm0-160h240v-80H440v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>
                    </div>
                </div>
            </div>
            }            
        </aside>
    )
}