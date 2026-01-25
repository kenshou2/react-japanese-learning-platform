import { useRef, useState } from 'react';
import SearchBar from '../../../../../shared/SearchBar';
import { type LessonVocabulary } from '../../../../../types/Course';
import applyFurigana from '../../../../../utils/applyFurigana';
import type { DictionaryEntry } from '../../../../../types/DictionaryEntry';

interface LessonVocabularyProps {
    vocabulary: DictionaryEntry[] | undefined;
    isLoading: boolean;
    isError: boolean;
}
export default function LessonVocabulary({vocabulary, isLoading, isError}: LessonVocabularyProps) {
    const [lessonVocabulary, setLessonVocabulary] = useState(vocabulary);
    const audioRef = useRef<HTMLAudioElement>(null);
    
    const playAudio = (src?: string) => {
        if (src && audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.src = src;
            audioRef.current.play();
        }
    };
    
    return (
        <div className="absolute z-40 left-[calc(100%+20px)] top-0 sm:min-w-[400px] max-h-[30vh] flex flex-col gap-3 px-3 py-2 text-base bg-bg-primary dark:bg-neutral-800 shadow-lg/30 dark:shadow-none dark:border-2 dark:border-neutral-600 rounded-lg">
            {vocabulary &&
            <div>
                <SearchBar setSearchResults={setLessonVocabulary} data={vocabulary} isLoading={isLoading} />
            </div>
            }
            {isError
             ? <div className='h-full w-full flex items-center justify-center text-center text-neutral-400'>Couldn't load lesson vocabulary</div>
             : (isLoading || !vocabulary)
                ? <div className="border-1 border-neutral-400 dark:border-neutral-600 flex flex-col gap-3 rounded-xl px-4 py-3">
                    {[...Array(3)].map((_, i) => 
                        <div key={i} className="loading w-full h-5 rounded-md"></div>
                    )}
                </div>
                : <div className="overflow-y-auto grid grid-cols-[auto_auto_auto] *:min-w-[80px] break-all">                
                    <audio ref={audioRef} />
                    {lessonVocabulary?.map(({word, kana, translations, audio}) =>
                        <>
                            <div className="flex items-center w-full h-full gap-2 py-1 border-b-2 border-neutral-300 dark:border-neutral-600">
                                <button onClick={() => playAudio(audio)} className="cursor-pointer">
                                    <svg className="fill-sakura" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M753.846-481q0-82.497-44.209-150.582T591.076-733.461q-11.538-5.462-16.999-16.308-5.462-10.846-1.336-22.123 4.951-12.03 17.182-16.722 12.23-4.692 24.768.769 90.461 41.077 144.807 123.6 54.346 82.524 54.346 183.23 0 100.707-54.346 183.245-54.346 82.538-144.807 123.615-12.538 5.461-24.768.769-12.231-4.692-17.182-16.722-4.126-11.277 1.336-22.123 5.461-10.846 16.999-16.308 74.352-33.794 118.561-101.879Q753.846-398.503 753.846-481Zm-459.23 100.999H182.309q-15.365 0-25.759-10.395-10.394-10.394-10.394-25.759v-127.69q0-15.365 10.394-25.759 10.394-10.395 25.759-10.395h112.307L414.308-699.69q14.384-14.384 33.114-6.493 18.731 7.892 18.731 28.185v395.996q0 20.293-18.731 28.185-18.73 7.891-33.114-6.493L294.616-380.001Zm351.537-99.955q0 37.427-15.538 70.845-15.539 33.418-41.885 56.187-8.499 5.692-17.845 1.154-9.346-4.539-9.346-15v-228.46q0-10.461 9.346-15 9.346-4.538 17.845 1.09 26.346 23.449 41.885 57.602 15.538 34.154 15.538 71.582ZM406.154-606l-86 86h-114v80h114l86 86v-252Zm-100 126Z"/></svg>
                                </button>
                                <span>
                                    {applyFurigana(word)}
                                </span>
                            </div>
                            <div className="flex items-center self-center h-full w-full px-2 sm:px-10 py-1 border-b-2 border-neutral-300 dark:border-neutral-600">
                                {kana ? kana : <span></span>}
                            </div>
                            <div className="flex items-center justify-end h-full w-full py-1 text-right border-b-2 border-neutral-300 dark:border-neutral-600">
                                {translations.join(', ')}
                            </div>
                        </>
                    )}
                </div>
            }            
        </div>
    )
}