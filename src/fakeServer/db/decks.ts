import type { Deck } from "../../types/Deck";

const POSTER_BASE_URL = '/storage/decks/deckPosters';

let deckId = 0;
let cardId = 0;

let decks: Deck[] = populateDecks();

export const decksDb = {
    getAll: () => {
        return [...decks];
    },
    getById: (id: number) => {
        const deck = decks.find(d => d.id === id);
        if (!deck) throw new Error(`Deck with id ${id} not found`);
        return deck;
    },
    create: (deck: Omit<Deck, 'id'>) => {
        const newDeck: Deck = {
            id: deckId++,
            ...deck,
        };
        decks.push(newDeck);
        return newDeck;
    },
    update: (id: number, updates: Partial<Deck>) => {
        const toUpdateIndex = decks.findIndex(d => d.id === id);
        if (toUpdateIndex === -1) throw new Error(`Deck with id ${id} not found`);
        decks[toUpdateIndex] = {...decks[toUpdateIndex], ...updates};
        return decks[toUpdateIndex];
    },
    delete: (id: number) => {
        const lengthBefore = decks.length;
        decks = decks.filter(d => d.id !== id);
        if (lengthBefore !== decks.length)
            return true;
        else throw new Error(`Deck with ${id} not found.`);
    },
    getDeckCards: (id: number) => {
        const deck = decks.find(d => d.id === id);
        if (!deck) throw new Error(`Deck with id ${id} not found`);
        return deck.cards;
    },
}

