import SearchBar from "../../shared/SearchBar";
import applyFurigana from "../../utils/applyFurigana";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useDictionary } from "../../features/dictionary/hooks/useDictionary";
import { useEffect, useRef, useState } from "react";

export default function Dictionary() {
    const { data: dictionary, isLoading, isError } = useDictionary();
    const [dictionaryEntries, setDictionaryEntries] = useState(dictionary);
    const isLargeScreen = useMediaQuery('(min-width: 640px)');
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => setDictionaryEntries(dictionary), [dictionary]);

    const playAudio = (src?: string) => {
        if (src && audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.src = src;
            audioRef.current.play();
        }
    };

    if (isError)
        return <h1>Couldn't load the dictionary. Please try again later.</h1>
    
    return (
        <div className="px-[10%] sm:px-[5%] py-10 sm:py-[5%] flex justify-center gap-10">
            <div className="flex flex-col items-center gap-5">
                <div className="w-full">
                    {(isLoading || !dictionary)
                     ? <div className="loading w-full rounded-full h-[35px]"></div>
                     : <SearchBar setSearchResults={setDictionaryEntries} data={dictionary} isLoading={isLoading} inputPlaceholder="Search by kanji..." />
                    }                    
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col md:grid grid-cols-3 gap-5 max-w-[800px]">
                        <h2 className="hidden sm:block col-span-2 font-semibold text-2xl">Words</h2>
                        <h2 className="hidden sm:block font-semibold text-2xl">Example sentences</h2>
                        <audio ref={audioRef} />
                        {dictionaryEntries?.map(({id, word, translations, kana, partOfSpeech, examples, audio}) =>
                            {
                                const entry = 
                                <>
                                    <h3 key={id} className="text-5xl font-semibold text-neutral-600 dark:text-neutral-400">
                                        <span className="relative">
                                            {applyFurigana(word)}
                                            <svg 
                                                onClick={() => playAudio(audio)}
                                                className="absolute top-1/2 right-[calc(100%+10px)] -translate-y-1/2 fill-btn-primary dark:fill-sakura size-7 cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M753.846-481q0-82.497-44.209-150.582T591.076-733.461q-11.538-5.462-16.999-16.308-5.462-10.846-1.336-22.123 4.951-12.03 17.182-16.722 12.23-4.692 24.768.769 90.461 41.077 144.807 123.6 54.346 82.524 54.346 183.23 0 100.707-54.346 183.245-54.346 82.538-144.807 123.615-12.538 5.461-24.768.769-12.231-4.692-17.182-16.722-4.126-11.277 1.336-22.123 5.461-10.846 16.999-16.308 74.352-33.794 118.561-101.879Q753.846-398.503 753.846-481Zm-459.23 100.999H182.309q-15.365 0-25.759-10.395-10.394-10.394-10.394-25.759v-127.69q0-15.365 10.394-25.759 10.394-10.395 25.759-10.395h112.307L414.308-699.69q14.384-14.384 33.114-6.493 18.731 7.892 18.731 28.185v395.996q0 20.293-18.731 28.185-18.73 7.891-33.114-6.493L294.616-380.001Zm351.537-99.955q0 37.427-15.538 70.845-15.539 33.418-41.885 56.187-8.499 5.692-17.845 1.154-9.346-4.539-9.346-15v-228.46q0-10.461 9.346-15 9.346-4.538 17.845 1.09 26.346 23.449 41.885 57.602 15.538 34.154 15.538 71.582ZM406.154-606l-86 86h-114v80h114l86 86v-252Zm-100 126Z"/></svg>
                                        </span>
                                    </h3>
                                    <div className="flex flex-col gap-3">
                                        <ul className="list-decimal ml-4">
                                            {translations.map((translation, i) =>
                                                <li key={i}>{translation}</li>
                                            )}
                                        </ul>
                                        <div className="flex gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                                            <div>[{kana}]</div>
                                            <div>{partOfSpeech}</div>
                                        </div>
                                    </div>                                
                                    <ul className="list-decimal ml-4">
                                        {examples.map(({example, translation}, i) =>
                                            <li key={i}>
                                                <div>{applyFurigana(example)}</div>
                                                <div className="text-sm text-neutral-600 dark:text-neutral-400">{translation}</div>
                                            </li>
                                        )}
                                    </ul>
                                </>
                                if (isLargeScreen) return <>{entry}</>
                                else return <div className="flex flex-col gap-5 border-b-2 border-b-neutral-300 dark:border-b-neutral-600 pb-5">{entry}</div>
                            }                           
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}