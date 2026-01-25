import { useState } from 'react';

import { type Lesson} from '../../../types/Course';
import { useLessonContent } from '../../../features/lessons/hooks/useLessons';
import CtaButton from '../../../shared/CtaButton';

interface CourseContentProps {
    currentLesson: Lesson | null;
    lessons: Lesson[] | null;
    setLesson: React.Dispatch<React.SetStateAction<Lesson | null | undefined>>;
    courseId: number;
    isLoading: boolean;
    isError: boolean;
}
export default function CourseContent({
        currentLesson, 
        lessons, 
        setLesson,
        courseId, 
        isLoading, 
        isError
    }: CourseContentProps) {
    const {data: lessonContent, isLoading: isLessonContentLoading, isError: isLessonContentError} = useLessonContent(currentLesson?.id ?? null);
    const [expandedImg, setExpandedImg] = useState<number | null>(null);
    const previousLesson = lessons?.find(lesson => lesson.id === currentLesson?.previousLessonId);
    const nextLesson = lessons?.find(lesson => lesson.id === currentLesson?.nextLessonId);

    if (isError || isLessonContentError) {
        return (
            <p className='text-xl text-center text-neutral-400'>Couldn't load the course contents, please try again later.</p>
        )
    }

    const inLoadingState = isLoading || isLessonContentLoading;
    if (inLoadingState) {
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
            aria-label={`Lesson-${currentLesson?.name}`}
            className="flex justify-center overflow-hidden">
            <div className="flex flex-col gap-5 max-w-[700px] xl:max-w-[800px]">
                <h1 className="text-center text-4xl font-semibold text-btn-primary dark:text-sakura">{currentLesson?.name}</h1>
                {
                    lessonContent?.map(({id, heading, content}) => {
                        let result = null;                            
                        if (content.type === 'paragraph')
                            result = <p>{content.text}</p>
                        else if (content.type === 'list')
                            result = (
                                <ul>
                                    {content.items.map((c, i) => <li key={i} className="list-disc mx-5 py-1">{c}</li>)}
                                </ul>
                            )
                        else if (content.type === 'image')
                            result = (
                                <div 
                                    onClick={() => {
                                        setExpandedImg(prev => prev === null ? id : null);
                                    }}
                                    className={`${expandedImg === id ? 'fixed z-20 inset-0 flex items-center justify-center p-[10%] bg-neutral-400/20 dark:bg-neutral-600/20 backdrop-blur-sm' : ''} mt-3 cursor-pointer`}>
                                    <div className={`${!expandedImg ? 'border-2' : ''} relative group rounded-xl p-2 border-txt-secondary`}>
                                        <img className={`relative ${expandedImg ? 'rounded-2xl' : 'rounded-md'}`} src={content.url} alt={content.alt ?? "image of a hiragana and katakana table"} />
                                        <svg className="absolute top-5 right-5 bg-gray-400/80 size-7 group-hover:bg-gray-600/80 fill-white rounded-md" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-120v-240h80v104l124-124 56 56-124 124h104v80H120Zm480 0v-80h104L580-324l56-56 124 124v-104h80v240H600ZM324-580 200-704v104h-80v-240h240v80H256l124 124-56 56Zm312 0-56-56 124-124H600v-80h240v240h-80v-104L636-580ZM480-400q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Z"/></svg>
                                    </div>
                                </div>
                            )
                        if (heading)
                            return (
                            <div>
                                <h2 className="mb-1 font-bold text-lg dark:text-stone-400">{heading}</h2>
                                {result}
                            </div>
                            )
                        else return result;
                })}
                <div className='flex justify-between gap-3'>
                    {previousLesson ?
                        <CtaButton
                            onClick={() => setLesson(previousLesson)}
                            url={`/courses/${courseId}/modules/${previousLesson.moduleId}/lessons/${previousLesson.id}`} 
                            customStyle={'min-w-[100px]'}>
                            Previous
                        </CtaButton>
                        : <div></div>
                    }
                    {nextLesson ? 
                        <CtaButton 
                            onClick={() => setLesson(nextLesson)}
                            url={`/courses/${courseId}/modules/${nextLesson.moduleId}/lessons/${nextLesson.id}`} 
                            customStyle={'min-w-[100px]'}>
                            Next
                        </CtaButton>
                        : <div></div>
                    }
                </div>
            </div>
        </article>
    )
}