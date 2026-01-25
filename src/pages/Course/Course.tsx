import { useState, useEffect } from "react"

import Curriculum from "./components/Curriculum/Curriculum";
import CourseContent from "./components/CourseContent";
import Chatbot from "./components/Chatbot";

import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useCourseModules } from "../../features/modules/hooks/useModules";
import { type Lesson } from "../../types/Course";
import { useCourseLessons } from "../../features/lessons/hooks/useLessons";
import { Link, useLoaderData } from "react-router";

export type Menu = 'curriculum' | 'chatbot' | 'vocabulary' | 'sentenceAnalysis';

interface OpenMenus {
  curriculum: boolean;
  chatbot: boolean;
  vocabulary: boolean;
  sentenceAnalysis: boolean;
}

export default function Course() {
    const { courseId: courseIdStr, moduleId: moduleIdStr, lessonId: lessonIdStr } = useLoaderData() as { 
        courseId: string;
        moduleId: string;
        lessonId: string;
    };
    const courseId = Number(courseIdStr);
    const moduleId = Number(moduleIdStr);
    const lessonId = Number(lessonIdStr);
    if (isNaN(courseId) || isNaN(moduleId) || isNaN(lessonId)) {
        return <div>Invalid course contents path</div>;
    }    

    const {data: modules, isLoading: isModulesLoading, isError: isModulesError} = useCourseModules(courseId);
    const {data: lessons, isLoading: isLessonsLoading, isError: isLessonsError} = useCourseLessons(courseId);
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>();

    const [gridLayout, setGridLayout] = useState('250px 1fr');
    const isLargeScreen = useMediaQuery("(min-width: 640px)");
    const [openMenus, setOpenMenus] = useState<OpenMenus>({
        curriculum: isLargeScreen,
        chatbot: false,
        vocabulary: false,
        sentenceAnalysis: false,
    });

    useEffect(() => {        
        if (modules && lessons) {
            const currentLesson = lessons.find(l => l.id === lessonId);            
            setCurrentLesson(currentLesson ?? null);
        }
    }, [modules, lessons]);
    
    function manageMenus(menu: Menu) {
    setOpenMenus(prev => {
        const next: OpenMenus = { ...prev };

        if (isLargeScreen) {
            // --- Desktop/tablet rules ---
            if (menu === 'vocabulary' || menu === 'sentenceAnalysis') {
            // only vocabulary or sentence analysis is open at a time
            next.vocabulary = menu === 'vocabulary' ? !prev.vocabulary : false;
            next.sentenceAnalysis = menu === 'sentenceAnalysis' ? !prev.sentenceAnalysis : false;
            } else if (menu === 'curriculum') {
            // toggle curriculum, but close vocab + sentence analysis
            next.curriculum = !prev.curriculum;
            next.vocabulary = false;
            next.sentenceAnalysis = false;
            } else if (menu === 'chatbot') {
            // chatbot acts independently
            next.chatbot = !prev.chatbot;
            }
        } else {
            // --- Mobile rules ---
            // only one menu open at a time
            next.curriculum = menu === 'curriculum' ? !prev.curriculum : false;
            next.chatbot = menu === 'chatbot' ? !prev.chatbot : false;
            next.vocabulary = menu === 'vocabulary' ? !prev.vocabulary : false;
            next.sentenceAnalysis = menu === 'sentenceAnalysis' ? !prev.sentenceAnalysis : false;
        }

        return next;
        });
    }

    useEffect(() => {
        if (!openMenus.curriculum)
            setGridLayout('44px 1fr');        
        else {
            setGridLayout('250px 1fr');
        }
    }, [openMenus.curriculum]);

    const isError = isModulesError || isLessonsError;
    const isLoading = isModulesLoading || isLessonsLoading;
    if (isError) {
        return (
            <div className="w-full h-[calc(100vh-80px)] flex items-center justify-center">
                <div className="font-semibold text-2xl text-center">
                    <h1>Couldn't load the course contents, please try again later.</h1>
                    <Link to='/' className="text-lg underline text-neutral-400">Contact support</Link>
                </div>
            </div>
        )
    }    
    
    return (
        <div className="flex gap-10 p-[5%]">            
            <div
                style={{gridTemplateColumns: gridLayout}} 
                className="flex-1 grid gap-5 sm:gap-10 transition-[grid-template-columns] duration-300 ease-out">
                <Curriculum
                    modules={modules ?? null}
                    lessons={lessons ?? null}
                    currentLesson={currentLesson ?? null}
                    currentCourseId={courseId}
                    currentModuleId={moduleId}
                    currentLessonId={lessonId}
                    setLesson={setCurrentLesson}
                    setMenus={manageMenus}                     
                    isOpen={openMenus.curriculum}
                    isLoading={isLoading}
                    isError={isError}
                    vocabularyOpen={openMenus.vocabulary}
                    sentenceAnalysisOpen={openMenus.sentenceAnalysis}
                    smallScreen={isLargeScreen}
                />
                <CourseContent 
                    currentLesson={currentLesson ?? null} 
                    lessons={lessons ?? null} 
                    setLesson={setCurrentLesson}
                    courseId={courseId} 
                    isLoading={isLoading} 
                    isError={isError}
                />
            </div>
            <Chatbot setMenus={manageMenus} isOpen={openMenus.chatbot} smallScreen={isLargeScreen} />
        </div>
    )
}