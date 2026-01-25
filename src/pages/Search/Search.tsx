import SearchResults from "./components/SearchResults";
import SearchBar from "../../shared/SearchBar";
import Filter from "./components/Filter";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useEffect, useMemo, useState } from "react";
import { useAllCourseDetails } from "../../features/courseDetails/hooks/useCourseDetails";
import { useDecks } from "../../features/decks/hooks/useDecks";

export default function Search() {
    const isLargeScreen = useMediaQuery("(min-width: 1025px)");

    const [searchCategory, setSearchCategory] = useState<"courses" | "decks">("courses");
    const [searchBase, setSearchBase] = useState<any[]>([]);
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const { data: courses = [], isLoading: loadingCourses, isError: courseDetailsError } = useAllCourseDetails();
    const { data: decks = [], isLoading: loadingDecks, isError: decksError } = useDecks();

    const isLoading = loadingCourses || loadingDecks;
    
    const selectedData = useMemo(() => {
        return searchCategory === "courses" ? courses : decks;
    }, [searchCategory, courses, decks]);
    
    useEffect(() => {
        if (!isLoading && selectedData.length > 0) {
            setSearchBase(selectedData);
            setSearchResults(selectedData);
        }
    }, [isLoading, selectedData]);

    if (decksError || courseDetailsError)
        return (
            <div className="absolute inset-0 flex justify-center items-center">
                <h1 className="text-1xl font-semibold text-neutral-500 text-center">There was an error during loading of the search pages, please try again later.</h1>
            </div>
        )
    
    useEffect(() => {
        if (!isLoading && courses.length > 0) {
            setSearchBase(courses);
            setSearchResults(courses);
        }
    }, [isLoading, courses]);

    return (
        <div className="px-[5%] py-[5%]">
            <div className="flex flex-col gap-5 min-[1025px]:grid grid-cols-[1fr_3fr] gap-5">
                <div></div>
                <SearchBar
                    setSearchResults={(batch) => {
                        setSearchBase(batch);
                        setSearchResults(batch);
                    }}
                    data={courses}
                    isLoading={isLoading}
                />
                {isLargeScreen && 
                    <div className="self-start">
                        <Filter
                            data={searchBase}
                            setSearchResults={setSearchResults}
                            isLoading={isLoading}
                        />
                    </div>
                }
                <SearchResults
                    results={searchResults ?? []}
                    data={searchBase}
                    setSearchResults={setSearchResults}
                    setSearchCategory={setSearchCategory}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}