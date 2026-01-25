export interface Card {
    id: number;
    front: string;
    back: string[];
    hiragana?: string[];
    katakana?: string[];
    examples?: string[];
}

export interface Deck {
    id: number;
    name: string;
    shortDescription: string;
    rating: number;
    posterUrl?: string;
    tags: Array<'Conversation' | 'Technical' | 'JLPT' | 'Health' | 'Science' | 'Business'>;
    dueWords: number;
    newWords: number;
    jlptLevel: 'n5' | 'n4' | 'n3' | 'n2' | 'n1';
    goals: ('reading' | 'listening' | 'writing' | 'speaking' | 'examPrep')[];
    topic: 'business-work' | 'casualConversation' | 'travel' | 'cooking' | 'health';
    createdAt: Date;
    cards: Card[];
}