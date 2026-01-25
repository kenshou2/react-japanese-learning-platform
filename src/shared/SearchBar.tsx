import { useEffect, useRef, useState } from "react";
import Popup from "./Popup";
import useSearch from "../hooks/useSearch";

interface SearchBarProps<T extends { name: string }> {
    setSearchResults: (result: T[]) => void;
    data: T[];
    isLoading: boolean;
    inputPlaceholder?: string;
}
export default function SearchBar<T extends { name: string }>({
        setSearchResults, 
        data,
        isLoading, 
        inputPlaceholder="Search...",
    }: SearchBarProps<T>) {
    const [searchInput, setSearchInput] = useState<string>('');
    const [searchResults, searchSuggestions] = useSearch(searchInput, data);
    const [suggestionsOpen, setSuggestionsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    function handleSearch() {
        if (searchInput === '') {
            setSearchResults(data);
            setSuggestionsOpen(false);
            return;
        }
        setSearchResults(searchResults);
        setSuggestionsOpen(false);
    }

    useEffect(() => {
        if (searchSuggestions.length !== 0)
            setSuggestionsOpen(true);
        else 
            setSuggestionsOpen(false);
    }, [searchSuggestions]);
    
    if (isLoading || !data)
        return <div className="loading w-full h-[35px] rounded-full"></div>        

    return (
        <div className="relative z-40 w-full bg-bg-secondary rounded-full">
            <button onClick={() => handleSearch()} type="button" aria-label='Search with current query'>
                <svg className='absolute z-30 top-1/2 left-2 -translate-y-1/2 fill-txt-primary size-6 cursor-pointer' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M378.087-314.5q-111.152 0-188.326-77.174Q112.587-468.848 112.587-580q0-111.152 77.174-188.326Q266.935-845.5 378.087-845.5q111.152 0 188.326 77.174Q643.587-691.152 643.587-580q0 44.478-13.522 83.12-13.521 38.641-36.565 68.163l222.087 222.326q12.674 12.913 12.674 31.945 0 19.033-12.913 31.707-12.674 12.674-31.826 12.674t-31.826-12.674L529.848-364.587q-29.761 23.044-68.642 36.565-38.88 13.522-83.119 13.522Zm0-91q72.848 0 123.674-50.826Q552.587-507.152 552.587-580q0-72.848-50.826-123.674Q450.935-754.5 378.087-754.5q-72.848 0-123.674 50.826Q203.587-652.848 203.587-580q0 72.848 50.826 123.674Q305.239-405.5 378.087-405.5Z"/></svg>
            </button>
            <input
                ref={inputRef}
                onChange={(e) => setSearchInput(e.target.value)}                
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearch()}}
                value={searchInput}
                type="search"
                name="search"
                id="search-input"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                className="relative z-20 w-full h-full pl-10 py-2 focus:outline-neutral-400 dark:focus:outline-neutral-600 focus:outline-2 rounded-full" 
                placeholder={inputPlaceholder}
                aria-label="Search vocabulary or course materials" />
            {searchInput !== '' &&
                <button onClick={() => setSearchInput('')} type="button" aria-label='Clear current query' className="absolute z-20 top-1/2 right-4 -translate-y-1/2 fill-txt-primary cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg"
                    className='size-5' height="24" viewBox="0 -960 960 960" width="24"><path d="M480-392 300-212q-18 18-44 18t-44-18q-18-18-18-44t18-44l180-180-180-180q-18-18-18-44t18-44q18-18 44-18t44 18l180 180 180-180q18-18 44-18t44 18q18 18 18 44t-18 44L568-480l180 180q18 18 18 44t-18 44q-18 18-44 18t-44-18L480-392Z"/></svg>
                </button>
            }
            <Popup isOpen={suggestionsOpen} onClose={() => setSuggestionsOpen(false)} ignoreRef={inputRef}>
                <ul className="absolute top-full left-0 right-0 flex flex-col gap-1 z-10 px-3 -mt-[15px] pb-3 bg-bg-secondary rounded-b-2xl">
                    <div className="max-h-[200px] overflow-y-auto mt-[25px]">
                        {searchSuggestions.map((suggestion, i) =>
                            <li
                                key={i}
                                onClick={() => {
                                    setSuggestionsOpen(false);
                                    setSearchInput(suggestion);                                    
                                    setSearchResults(searchResults);
                                }}
                                className="rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-700 px-3 py-2 cursor-pointer">
                                {suggestion}
                            </li>
                        )}
                    </div>
                </ul>                
            </Popup>
        </div>
    )
}