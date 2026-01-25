import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { Link } from "react-router";

import LessonVocabulary from './components/LessonVocabulary';
import SentenceAnalysis from './components/SentenceAnalysis';
import Tooltip from '../../../../shared/Tooltip';
import useDeviceType from '../../../../hooks/useDeviceType';

import { type Module, type Lesson} from '../../../../types/Course';
import { type Menu } from '../../Course';

import Popup from '../../../../shared/Popup';
import { useLessonVocabulary } from '../../../../features/lessons/hooks/useLessons';
import { useGetUserProgress, useUpdateUserProgress } from '../../../../features/users/hooks/useUser';
import { useActiveUser } from '../../../../context/ActiveUserContext';

interface CurriculumProps {
    modules: Module[] | null;
    lessons: Lesson[] | null;
    currentLesson: Lesson | null;
    currentCourseId: number;
    currentModuleId: number;
    currentLessonId: number;
    setLesson: Dispatch<SetStateAction<Lesson | null | undefined>>;
    setMenus: (menu: Menu) => void;    
    isOpen: boolean;
    isLoading: boolean;
    isError: boolean;
    vocabularyOpen: boolean;
    sentenceAnalysisOpen: boolean;
    smallScreen: boolean;
}
export default function Curriculum({
        modules,
        lessons,
        currentLesson,
        currentCourseId,
        currentModuleId,
        currentLessonId,
        setLesson,
        isOpen, 
        isLoading,
        isError,
        setMenus,                 
        vocabularyOpen,
        sentenceAnalysisOpen,
        smallScreen,
    }: CurriculumProps) {
    const {data: vocabulary, isLoading: isVocabularyLoading, isError: isVocabularyError} = useLessonVocabulary(currentLesson?.id ?? null);    
    const {activeUserId: uid} = useActiveUser();
    const updateProgress = useUpdateUserProgress();
    const {data: progress} = useGetUserProgress(uid);

    const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set([currentModuleId]));
    const deviceType = useDeviceType();

    const vocabularyButtonRef = useRef<HTMLButtonElement>(null);
    const sentenceAnalysisButtonRef = useRef<HTMLButtonElement>(null);
    const shrinkedVocabularyButtonRef = useRef<HTMLButtonElement>(null);
    const shrinkedSentenceAnalysisButtonRef = useRef<HTMLButtonElement>(null);

    function toggleModule(id: number) {        
        setExpandedModules(prev => {
            const newSet = new Set(prev);
            if (prev.has(id)) {
                newSet.delete(id);
                return newSet;
            } else
                return newSet.add(id);
        })
    }

    useEffect(() => {        
        if (!progress)
            return;

        const activeLessonIndex = lessons?.findIndex(l => l.id === currentLesson?.id);
        let newProgress = null;
        if (activeLessonIndex && activeLessonIndex !== -1 && lessons)
            newProgress = (activeLessonIndex + 1) / (lessons.length) * 100;
        else
            newProgress = 0;
        
        let newCourseCheckpoints = progress.courseProgress.map(cC => {            
            if (cC.courseId === currentCourseId)
                return {
                    ...cC,
                    checkpoint: {
                        moduleId: currentModuleId,
                        lessonId: currentLessonId,
                    },
                    currentHours: cC.currentHours + 1,
                    currentProgress: newProgress,
                }
                else return cC;
        });
        updateProgress.mutate({id: uid, updates: {
            ...progress,
            courseProgress: newCourseCheckpoints,
        }});        
    }, [currentCourseId, currentModuleId, currentLessonId]);

    function highlightStyle(id: number) {
        if (id === currentLesson?.moduleId)
            return 'text-btn-primary dark:text-sakura';
        if (expandedModules.has(id))
            return 'text-slate-700 dark:text-neutral-400';
    }

    return (
        <aside
            aria-label="Course curriculum"
            className="sticky top-30 z-20 self-start text-sm outline-2 rounded-md outline-neutral-300 dark:outline-neutral-600">
            {isError
             ? <p className='text-neutral-400 p-2'>Couldn't load the course curriculum, please try again later.</p>
             : isLoading
              ? <div className="flex flex-col gap-3 rounded-xl p-2">
                    {[...Array(6)].map((_, i) => 
                        <div key={i} className="loading w-full h-5 rounded-md"></div>
                    )}
                </div>
              : <div className="relative">
                <div className={`${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} relative z-20 transition-opacity duration-150 ease-linear flex flex-col`}>
                    <div className="border-b-2 border-b-neutral-300 dark:border-b-neutral-600">
                        <div className="py-2 w-[250px] flex flex-col gap-1">
                            <button 
                                onClick={() => setMenus('curriculum')}
                                className="group relative self-end mx-2 hover:bg-neutral-300 hover:dark:bg-neutral-600 p-1 rounded-md cursor-pointer">                                
                                {deviceType === 'mouse' && <Tooltip>Close curriculum</Tooltip>}
                                <svg className="size-5 fill-txt-primary" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm120-80v-560H200v560h120Zm80 0h360v-560H400v560Zm-80 0H200h120Z"/></svg>
                            </button>
                            <div className="px-2 relative">
                                <button
                                    ref={vocabularyButtonRef} 
                                    onClick={() => setMenus('vocabulary')}
                                    className="w-full flex gap-3 items-center hover:bg-neutral-300 hover:dark:bg-neutral-600 p-1 rounded-md cursor-pointer">
                                    <svg className="size-5 shrink-0 fill-txt-primary" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M228.385-457.385H337.77l19 52.616q2 5.23 6.23 8.153 4.231 2.923 10.077 2.923 9.462 0 14.808-7.653 5.346-7.654 2.115-16.5l-81.231-214.846q-2-5.615-7.115-9.231-5.115-3.615-11.346-3.615h-14.462q-6.23 0-11.346 3.615-5.115 3.616-7.115 9.231l-81.231 215.231q-3.23 8.461 2.116 16.115 5.346 7.653 14.807 7.653 5.846 0 10.385-2.923 4.538-2.923 6.538-8.769l18.385-52Zm12.23-33.153 41.462-114.693h2l41.462 114.693h-84.924ZM260-319.231q49.693 0 96.693 11.27 47 11.269 93.308 35.346v-393.231q-42.154-27.461-91.231-41.192-49.077-13.731-98.77-13.731-36 0-67.269 5.653-31.269 5.654-64.269 18.5-4.616 1.539-6.539 4.424-1.923 2.885-1.923 6.346v378.307q0 5.385 3.846 7.885 3.847 2.5 8.463.577 28.461-9.692 60.076-14.923Q224-319.231 260-319.231Zm249.999 46.616q46.308-24.077 93.308-35.346 47-11.27 96.693-11.27 36 0 67.615 5.231 31.615 5.231 60.076 14.923 4.616 1.923 8.463-.577 3.846-2.5 3.846-7.885v-378.307q0-3.461-1.923-6.154t-6.539-4.616q-33-12.846-64.269-18.5Q736-720.769 700-720.769q-49.693 0-98.77 13.731t-91.231 41.192v393.231ZM285-496.692Zm195 295.306q-11.692 0-21.884-2.923t-19.269-7.769q-41.308-23.385-86.424-35.27-45.115-11.884-92.423-11.884-36.615 0-71.922 8.115-35.308 8.115-68.077 23.884-21.384 9.846-40.692-3.115-19.307-12.962-19.307-36.731v-434.305q0-12.923 6.653-24.269 6.654-11.346 19.193-16.346 40.615-19.769 84.653-29.269 44.038-9.5 89.499-9.5 58.385 0 114.077 15.962Q429.769-748.845 480-717.691q50.231-31.154 105.923-47.115Q641.615-780.768 700-780.768q45.461 0 89.499 9.5t84.653 29.269q12.539 5 19.193 16.346 6.654 11.346 6.654 24.269v434.305q0 23.769-20.077 36.346-20.077 12.577-42.231 2.731-32.385-15.384-67.115-23.307-34.73-7.923-70.576-7.923-47.308 0-92.423 11.884-45.116 11.885-86.424 35.27-9.077 4.846-19.269 7.769-10.192 2.923-21.884 2.923Zm77.692-404.152q0-6.692 4.769-13.692t10.846-9.615q29.769-11.924 61.27-18.077 31.5-6.154 65.423-6.154 19.615 0 37.961 2.307 18.346 2.308 36.962 6.308 7.077 1.615 12.23 7.692 5.154 6.077 5.154 14.154 0 13.538-8.5 19.807-8.5 6.269-22.038 3.038-14.384-3-29.884-4.307-15.5-1.308-31.885-1.308-29.077 0-56.962 5.577t-53.193 15.115q-14.153 5.462-23.153-.615-9-6.077-9-20.23Zm0 218.461q0-6.692 4.769-13.884t10.846-9.808q29-11.923 61.27-17.884 32.269-5.962 65.423-5.962 19.615 0 37.961 2.308Q756.307-430 774.923-426q7.077 1.616 12.23 7.693 5.154 6.076 5.154 14.153 0 13.538-8.5 19.807-8.5 6.269-22.038 3.039-14.384-3-29.884-4.308-15.5-1.308-31.885-1.308-28.693 0-56.385 5.462-27.693 5.462-53 15.385-14.154 5.846-23.538-.308-9.385-6.154-9.385-20.692Zm0-108.846q0-6.692 4.769-13.692t10.846-9.615q29.769-11.923 61.27-18.077 31.5-6.154 65.423-6.154 19.615 0 37.961 2.308 18.346 2.307 36.962 6.307 7.077 1.616 12.23 7.692 5.154 6.077 5.154 14.154 0 13.538-8.5 19.807-8.5 6.269-22.038 3.039-14.384-3-29.884-4.308-15.5-1.308-31.885-1.308-29.077 0-56.962 5.577t-53.193 15.116q-14.153 5.461-23.153-.616-9-6.076-9-20.23Z"/></svg>
                                    <span>Lesson vocabulary</span>
                                </button>
                                <Popup isOpen={vocabularyOpen && isOpen} onClose={() => setMenus('vocabulary')} ignoreRef={vocabularyButtonRef}>
                                    <LessonVocabulary vocabulary={vocabulary} isLoading={isVocabularyLoading} isError={isVocabularyError} />
                                </Popup>
                            </div>
                            <div className="px-2 relative">
                                <button
                                    ref={sentenceAnalysisButtonRef} 
                                    onClick={() => setMenus('sentenceAnalysis')}
                                    className="w-full flex gap-3 items-center hover:bg-neutral-300 hover:dark:bg-neutral-600 p-1 rounded-md cursor-pointer">                                    
                                    <svg className="size-5 shrink-0 fill-txt-primary" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m720-430 80 80v190q0 33-23.5 56.5T720-80H160q-33 0-56.5-23.5T80-160v-560q0-33 23.5-56.5T160-800h220q-8 18-12 38.5t-6 41.5H160v560h560v-270Zm52-174 128 128-56 56-128-128q-21 12-45 20t-51 8q-75 0-127.5-52.5T440-700q0-75 52.5-127.5T620-880q75 0 127.5 52.5T800-700q0 27-8 51t-20 45Zm-152 4q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29ZM160-430v270-560 280-12 22Z"/></svg>
                                    <span>Analyze sentence</span>
                                </button>
                                <Popup isOpen={sentenceAnalysisOpen && isOpen} onClose={() => setMenus('sentenceAnalysis')} ignoreRef={sentenceAnalysisButtonRef}>
                                    <SentenceAnalysis />
                                </Popup>
                            </div>
                            {!smallScreen && 
                            <div className="px-2">
                                <button 
                                    onClick={() => setMenus('chatbot')} 
                                    className="w-full flex gap-3 items-center hover:bg-neutral-300 hover:dark:bg-neutral-600 p-1 rounded-md cursor-pointer">
                                    <img src={'/static/coursePage/images/J-Bot-logo.svg'} alt="icons of a chatbot assistant" className="size-5" />
                                    <span>Chatbot assistant</span>
                                </button>
                            </div>
                            }
                        </div>
                    </div>
                    <div className="pb-3">
                        <p className="py-3 font-bold text-center whitespace-nowrap">Curriculum</p>
                        <ul>
                            {modules?.map(({id, courseId, name}) =>
                                <li key={id} className="px-5 w-[250px] font-semibold">
                                    <button
                                        onClick={() => toggleModule(id)}
                                        className={`${highlightStyle(id)} py-[2px] w-full text-left cursor-pointer`}>
                                        {name}
                                    </button>
                                    <div 
                                        className={`${expandedModules.has(id) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} 
                                        grid transition-[grid-template-rows] duration-300 ease-out`}>
                                        <div className="overflow-hidden">
                                            <ul>
                                                {lessons?.map((lesson) =>
                                                    lesson.moduleId === id &&
                                                        <li key={lesson.id} className="ml-5">
                                                            <Link
                                                                onClick={() => setLesson(lesson)} 
                                                                to={`/courses/${courseId}/modules/${id}/lessons/${lesson.id}`} 
                                                                className={`${lesson.id === currentLesson?.id ? 'text-btn-primary dark:text-sakura' : ''}`}>
                                                                {lesson.name}
                                                            </Link>
                                                        </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            )}
                            <li className="px-5 w-[250px] font-semibold pt-2 mt-2 border-t-2 border-neutral-300 dark:border-neutral-600">
                                <Link to={`/test/${currentCourseId}`}>Final test</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={`${!isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-opacity duration-150 ease-linear z-10 absolute top-0 left-0`}>
                    <div className="p-2 flex flex-col items-center gap-1 border-b-2 border-b-neutral-300 dark:border-b-neutral-600">
                        <button
                            onClick={() => setMenus('curriculum')}
                            className="group relative hover:bg-neutral-300 hover:dark:bg-neutral-600 p-1 rounded-md cursor-pointer">
                            {deviceType === 'mouse' && <Tooltip>Open curriculum</Tooltip>}
                            <svg className="size-5 fill-txt-primary" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm120-80v-560H200v560h120Zm80 0h360v-560H400v560Zm-80 0H200h120Z"/></svg>
                        </button>
                        <div className='relative'>
                            <button
                                ref={shrinkedVocabularyButtonRef}
                                onClick={() => setMenus('vocabulary')}
                                className="group relative hover:bg-neutral-300 hover:dark:bg-neutral-600 p-1 rounded-md cursor-pointer">                                
                                {deviceType === 'mouse' && <Tooltip>{vocabularyOpen ? "Close" : "Open"} vocabulary</Tooltip>}
                                <svg className="size-5 fill-txt-primary" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M228.385-457.385H337.77l19 52.616q2 5.23 6.23 8.153 4.231 2.923 10.077 2.923 9.462 0 14.808-7.653 5.346-7.654 2.115-16.5l-81.231-214.846q-2-5.615-7.115-9.231-5.115-3.615-11.346-3.615h-14.462q-6.23 0-11.346 3.615-5.115 3.616-7.115 9.231l-81.231 215.231q-3.23 8.461 2.116 16.115 5.346 7.653 14.807 7.653 5.846 0 10.385-2.923 4.538-2.923 6.538-8.769l18.385-52Zm12.23-33.153 41.462-114.693h2l41.462 114.693h-84.924ZM260-319.231q49.693 0 96.693 11.27 47 11.269 93.308 35.346v-393.231q-42.154-27.461-91.231-41.192-49.077-13.731-98.77-13.731-36 0-67.269 5.653-31.269 5.654-64.269 18.5-4.616 1.539-6.539 4.424-1.923 2.885-1.923 6.346v378.307q0 5.385 3.846 7.885 3.847 2.5 8.463.577 28.461-9.692 60.076-14.923Q224-319.231 260-319.231Zm249.999 46.616q46.308-24.077 93.308-35.346 47-11.27 96.693-11.27 36 0 67.615 5.231 31.615 5.231 60.076 14.923 4.616 1.923 8.463-.577 3.846-2.5 3.846-7.885v-378.307q0-3.461-1.923-6.154t-6.539-4.616q-33-12.846-64.269-18.5Q736-720.769 700-720.769q-49.693 0-98.77 13.731t-91.231 41.192v393.231ZM285-496.692Zm195 295.306q-11.692 0-21.884-2.923t-19.269-7.769q-41.308-23.385-86.424-35.27-45.115-11.884-92.423-11.884-36.615 0-71.922 8.115-35.308 8.115-68.077 23.884-21.384 9.846-40.692-3.115-19.307-12.962-19.307-36.731v-434.305q0-12.923 6.653-24.269 6.654-11.346 19.193-16.346 40.615-19.769 84.653-29.269 44.038-9.5 89.499-9.5 58.385 0 114.077 15.962Q429.769-748.845 480-717.691q50.231-31.154 105.923-47.115Q641.615-780.768 700-780.768q45.461 0 89.499 9.5t84.653 29.269q12.539 5 19.193 16.346 6.654 11.346 6.654 24.269v434.305q0 23.769-20.077 36.346-20.077 12.577-42.231 2.731-32.385-15.384-67.115-23.307-34.73-7.923-70.576-7.923-47.308 0-92.423 11.884-45.116 11.885-86.424 35.27-9.077 4.846-19.269 7.769-10.192 2.923-21.884 2.923Zm77.692-404.152q0-6.692 4.769-13.692t10.846-9.615q29.769-11.924 61.27-18.077 31.5-6.154 65.423-6.154 19.615 0 37.961 2.307 18.346 2.308 36.962 6.308 7.077 1.615 12.23 7.692 5.154 6.077 5.154 14.154 0 13.538-8.5 19.807-8.5 6.269-22.038 3.038-14.384-3-29.884-4.307-15.5-1.308-31.885-1.308-29.077 0-56.962 5.577t-53.193 15.115q-14.153 5.462-23.153-.615-9-6.077-9-20.23Zm0 218.461q0-6.692 4.769-13.884t10.846-9.808q29-11.923 61.27-17.884 32.269-5.962 65.423-5.962 19.615 0 37.961 2.308Q756.307-430 774.923-426q7.077 1.616 12.23 7.693 5.154 6.076 5.154 14.153 0 13.538-8.5 19.807-8.5 6.269-22.038 3.039-14.384-3-29.884-4.308-15.5-1.308-31.885-1.308-28.693 0-56.385 5.462-27.693 5.462-53 15.385-14.154 5.846-23.538-.308-9.385-6.154-9.385-20.692Zm0-108.846q0-6.692 4.769-13.692t10.846-9.615q29.769-11.923 61.27-18.077 31.5-6.154 65.423-6.154 19.615 0 37.961 2.308 18.346 2.307 36.962 6.307 7.077 1.616 12.23 7.692 5.154 6.077 5.154 14.154 0 13.538-8.5 19.807-8.5 6.269-22.038 3.039-14.384-3-29.884-4.308-15.5-1.308-31.885-1.308-29.077 0-56.962 5.577t-53.193 15.116q-14.153 5.461-23.153-.616-9-6.076-9-20.23Z"/></svg>
                            </button>
                            <Popup isOpen={vocabularyOpen && !isOpen} onClose={() => setMenus('vocabulary')} ignoreRef={shrinkedVocabularyButtonRef}>
                                <LessonVocabulary vocabulary={vocabulary} isLoading={isLoading} isError={isError} />
                            </Popup>                             
                        </div>
                        <div className='relative'>
                            <button
                                ref={shrinkedSentenceAnalysisButtonRef}
                                onClick={() => setMenus('sentenceAnalysis')}
                                className="group relative hover:bg-neutral-300 hover:dark:bg-neutral-600 p-1 rounded-md cursor-pointer">                                
                                {deviceType === 'mouse' && <Tooltip>{sentenceAnalysisOpen ? "Close" : "Open"} sentence analysis</Tooltip>}                                
                                <svg className="size-5 shrink-0 fill-txt-primary" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m720-430 80 80v190q0 33-23.5 56.5T720-80H160q-33 0-56.5-23.5T80-160v-560q0-33 23.5-56.5T160-800h220q-8 18-12 38.5t-6 41.5H160v560h560v-270Zm52-174 128 128-56 56-128-128q-21 12-45 20t-51 8q-75 0-127.5-52.5T440-700q0-75 52.5-127.5T620-880q75 0 127.5 52.5T800-700q0 27-8 51t-20 45Zm-152 4q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29ZM160-430v270-560 280-12 22Z"/></svg>
                            </button>
                            <Popup isOpen={sentenceAnalysisOpen && !isOpen} onClose={() => setMenus('sentenceAnalysis')} ignoreRef={shrinkedSentenceAnalysisButtonRef}>
                                <SentenceAnalysis />
                            </Popup>                            
                        </div>
                        {!smallScreen && 
                            <button onClick={() => setMenus('chatbot')}
                                className="cursor-pointer">
                                <img src={'/static/coursePage/images/J-Bot-logo.svg'} alt="icons of a chatbot assistant" className="size-5" />
                            </button>
                        }
                    </div>
                    <div className="p-2 flex flex-col items-center">
                        <svg className="fill-txt-primary" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M320-280q17 0 28.5-11.5T360-320q0-17-11.5-28.5T320-360q-17 0-28.5 11.5T280-320q0 17 11.5 28.5T320-280Zm0-160q17 0 28.5-11.5T360-480q0-17-11.5-28.5T320-520q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440Zm0-160q17 0 28.5-11.5T360-640q0-17-11.5-28.5T320-680q-17 0-28.5 11.5T280-640q0 17 11.5 28.5T320-600Zm120 320h240v-80H440v80Zm0-160h240v-80H440v80Zm0-160h240v-80H440v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>
                    </div>
                </div>
            </div>
            }            
        </aside>
    )
}