import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { useMediaQuery } from "../../../hooks/useMediaQuery";

import CtaButton from "../../../shared/CtaButton";
import Filter from './Filter';

import Popup from '../../../shared/Popup';
import { useActiveUser } from '../../../context/ActiveUserContext';
import { useCreateUserDeck } from '../../../features/userDecks/hooks/useUserDecks';
import { useNotification } from '../../../context/NotificationContext';

type SortOption = 'Rating' | 'Newest' | 'Oldest';
const SORTING_OPTIONS: SortOption[] = [
    'Rating',
    'Newest',
    'Oldest',
];

interface SearchResultsProps {
    results: any[];
    setSearchResults: (result: any[]) => void;
    setSearchCategory: Dispatch<SetStateAction<"courses" | "decks">>;
    isLoading: boolean;
    data: any[];
}
export default function SearchResults({ results, data, isLoading, setSearchResults, setSearchCategory }: SearchResultsProps) {
    const [searchBy, setSearchBy] = useState<'courses' | 'decks'>('courses');
    const [sortOpen, setSortOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>('Rating');
    const isLargeScreen = useMediaQuery("(min-width: 1025px)");
    const { activeUserId: uid } = useActiveUser();
    const notify = useNotification();
    const addDeck = useCreateUserDeck();

    const sortButtonRef = useRef<HTMLButtonElement | null>(null);

    if (filterOpen) { // If filter menu is open, prevent scrolling
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }

    useEffect(() => {
        sortResults(sortBy);
    }, [sortBy]);

    function sortResults(sortOption: SortOption) {
        const sorted = [...results];

        sorted.sort((a, b) => {
            switch (sortOption) {

                case 'Newest':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

                case 'Oldest':
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();

                case 'Rating':
                    return b.rating - a.rating;

                default:
                    return 0;
            }
        });

        setSearchResults(sorted);
    }


    return (
        <div className="flex flex-col gap-5">
            <div className="relative flex justify-between items-center">
                <div className='flex gap-2'>
                    <button
                        onClick={() => {
                            setSearchBy('courses');
                            setSearchCategory('courses');
                        }}
                        className={`${searchBy === 'courses' ? 'border-transparent bg-sakura text-[#F4F4F4]' : 'border-neutral-400'} px-3 py-1 font-bold rounded-md border-[2px] cursor-pointer text-sm`}>Courses
                    </button>
                    <button
                        onClick={() => {
                            setSearchBy('decks');
                            setSearchCategory('decks');
                        }}
                        className={`${searchBy === 'decks' ? 'border-transparent bg-sakura text-[#F4F4F4]' : 'border-neutral-400'} px-3 py-1 font-bold rounded-md border-[2px] cursor-pointer text-sm`}>Decks
                    </button>
                </div>
                <div className='relative flex gap-2 items-center'>
                    {!isLargeScreen &&
                        <div className='flex items-center'>
                            <button onClick={() => setFilterOpen(!filterOpen)}>
                                <svg className="fill-txt-secondary cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z"/></svg>
                            </button>
                            <Popup isOpen={filterOpen} onClose={() => setFilterOpen(false)}>
                                <Filter data={data} isLoading={isLoading} setSearchResults={setSearchResults} filterOpen={filterOpen} handleOpen={setFilterOpen}/>
                            </Popup>
                        </div>
                    }
                    <svg 
                        onClick={() => setSortOpen(!sortOpen)}
                        onKeyDown={(e) => {if (e.key === 'Enter') setSortOpen(!sortOpen)}}
                        tabIndex={0} 
                        className="fill-txt-secondary cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z"/></svg>
                    {isLargeScreen && <span>Sorted by:</span>}
                    <div className='flex flex-col'>
                        {isLargeScreen && <button ref={sortButtonRef} onClick={() => setSortOpen(!sortOpen)} className='px-2 py-1 bg-neutral-300 dark:bg-neutral-600 rounded-md select-none cursor-pointer'>{sortBy}</button>}                    
                        <Popup isOpen={sortOpen} onClose={() => setSortOpen(false)} ignoreRef={sortButtonRef}>
                            <ul className='absolute flex flex-col px-1 py-1 mt-1 gap-1 top-full right-0 z-40 bg-neutral-300 dark:bg-neutral-600 rounded-md'>
                                {SORTING_OPTIONS.map((sortOption, i) =>
                                    <li key={i} className={`${sortOption === sortBy ? 'bg-neutral-400 dark:bg-neutral-500' : ''} hover:bg-neutral-400 dark:hover:bg-neutral-500 rounded-md select-none`}>
                                        <button
                                            onClick={() => {
                                                setSortBy(sortOption);
                                                setSortOpen(!sortOpen);                                                
                                            }}
                                            className='px-2 py-1 cursor-pointer'>
                                            {sortOption}
                                        </button>
                                    </li>
                                )
                                }
                            </ul>
                        </Popup>                    
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
                {isLoading
                 ? [...Array(3)].map((_, i) => <div key={i} className='loading ratio-1/1 h-[250px] rounded-xl'></div>)
                 : (results.length ? results : []).map(({id, name, shortDescription, rating, tags, posterUrl}) =>
                        <div key={id} className="relative px-4 pt-3 pb-[60px] flex flex-col h-[250px] overflow-y-scroll rounded-xl text-left text-[#F4F4F4] ratio-1/1 shadow-lg/20 dark:shadow-lg/40 dark:shadow-neutral-500">
                            {posterUrl && <img src={posterUrl} alt="" className='absolute inset-0 w-full h-full object-cover object-center brightness-50 z-[-1]' />}
                            <div className="flex flex-col gap-1 h-full">
                                <h3 className='font-bold'>{name}</h3>
                                <p className="text-sm text-neutral-300 overflow-y-scroll">{shortDescription.length < 120 ? shortDescription : shortDescription.slice(0, 120) + "..."}</p>
                                <div className='mt-auto mb-2 flex'>
                                    {[...Array(5)].map((_, i) => 
                                        i < rating                                                
                                            ? <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="#F3C63F" height="24" viewBox="0 -960 960 960" width="24"><path d="m480-292.463-155.615 93.845q-8.692 5.077-17.422 4.27-8.731-.808-15.808-5.885-7.076-5.077-10.922-13.269-3.847-8.192-1.231-18.115l41.307-176.691-137.384-118.923q-7.692-6.692-9.807-15.499-2.115-8.808 1.115-17.115 3.231-8.308 9.308-13.577t16.615-6.884l181.307-15.846 70.384-166.846q3.846-9.307 11.653-13.769 7.808-4.461 16.5-4.461t16.5 4.461q7.807 4.462 11.653 13.769l70.384 166.846 181.307 15.846q10.538 1.615 16.615 6.884 6.077 5.269 9.308 13.577 3.23 8.307 1.115 17.115-2.115 8.807-9.807 15.499L639.691-408.308l41.307 176.691q2.616 9.923-1.231 18.115-3.846 8.192-10.922 13.269-7.077 5.077-15.808 5.885-8.73.807-17.422-4.27L480-292.463Z"/></svg>
                                            : <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="#F3C63F" height="24" viewBox="0 -960 960 960" width="24"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143Zm126-5.463-155.615 93.845q-8.692 5.077-17.422 4.27-8.731-.808-15.808-5.885-7.076-5.077-10.922-13.269-3.847-8.192-1.231-18.115l41.307-176.691-137.384-118.923q-7.692-6.692-9.807-15.499-2.115-8.808 1.115-17.115 3.231-8.308 9.308-13.577t16.615-6.884l181.307-15.846 70.384-166.846q3.846-9.307 11.653-13.769 7.808-4.461 16.5-4.461t16.5 4.461q7.807 4.462 11.653 13.769l70.384 166.846 181.307 15.846q10.538 1.615 16.615 6.884 6.077 5.269 9.308 13.577 3.23 8.307 1.115 17.115-2.115 8.807-9.807 15.499L639.691-408.308l41.307 176.691q2.616 9.923-1.231 18.115-3.846 8.192-10.922 13.269-7.077 5.077-15.808 5.885-8.73.807-17.422-4.27L480-292.463ZM480-470Z"/></svg>                                            
                                    )}
                                </div>
                            </div>
                            <div className="absolute left-0 bottom-0 right-0 flex items-center justify-between py-3 px-2 bg-[#F4F4F4] h-[60px] overflow-y-scroll">                                    
                                <div className="flex-1 flex flex-wrap gap-1 items-start h-full overflow-y-scroll">
                                    {(tags as string[]).map((tag, i) => 
                                        <span key={i} className="px-[5px] py-[3px] bg-bg-soft text-[8px] text-neutral-600 rounded-2xl">{tag}</span> // TODO add shadow on overflow
                                    )}
                                </div>
                                <div className="flex-1 flex justify-end">                                    
                                    {searchBy === 'courses'
                                     ? <CtaButton url={`/course-details/${id}`} borderRadius="10">Details</CtaButton>
                                     : <CtaButton onClick={() => {
                                                addDeck.mutate({userId: uid, deckId: id});
                                                notify('Added to your library');
                                            }} 
                                            borderRadius="10">
                                            Add
                                        </CtaButton>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }                
            </div>            
        </div>
    )
}