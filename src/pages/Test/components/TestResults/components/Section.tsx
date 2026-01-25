import { useState } from "react";
import type { ResultSection } from '../TestResults';

export default function Section({section, isOpen=false, children}: {section: ResultSection, isOpen?: boolean, children: React.ReactNode}) {
    const [expanded, setExpanded] = useState<boolean>(isOpen);

    return (
        <li>
            <section className="relative flex flex-col gap-2">
                <span
                    onClick={() => setExpanded(prev => !prev)}
                    className="relative text-xl sm:text-3xl text-neutral-500 dark:text-neutral-400 font-semibold cursor-pointer">
                    {section}
                    <svg
                        style={{rotate: expanded ? '-90deg' : '90deg'}}
                        className="absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2
                        -rotate-90 transition-transform duration-200 fill-blue-600 dark:fill-blue-400 size-5" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m367.384-480 301.308 301.308q11.923 11.923 11.615 28.077-.308 16.153-12.231 28.076-11.922 11.923-28.076 11.923t-28.076-11.923L305.078-428.77q-10.847-10.846-16.077-24.307-5.231-13.462-5.231-26.923 0-13.461 5.231-26.923 5.23-13.461 16.077-24.307l306.846-306.846q11.922-11.923 28.384-11.616 16.461.308 28.384 12.231 11.923 11.923 11.923 28.076 0 16.154-11.923 28.077L367.384-480Z"/></svg>
                </span>
                <div className={`grid ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} transition-[grid-template-rows] duration-300`}>
                    <div className="overflow-hidden">
                        {children}
                    </div>
                </div>
            </section>
        </li>
    )
}