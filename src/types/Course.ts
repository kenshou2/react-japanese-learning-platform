export interface Course {
    id: number;    
}

export interface Module {
    id: number;
    name: string;
    duration: number;
    courseId: number;
}

export interface Lesson {
    id: number;
    name: string;
    duration: number;
    moduleId: number;    
    previousLessonId: number | null;    
    nextLessonId: number | null;
}

interface ParagraphBlock {
    type: 'paragraph',
    text: string,
}
interface ListBlock {
    type: 'list',
    items: string[],
}
export interface ImageBlock {
    type: 'image';
    url: string;
    alt?: string;  
}
export interface LessonContent {
    id: number;
    lessonId: number;
    heading?: string;
    content: ParagraphBlock | ListBlock | ImageBlock;    
}

export interface LessonVocabulary {
    id: number;
    lessonId: number;
    dictionaryId: number;
}