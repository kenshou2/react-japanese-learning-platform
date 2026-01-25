export interface SupportingLink {
    description: string;
    url: string;
}

export interface QuestionOption {
    id: number;
    text: string;
    isCorrect: boolean;
    explanation?: string;
    supportingLinks?: SupportingLink[];
}

export interface Question {
    id: number;
    text: string;
    type: 'single-choice' | 'multiple-choice';
    imgUrl?: string;
    paragraph?: string;
    options: QuestionOption[];

}

export interface Test {
    id: number;
    courseId: number;
    questions: Question[];    
}