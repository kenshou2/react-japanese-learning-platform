import { useState } from "react";
import type { Article } from "../../../types/Article";

import { Link } from "react-router";

interface ArticleContentProps {
    article: Article | null;
    isLoading: boolean;
    isError: boolean;
}
export default function ArticleContent({
    article,
    isLoading,
    isError,
}: ArticleContentProps) {
    const [expandedImg, setExpandedImg] = useState<number | null>(null);

    if (isError) {
        return (
            <p className='text-xl text-center text-neutral-400'>Couldn't load the article contents, please try again later.</p>
        )
    }

    if (isLoading || !article) {
        return (
            <div className="flex flex-col items-center gap-3 rounded-xl">
                <div className="loading w-1/2 h-8 mb-3 rounded-md"></div>
                {[...Array(6)].map((_, i) => 
                    <div key={i} className="loading w-full h-5 rounded-md"></div>
                )}
            </div>
        )
    }    

    return (
        <article
            aria-label={`Article ${article.name}`}
            className="flex justify-center overflow-hidden">
            <div className="flex flex-col gap-5 max-w-[700px] xl:max-w-[800px]">
                <div className={`z-10 relative p-3 flex flex-col justify-between min-h-[170px]`}>
                    <h1 className="text-4xl font-bold text-neutral-100">{article.name}</h1>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-1 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
                            <span className="text-sm text-neutral-100 font-semibold">{article.timeToRead} mins</span>
                        </div>
                        <div className="flex gap-1">
                            {article.tags.map((tag, i) => <span key={i} className="px-[4px] py-[2px] text-[10px] text-neutral-800 font-semibold rounded-2xl bg-neutral-300">{tag}</span>)}
                        </div>
                    </div>
                    <img
                        className="absolute z-[-1] inset-0 w-full h-full object-cover brightness-40 rounded-xl"
                        src={article.posterUrl} 
                        alt="background image for the article"
                    />                    
                </div>
                {
                    article.content.map((contentEntry, i) => {
                        let result = null;                            
                        if (contentEntry.type === 'heading')
                            result = <h2 id={contentEntry.id} className="scroll-mt-24 text-2xl font-semibold text-neutral-500 dark:text-neutral-400">{contentEntry.text}</h2>
                        else if (contentEntry.type === 'paragraph')
                            result = <p>{contentEntry.text}</p>
                        else if (contentEntry.type === 'list')
                            result = (
                                <ul className="ml-5">
                                    {contentEntry.items.map((c, i) => <li key={i} className="list-disc mx-5 py-1">{c}</li>)}
                                </ul>
                            )
                        else if (contentEntry.type === 'image')
                            result = (
                                <div 
                                    onClick={() => {
                                        setExpandedImg(prev => prev === null ? i : null);
                                    }}
                                    className={`${expandedImg === i ? 'fixed z-20 inset-0 flex items-center justify-center p-[10%] bg-neutral-400/20 dark:bg-neutral-600/20 backdrop-blur-sm' : ''} mt-3 cursor-pointer`}>
                                    <div className={`${!expandedImg ? 'border-2' : ''} relative group rounded-xl p-2 border-txt-secondary`}>
                                        <img className={`relative ${expandedImg ? 'rounded-2xl' : 'rounded-md'}`} src={contentEntry.url} alt={contentEntry.alt ?? ''} />
                                        <svg className="absolute top-5 right-5 bg-gray-400/80 size-7 group-hover:bg-gray-600/80 fill-white rounded-md" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-120v-240h80v104l124-124 56 56-124 124h104v80H120Zm480 0v-80h104L580-324l56-56 124 124v-104h80v240H600ZM324-580 200-704v104h-80v-240h240v80H256l124 124-56 56Zm312 0-56-56 124-124H600v-80h240v240h-80v-104L636-580ZM480-400q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Z"/></svg>
                                    </div>
                                </div>
                            )
                        else if (contentEntry.type === 'note')
                            result = (
                                <div className="flex items-center gap-3 p-3 rounded-xl border-2 border-green-300 bg-green-200 text-neutral-900 dark:border-teal-700 dark:bg-teal-900 dark:text-neutral-100">
                                    <svg className="shrink-0 size-15 fill-yellow-500" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-200v-80h320v80H320Zm10-120q-69-41-109.5-110T180-580q0-125 87.5-212.5T480-880q125 0 212.5 87.5T780-580q0 81-40.5 150T630-320H330Zm24-80h252q45-32 69.5-79T700-580q0-92-64-156t-156-64q-92 0-156 64t-64 156q0 54 24.5 101t69.5 79Zm126 0Z"/></svg>
                                    <p>{contentEntry.text}</p>
                                </div>
                            )
                        else if (contentEntry.type === 'important')
                            result = (
                                <div className="flex items-center gap-3 p-3 rounded-xl border-2 border-blue-300 bg-blue-200 text-neutral-900">
                                    <svg className="fill-blue-200 flex-shrink-0 size-12 rounded-[50%] bg-neutral-800 p-1" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m382-388 321-321q19-19 45-19t45 19q19 19 19 45t-19 45L427-253q-19 19-45 19t-45-19L167-423q-19-19-19-45t19-45q19-19 45-19t45 19l125 125Z"/></svg>
                                    <p>{contentEntry.text}</p>
                                </div>
                            )
                        else if (contentEntry.type === 'reference')
                            result = (
                                <ul className="ml-5">
                                    {contentEntry.items.map(({name}, i) => <li key={i} className="list-disc mx-5 py-1 underline underline-offset-4 font-semibold"><Link to='/'>{name}</Link></li>)}
                                </ul>
                            )
                        return result;
                })}               
            </div>
        </article>
    )
}