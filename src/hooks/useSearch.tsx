import { useEffect, useState, useCallback, useMemo } from "react";
import debounce from "../utils/debounce";

export default function useSearch<T extends { name: string }>(
    query: string,
    items: T[] | undefined,
): [T[], string[]] {
    const [searchResults, setSearchResults] = useState<T[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    if (!items)
        return [[], []];

    const search = useCallback((q: string) => {
        const results = items.filter(item =>
            item.name.toLowerCase().includes(q.toLowerCase())
        );

        setSearchResults(results.length > 0 ? results : items);
        setSuggestions(results.map(r => r.name).slice(0, 5));
    }, [items]);

    const debouncedSearch = useMemo(
        () => debounce(search, 300),
        [search]
    );

    useEffect(() => {
        if (!query || items.length === 0) return;
        debouncedSearch(query);        
    }, [query, items]);    

    return [searchResults, suggestions];
}
