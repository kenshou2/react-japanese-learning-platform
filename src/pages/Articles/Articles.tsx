import Slider from "../../shared/Slider";

import { useMediaQuery } from "../../hooks/useMediaQuery";
import SearchBar from "../../shared/SearchBar";
import { useEffect, useState } from "react";
import { useArticles } from "../../features/articles/hooks/useArticles";
import { Link } from "react-router";
import type { Article, ArticleTag } from "../../types/Article";

type SortOption = 'JLPT Preparation' | 'Vocabulary' | 'Grammar' | 'Culture' | 'All';
const SortOptions: SortOption[] = [
    'All',
    'JLPT Preparation',
    'Vocabulary', 
    'Grammar', 
    'Culture', 
];
const SortOptionsToTagsMap: Record<string, ArticleTag> = {
    'JLPT Preparation': 'JLPT',
    'Vocabulary': 'Vocabulary',
    'Grammar': 'Grammar',
    'Culture': 'Culture',
}

export default function Articles() {
    const {data: articles = [], isLoading, isError} = useArticles();    

    const [searchResults, setSearchResults] = useState<Article[]>([]);
    const [sortBy, setSortBy] = useState<SortOption>('All');
    const [viewBy, setViewBy] = useState<'grid' | 'list'>('grid');

    const isLargeScreen = useMediaQuery("(min-width: 1024px)");
    const isMiddleScreen = useMediaQuery("(min-width: 768px)");    

    if (isError)
        return (
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="font-semibold text-2xl text-center">
                    <h1>Couldn't load the course contents, please try again later.</h1>
                    <Link to='/' className="text-lg underline text-neutral-400">Contact support</Link>
                </div>
            </div>
        )

    useEffect(() => setSearchResults(articles), [articles]);    

    return (
        <div className="flex flex-col gap-10 items-center px-[10%] py-[5%]">
            <div className="flex flex-col items-center gap-7 w-[70vw]">
                <h1 className="text-4xl text-[#EBA400] dark:text-[#FFCE5D] font-bold">Best of the day</h1>
                <Slider itemsPerSlide={isLargeScreen ? 3 : isMiddleScreen ? 2 : 1} peek={0.15} isLoading={isLoading}>
                    {articles?.slice(0, 10).map(({id, name, timeToRead, tags, posterUrl}) => 
                        <Link to={`/articles/${id}`} key={id}>
                            <div className={`z-10 relative p-3 flex gap-2 flex-col justify-between h-[170px] bg-bg-primary`}>
                                <h1 className="text-lg font-bold text-neutral-100 max-h-full overflow-scroll">{name}</h1>
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-1 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
                                        <span className="text-sm text-neutral-100 font-semibold">{timeToRead} mins</span>
                                    </div>
                                    <div className="flex gap-1">
                                        {tags.map((tag, i) => <span key={i} className="px-[4px] py-[2px] text-[10px] text-neutral-800 font-semibold rounded-2xl bg-neutral-300">{tag}</span>)}
                                    </div>
                                </div>
                                <img
                                    className="absolute z-[-1] inset-0 w-full h-full object-cover brightness-40 rounded-xl"
                                    src={posterUrl}
                                    alt="background image for the article"
                                />
                            </div>
                        </Link>
                    )}
                </Slider>
            </div>
            <div className="flex flex-col items-center gap-3 w-full">
                <div className="w-full max-w-[600px]">
                    <SearchBar setSearchResults={setSearchResults} data={articles} isLoading={isLoading} />
                </div>
                <div className="flex gap-5 justify-center items-center w-full max-w-[800px]">
                    <div className="flex justify-center gap-2 flex-wrap">
                        {SortOptions.map((option, i) => 
                            <span 
                                key={i}
                                onClick={() => setSortBy(option)}
                                className={`${option === sortBy ? 'bg-sakura text-neutral-100 border-transparent' : 'border-neutral-800 dark:border-neutral-600'} border-[1.5px] rounded-lg text-sm px-[6px] py-[3px] cursor-pointer`}>{option}                                
                            </span>
                        )}
                    </div>
                    <div className="flex items-center">
                        <svg
                            onClick={() => setViewBy('list')} 
                            className={`${viewBy === 'list' ? 'bg-neutral-300 dark:bg-neutral-700' : ''} p-1 border-y-[1.5px] border-l-[1.5px] rounded-[6px_0_0_6px] border-neutral-800 dark:border-neutral-600 fill-txt-primary shrink-0 size-7 cursor-pointer`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M360-240h440v-107H360v107ZM160-613h120v-107H160v107Zm0 187h120v-107H160v107Zm0 186h120v-107H160v107Zm200-186h440v-107H360v107Zm0-187h440v-107H360v107ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Z"/>
                        </svg>
                        <svg
                            onClick={() => setViewBy('grid')} 
                            className={`${viewBy === 'grid' ? 'bg-neutral-300 dark:bg-neutral-700' : ''} p-1 border-y-[1.5px] border-r-[1.5px] border-l-[1.5px] rounded-[0_6px_6px_0] border-neutral-800 dark:border-neutral-600 fill-txt-primary shrink-0 size-7 cursor-pointer`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Zm0 240Zm-240 0Zm0-240Z"/>
                        </svg>
                    </div>
                </div>
                <div className={`${viewBy === 'grid' ? 'grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(175px,1fr))]' : 'flex flex-col'} w-full gap-3`}>
                    {isLoading
                     ? [...Array(5)].map((_, i) => <div key={i} className="loading aspect-square rounded-xl"></div>)
                     : searchResults
                        .filter((result) => {
                            if (sortBy === 'All')
                                return result;
                            else return result.tags.includes(SortOptionsToTagsMap[sortBy]);
                        })
                        .map(({id, name, overview, timeToRead, tags, posterUrl}) =>
                        <Link to={`/articles/${id}`}>
                            <div key={id} className={`${viewBy === 'grid' ? 'aspect-square h-full' : 'border-2 border-neutral-400 rounded-xl'} z-10 relative p-3 flex flex-col justify-between gap-3 bg-bg-primary`}>
                                <div className="max-h-full overflow-scroll">
                                    <h1 className={`${viewBy === 'grid' ? 'text-neutral-100' : 'text-neutral-600 dark:text-neutral-400'} text-xl font-bold`}>{name}</h1>
                                    {(viewBy === 'list' && overview) && <p className="max-h-[100px] overflow-scroll">{overview}</p>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-1 items-center">
                                        <svg className={`${viewBy === 'grid' ? 'fill-neutral-100' : 'fill-neutral-600 dark:fill-neutral-400'}`} xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
                                        <span className={`${viewBy === 'grid' ? 'text-neutral-100' : 'text-neutral-600 dark:text-neutral-400'} text-sm text-neutral-100 font-semibold`}>{timeToRead} mins</span>
                                    </div>
                                    <div className="flex gap-1">
                                        {tags.map((tag, i) => <span key={i} className="px-[4px] py-[2px] text-[10px] text-neutral-800 font-semibold rounded-2xl bg-neutral-300">{tag}</span>)}
                                    </div>
                                </div>
                                {viewBy === 'grid' &&
                                    <img
                                        className="absolute z-[-1] inset-0 w-full h-full object-cover brightness-40 rounded-xl"
                                        src={posterUrl}
                                        alt="background image for the article"
                                    />
                                }
                            </div>
                        </Link>                     
                    )}
                </div>
            </div>
        </div>
    )
}