function populateDecks(): Deck[] {return [
    {
    id: deckId++,
    name: 'JLPT N5: Everyday Basic Words',
    shortDescription: "Common everyday words for beginners to build a foundation in Japanese.",
    jlptLevel: 'n5',
    goals: ['reading', 'listening', 'speaking'],
    topic: 'casualConversation',
    rating: 5,
    tags: ['Technical', 'Conversation', 'JLPT'],
    dueWords: 100,
    newWords: 10,
    posterUrl: `${POSTER_BASE_URL}/0.png`,
    createdAt: new Date("2023-03-12T10:15:00"),
    cards: [
        {
            id: cardId++,
            front: 'こんにちは',
            back: ['Hello', 'Good afternoon'],
            hiragana: ['こんにちは'],
            katakana: [],
            examples: ['こんにちは、元気ですか？: Hello, how are you?']
        },
        {
            id: cardId++,
            front: 'ありがとう',
            back: ['Thank you'],
            hiragana: ['ありがとう'],
            katakana: [],
            examples: ['手伝ってくれてありがとう: Thank you for helping me.']
        },
        {
            id: cardId++,
            front: 'さようなら',
            back: ['Goodbye', 'Farewell'],
            hiragana: ['さようなら'],
            katakana: [],
            examples: ['では、また明日。さようなら: Well, see you tomorrow. Goodbye.']
        }
    ]
},    
{
    id: deckId++,
    name: 'JLPT N4: Travel Essentials',
    shortDescription: "Key words and phrases for beginners traveling in Japan.",
    jlptLevel: 'n4',
    goals: ['reading', 'listening', 'speaking'],
    topic: 'travel',
    rating: 5,
    tags: ['Conversation', 'JLPT'],
    dueWords: 50,
    newWords: 10,
    posterUrl: `${POSTER_BASE_URL}/1.png`,
    createdAt: new Date("2023-03-12T10:20:00"),
    cards: [
        {
            id: cardId++,
            front: '駅',
            back: ['Station', 'Train station'],
            hiragana: ['えき'],
            katakana: [],
            examples: ['東京駅(とうきょうえき) – Tokyo Station', '駅で待ち合わせをする – Meet at the station.']
        },
        {
            id: cardId++,
            front: '切符',
            back: ['Ticket'],
            hiragana: ['きっぷ'],
            katakana: [],
            examples: ['切符を買う – Buy a ticket', '電車の切符 – Train ticket']
        },
        {
            id: cardId++,
            front: 'バス',
            back: ['Bus'],
            hiragana: [],
            katakana: ['バス'],
            examples: ['バス停(ばすてい) – Bus stop', 'バスに乗る – Take the bus']
        }
    ]
},
{
    id: deckId++,
    name: 'JLPT N3: Dining and Food',
    shortDescription: "Essential words and phrases for ordering food and understanding menus.",
    jlptLevel: 'n3',
    goals: ['reading', 'listening', 'speaking'],
    topic: 'cooking',
    rating: 5,
    tags: ['Conversation', 'JLPT'],
    dueWords: 87,
    newWords: 15,
    posterUrl: `${POSTER_BASE_URL}/2.png`,
    createdAt: new Date("2023-03-12T10:25:00"),
    cards: [
        {
            id: cardId++,
            front: 'ごはん',
            back: ['Cooked rice', 'Meal'],
            hiragana: ['ごはん'],
            katakana: [],
            examples: ['朝ごはん(あさごはん) – Breakfast', '昼ごはん(ひるごはん) – Lunch']
        },
        {
            id: cardId++,
            front: '水',
            back: ['Water'],
            hiragana: ['みず'],
            katakana: [],
            examples: ['お水をください – Please give me water', '水は冷たいです – The water is cold']
        },
        {
            id: cardId++,
            front: 'メニュー',
            back: ['Menu'],
            hiragana: [],
            katakana: ['メニュー'],
            examples: ['メニューを見せてください – Please show me the menu', 'おすすめのメニュー – Recommended menu']
        }
    ]
},
{
    id: deckId++,
    name: 'JLPT N2: Health and Daily Life',
    shortDescription: "Common words for talking about health, feelings, and everyday routines.",
    jlptLevel: 'n2',
    goals: ['reading', 'listening', 'speaking'],
    topic: 'health',
    rating: 5,
    tags: ['Conversation', 'JLPT'],
    dueWords: 60,
    newWords: 20,
    posterUrl: `${POSTER_BASE_URL}/3.png`,
    createdAt: new Date("2023-03-12T10:30:00"),
    cards: [
        {
            id: cardId++,
            front: '病院',
            back: ['Hospital', 'Clinic'],
            hiragana: ['びょういん'],
            katakana: [],
            examples: ['病院に行く – Go to the hospital', '病院で薬をもらう – Receive medicine at the hospital']
        },
        {
            id: cardId++,
            front: '頭',
            back: ['Head'],
            hiragana: ['あたま'],
            katakana: [],
            examples: ['頭が痛い – My head hurts', '頭を冷やす – Cool your head']
        },
        {
            id: cardId++,
            front: '眠い',
            back: ['Sleepy', 'Tired'],
            hiragana: ['ねむい'],
            katakana: [],
            examples: ['今日はとても眠い – I am very sleepy today', '眠いので早く寝る – Go to bed early because I am sleepy']
        }
    ]
},
{
    id: deckId++,
    name: 'JLPT N1: Work and School Basics',
    shortDescription: "Important words for everyday conversations at work, school, or study.",
    jlptLevel: 'n1',
    goals: ['reading', 'listening', 'speaking'],
    topic: 'business-work',
    rating: 5,
    tags: ['Conversation', 'JLPT'],
    dueWords: 200,
    newWords: 50,
    posterUrl: `${POSTER_BASE_URL}/4.png`,
    createdAt: new Date("2023-03-12T10:35:00"),
    cards: [
        {
            id: cardId++,
            front: '先生',
            back: ['Teacher', 'Instructor'],
            hiragana: ['せんせい'],
            katakana: [],
            examples: ['先生に質問する – Ask the teacher a question', '日本語の先生 – Japanese teacher']
        },
        {
            id: cardId++,
            front: '会社',
            back: ['Company', 'Office'],
            hiragana: ['かいしゃ'],
            katakana: [],
            examples: ['会社に行く – Go to the company', '会社の同僚 – Colleague at the company']
        },
        {
            id: cardId++,
            front: '学生',
            back: ['Student'],
            hiragana: ['がくせい'],
            katakana: [],
            examples: ['大学の学生 – University student', '学生です – I am a student']
        }
    ]
},
]};