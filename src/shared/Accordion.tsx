import { useEffect, useState } from "react";
import type { AccordionContent } from "../types/AccordionContent";

export default function Accordion({items, fontScale="normal"}: {items: AccordionContent[], fontScale?: "large" | "normal" | "small"}) {
    const [content, setContent] = useState(items);

    useEffect(() => {
        setContent(items);
    }, [items]);
    
    let baseFontSize: number;
    if (fontScale === 'large')
        baseFontSize = 18;
    else if (fontScale === 'small')
        baseFontSize = 14;
    else
        baseFontSize = 16;

    const expandMobileMenuLink = (id: number) => {
        let found = false;

        setContent(prev =>
            prev.map(question => {
            if (question.id === id) {
                found = true;
                return { ...question, expanded: !question.expanded };
            }
            return question;
            })
        );

        if (!found) {
            throw new Error("No matching question number to expand FAQ menu");
        }
    };

    return (
        <>
            <ul className='text-2xl'>
                {content.map(item => (
                    <li key={item.id} onClick={() => expandMobileMenuLink(item.id)} className='flex gap-4 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32" className={`${item.expanded ? 'fill-accent' : 'fill-txt-secondary'} shrink-0 ${fontScale === 'small' ? 'size-5' : fontScale === 'large' ? 'size-7' : 'size-6'}`}><path d="M438.087-438.087V-320q0 17.813 12.05 29.863T480-278.087q17.813 0 29.863-12.05T521.913-320v-118.087H640q17.813 0 29.863-12.05T681.913-480q0-17.813-12.05-29.863T640-521.913H521.913V-640q0-17.813-12.05-29.863T480-681.913q-17.813 0-29.863 12.05T438.087-640v118.087H320q-17.813 0-29.863 12.05T278.087-480q0 17.813 12.05 29.863T320-438.087h118.087ZM480-71.869q-84.913 0-159.345-32.118t-129.491-87.177q-55.059-55.059-87.177-129.491Q71.869-395.087 71.869-480t32.118-159.345q32.118-74.432 87.177-129.491 55.059-55.059 129.491-87.177Q395.087-888.131 480-888.131t159.345 32.118q74.432 32.118 129.491 87.177 55.059 55.059 87.177 129.491Q888.131-564.913 888.131-480t-32.118 159.345q-32.118 74.432-87.177 129.491-55.059 55.059-129.491 87.177Q564.913-71.869 480-71.869Zm0-91.001q133.043 0 225.087-92.043Q797.13-346.957 797.13-480t-92.043-225.087Q613.043-797.13 480-797.13t-225.087 92.043Q162.87-613.043 162.87-480t92.043 225.087Q346.957-162.87 480-162.87ZM480-480Z"/></svg>
                        <div className="flex flex-col mb-3">
                            <h1 style={{fontSize: baseFontSize+2}} className={`${item.expanded ? 'text-accent' : ''}`}>{item.heading}</h1>
                            <div className={`${item.expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} grid transition-[grid-template-rows] duration-300`}>
                                <div className={`overflow-hidden ${item.expanded ? 'sm:mt-3' : ''} transition-[margin-top] duration-300 text-base md:text-xl text-neutral-800 dark:text-neutral-400`}>
                                    {Array.isArray(item.text)
                                        ? <ul className="list-disc list-inside">
                                            {item.text.map((text, i) =>
                                                <li key={i} style={{fontSize: baseFontSize}} className="py-1">
                                                    {text}
                                                </li>
                                            )}                                      
                                            </ul>
                                        : <p style={{fontSize: baseFontSize}} className="py-1">{item.text}</p>
                                    }                                
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}