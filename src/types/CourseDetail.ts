import type { AccordionContent } from "./AccordionContent";

export interface CourseDetail {
    id: number;
    courseId: number;
    name: string;
    description: string;
    shortDescription: string;
    posterUrl: string;
    jlptLevel: 'n5' | 'n4' | 'n3' | 'n2' | 'n1';
    vocabularyCount: number;
    totalXP: number;
    goals: ('reading' | 'listening' | 'writing' | 'speaking' | 'examPrep')[];
    topic: 'business-work' | 'casualConversation' | 'travel' | 'cooking' | 'health';
    duration: number;
    achievements: {highlight?: string; text: string}[];
    features: Array<{
        type: 'quiz' | 'audio' | 'video' | 'flashcard' | 'downloadable' | 'assignment';
        text: string
    }>;
    curriculum: AccordionContent[];
    prerequesites: string[];
    testimonials: Array<{username: string; rating: number; text: string, pfpUrl: string}>;
    author: {
        name: string;
        nCourses: number;
        avgRating: number;
        pfpUrl: string;
        about: string;
    };
    rating: number;
    tags: Array<'JLPT' | 'Grammar' | 'Culture' | 'Conversation' | 'Vocabulary'>;
    courseValues: CourseValues[];
    createdAt: Date;
}

interface CourseValues {
    label: string;
    value: string | number;
}