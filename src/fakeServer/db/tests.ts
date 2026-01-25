import type { Test } from "../../types/Test";

const BASE_IMG_URL = '/storage/tests/testImages';

let testId = 0;
let questionId = 0;
let optionId = 0;

let tests: Test[] = populateTests();

export const testsDb = {
    getAll: () => {
        return [...tests];
    },
    getById: (id: number) => {
        const test = tests.find(t => t.id === id);
        if (!test) throw new Error(`Test with ${id} not found.`);
        return test;
    },
    create: (test: Omit<Test, 'id'>) => {
        const newTest: Test = {
            id: testId++,
            ...test,
        };
        tests.push(newTest);
        return newTest;
    },
    update: (id: number, updates: Partial<Test>) => {
        const toUpdateIndex = tests.findIndex(t => t.id === id);
        if (toUpdateIndex === -1)
            throw new Error(`Test with ${id} not found.`);
        tests[toUpdateIndex] = {...tests[toUpdateIndex], ...updates};
        return tests[toUpdateIndex];
    },
    delete: (id: number) => {
        const lengthBefore = tests.length;
        tests = tests.filter(t => t.id !== id);
        if (lengthBefore !== tests.length)
            return true;
        else throw new Error(`Test with ${id} not found.`);        
    },
    getCourseTest: (courseId: number) => {
        const test = tests.find(t => t.courseId === courseId);
        if (!test) throw new Error(`Test from course with id ${courseId} not found`);
        return test;
    },
}

function populateTests(): Test[] {return [
    {
    id: testId++,
    courseId: 0, // (N4) Everyday Japanese Listening for Real Conversations
    questions: [
        {
            id: questionId++,
            text: 'When listening to a short conversation between two friends, what is the most important thing to focus on?',
            type: 'single-choice',
            paragraph: 'You are listening to two classmates talking about weekend plans. One talks about going to the park, the other mentions meeting at a café afterwards.',
            options: [
                {
                    id: optionId++,
                    text: 'Trying to understand every single word perfectly',
                    isCorrect: false,
                    explanation: 'At N4 level, it is normal to miss some words. The focus should be on understanding the main topic and relationship between speakers.',
                    supportingLinks: [
                        {description: 'Lesson on General Meaning', url: '/'},
                        {description: 'Useful article', url: '/'},
                    ],
                },
                {
                    id: optionId++,
                    text: 'Understanding the main topic and key details',
                    isCorrect: true,
                    explanation: 'This is the correct approach for real-life listening at N4 level.',
                    supportingLinks: [
                        {description: 'Lesson on General Meaning', url: '/'},
                    ],
                },
                {
                    id: optionId++,
                    text: 'Writing down every word the speakers say',
                    isCorrect: false,
                    explanation: 'Trying to capture every word will make comprehension slower and less effective.',
                    supportingLinks: [],
                },
            ],
        },
        {
            id: questionId++,
            text: 'Which of the following phrases indicate a follow-up question in conversation? (Choose all that apply)',
            type: 'multiple-choice',
            options: [
                {
                    id: optionId++,
                    text: 'それで？',
                    isCorrect: true,
                    explanation: 'This phrase is commonly used to ask "And then?" or "So?" in conversation.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: 'ええ、そうです',
                    isCorrect: false,
                    explanation: 'This is a response, not a follow-up question.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: 'どうしたの？',
                    isCorrect: true,
                    explanation: 'This phrase asks "What happened?" and functions as a follow-up question.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: 'こんにちは',
                    isCorrect: false,
                    explanation: 'This is a greeting, not a follow-up question.',
                    supportingLinks: [],
                },
            ],
        },
        {
            id: questionId++,
            text: 'In a restaurant conversation, if someone says 「すみません、これをお願いします」, what are they most likely doing?',
            imgUrl: `${BASE_IMG_URL}/0.png`,
            type: 'single-choice',
            options: [
                {
                    id: optionId++,
                    text: 'Asking for the menu politely',
                    isCorrect: false,
                    explanation: '「これをお願いします」 is not asking for the menu, it is requesting the item directly.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: 'Ordering a specific item politely',
                    isCorrect: true,
                    explanation: '「これをお願いします」 literally means "I will have this, please," commonly used when ordering.',
                    supportingLinks: [
                        {description: 'Lesson on Listening at Shops and Restaurants', url: '/'},
                    ],
                },
                {
                    id: optionId++,
                    text: 'Saying goodbye politely',
                    isCorrect: false,
                    explanation: 'This phrase is not used for leaving; it is a request or order.',
                    supportingLinks: [],
                },
            ],
        },
    ],
},
{
    id: testId++,
    courseId: 1, // Practical Japanese for Travel Situations
    questions: [
        {
            id: questionId++,
            text: 'You are at a train station and want to ask for the next train to Osaka. Which phrase is most appropriate?',
            type: 'single-choice',
            paragraph: 'Imagine you are standing at a station ticket counter. You want to travel to Osaka and need the next train schedule.',
            options: [
                {
                    id: optionId++,
                    text: '次の電車は大阪に行きますか？',
                    isCorrect: true,
                    explanation: 'This politely asks if the next train goes to Osaka, which is suitable for travelers.',
                    supportingLinks: [
                        {description: 'Lesson on Using Transportation and Tickets', url: '/'},
                    ],
                },
                {
                    id: optionId++,
                    text: 'これはいくらですか？',
                    isCorrect: false,
                    explanation: 'This asks "How much is this?" which is not relevant here.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: 'おはようございます',
                    isCorrect: false,
                    explanation: 'This is a greeting, not a question about trains.',
                    supportingLinks: [],
                },
            ],
        },
        {
            id: questionId++,
            text: 'Which of the following would you use to ask for help in a store? (Choose all that apply)',
            type: 'multiple-choice',
            options: [
                {
                    id: optionId++,
                    text: 'すみません、手伝っていただけますか？',
                    isCorrect: true,
                    explanation: 'This politely asks for assistance in a store or public setting.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: 'これは何ですか？',
                    isCorrect: true,
                    explanation: 'This asks "What is this?" and is a common question for help.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: 'ありがとう',
                    isCorrect: false,
                    explanation: 'This is a thank you, not a question or request for help.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: '行きます',
                    isCorrect: false,
                    explanation: 'This just means "I will go" and is not a request for help.',
                    supportingLinks: [],
                },
            ],
        },
        {
            id: questionId++,
            text: 'When checking into a hotel, which expression would you most likely use?',
            type: 'single-choice',
            options: [
                {
                    id: optionId++,
                    text: '予約をしています。',
                    isCorrect: true,
                    explanation: 'This means "I have a reservation," which is the correct expression when checking in.',
                    supportingLinks: [
                        {description: 'Lesson on Handling Basic Hotel and Airport Situations', url: '/'},
                    ],
                },
                {
                    id: optionId++,
                    text: 'お手洗いはどこですか？',
                    isCorrect: false,
                    explanation: 'This asks where the restroom is, not for checking in.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: 'いくらですか？',
                    isCorrect: false,
                    explanation: 'This asks for the price, not for hotel check-in.',
                    supportingLinks: [],
                },
            ],
        },
    ],
},
{
    id: testId++,
    courseId: 2, // Japanese for the Workplace: Natural Office Communication
    questions: [
        {
            id: questionId++,
            text: 'You receive a task email from your manager saying 「明日までにこの資料をまとめてください」. What is the main instruction?',
            type: 'single-choice',
            paragraph: 'Read the sentence carefully. 「明日までに」 indicates a deadline, 「資料をまとめてください」 is the action requested.',
            options: [
                {
                    id: optionId++,
                    text: 'You should prepare the documents by tomorrow.',
                    isCorrect: true,
                    explanation: 'The sentence politely requests that you summarize the materials by tomorrow.',
                    supportingLinks: [
                        {description: 'Lesson on Following Instructions and Task Updates', url: '/'},
                    ],
                },
                {
                    id: optionId++,
                    text: 'You can submit the documents anytime next week.',
                    isCorrect: false,
                    explanation: '「明日までに」 clearly specifies the deadline as tomorrow.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: 'You should ignore the request.',
                    isCorrect: false,
                    explanation: 'Ignoring the task is incorrect; it is a polite instruction.',
                    supportingLinks: [],
                },
            ],
        },
        {
            id: questionId++,
            text: 'Which of the following are common phrases for expressing opinions at work? (Choose all that apply)',
            type: 'multiple-choice',
            options: [
                {
                    id: optionId++,
                    text: '私の考えでは…',
                    isCorrect: true,
                    explanation: 'This means "In my opinion…" and is used to politely present your viewpoint.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: '～してはいけません',
                    isCorrect: false,
                    explanation: 'This is a prohibition, not an opinion.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: '～と思います',
                    isCorrect: true,
                    explanation: 'This means "I think…" and is commonly used to express opinions politely.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: 'こんにちは',
                    isCorrect: false,
                    explanation: 'This is a greeting, not a way to express an opinion.',
                    supportingLinks: [],
                },
            ],
        },
        {
            id: questionId++,
            text: 'During a meeting, someone says 「この方法では問題が出る可能性があります」. What are they expressing?',
            type: 'single-choice',
            options: [
                {
                    id: optionId++,
                    text: 'They are warning about a possible problem.',
                    isCorrect: true,
                    explanation: '「問題が出る可能性があります」 literally means "There is a possibility that a problem will occur," which is a polite warning.',
                    supportingLinks: [
                        {description: 'Lesson on Handling Requests, Problems, and Clarifications', url: '/'},
                    ],
                },
                {
                    id: optionId++,
                    text: 'They are giving praise for the method.',
                    isCorrect: false,
                    explanation: 'The sentence expresses caution, not praise.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: 'They are asking for help.',
                    isCorrect: false,
                    explanation: 'No request for help is being made; this is a statement about potential issues.',
                    supportingLinks: [],
                },
            ],
        },
    ],
},
{
    id: testId++,
    courseId: 3, // Japanese Through Cooking and Food Culture
    questions: [
        {
            id: questionId++,
            text: 'You hear a recipe instruction: 「たまねぎをみじん切りにしてください」. What should you do?',
            type: 'single-choice',
            paragraph: 'The recipe is giving a cooking instruction. Focus on the verb 「みじん切りにする」 to understand the action.',
            options: [
                {
                    id: optionId++,
                    text: 'Chop the onion into small pieces.',
                    isCorrect: true,
                    explanation: '「みじん切り」 means finely chopped, and 「してください」 is a polite request.',
                    supportingLinks: [
                        {description: 'Lesson on Understanding Recipe Language and Cooking Verbs', url: '/'},
                    ],
                },
                {
                    id: optionId++,
                    text: 'Boil the onion.',
                    isCorrect: false,
                    explanation: 'Boiling is not indicated; the instruction is specifically about chopping.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: 'Fry the onion.',
                    isCorrect: false,
                    explanation: 'The instruction does not mention frying; it only asks to chop.',
                    supportingLinks: [],
                },
            ],
        },
        {
            id: questionId++,
            text: 'Which expressions would you use to ask about taste or preference? (Choose all that apply)',
            type: 'multiple-choice',
            options: [
                {
                    id: optionId++,
                    text: 'これは辛いですか？',
                    isCorrect: true,
                    explanation: 'This asks "Is this spicy?" to check taste.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: 'おいしいと思いますか？',
                    isCorrect: true,
                    explanation: 'This asks "Do you think it is delicious?" and expresses opinion about taste.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: '今日は天気がいいです。',
                    isCorrect: false,
                    explanation: 'This is a comment about the weather, not food taste.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: '材料を切ってください。',
                    isCorrect: false,
                    explanation: 'This is a cooking instruction, not a question about taste or preference.',
                    supportingLinks: [],
                },
            ],
        },
        {
            id: questionId++,
            text: 'A person says: 「日本ではお正月におせち料理を食べます」. What are they talking about?',
            type: 'single-choice',
            paragraph: 'Consider the cultural context mentioned and the holiday referenced.',
            options: [
                {
                    id: optionId++,
                    text: 'Eating traditional New Year’s food in Japan.',
                    isCorrect: true,
                    explanation: '「お正月」 is New Year, and 「おせち料理」 are traditional Japanese dishes for this occasion.',
                    supportingLinks: [
                        {description: 'Lesson on Talking About Food Culture and Traditions', url: '/'},
                    ],
                },
                {
                    id: optionId++,
                    text: 'Cooking a summer festival dish.',
                    isCorrect: false,
                    explanation: 'The sentence mentions New Year, not a summer festival.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: 'Eating breakfast every day.',
                    isCorrect: false,
                    explanation: 'The context is specifically about New Year’s tradition, not daily meals.',
                    supportingLinks: [],
                },
            ],
        },
    ],
},
{
    id: testId++,
    courseId: 4, // JLPT N3: Everyday Japanese for Health and Daily Wellbeing
    questions: [
        {
            id: questionId++,
            text: 'A doctor says 「毎日薬を飲むようにしてください」. What is the meaning of this instruction?',
            type: 'single-choice',
            paragraph: 'You are listening to a medical advice session. Focus on verbs and expressions for instructions.',
            options: [
                {
                    id: optionId++,
                    text: 'Take your medicine every day as instructed.',
                    isCorrect: true,
                    explanation: '「～ようにしてください」 is a polite way to request someone to do something regularly.',
                    supportingLinks: [
                        {description: 'Lesson on Understanding Medical Advice and Instructions', url: '/'},
                    ],
                },
                {
                    id: optionId++,
                    text: 'Take medicine only when you feel sick.',
                    isCorrect: false,
                    explanation: 'The instruction clearly says to take it every day, not occasionally.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: 'Stop taking medicine immediately.',
                    isCorrect: false,
                    explanation: 'This is the opposite of what the instruction asks.',
                    supportingLinks: [],
                },
            ],
        },
        {
            id: questionId++,
            text: 'Which of the following phrases could you use to discuss diet, exercise, or healthy habits? (Choose all that apply)',
            type: 'multiple-choice',
            options: [
                {
                    id: optionId++,
                    text: '毎日運動していますか？',
                    isCorrect: true,
                    explanation: 'This asks "Do you exercise every day?" to discuss healthy habits.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: '野菜を多く食べています。',
                    isCorrect: true,
                    explanation: 'This means "I eat a lot of vegetables" and discusses diet.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: '明日は雨です。',
                    isCorrect: false,
                    explanation: 'This is about weather, not health or habits.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: 'テレビを見ます。',
                    isCorrect: false,
                    explanation: 'This is about watching TV, not related to health discussion.',
                    supportingLinks: [],
                },
            ],
        },
        {
            id: questionId++,
            text: 'During a conversation, someone says 「最近、仕事でストレスが多いです」. How should you respond appropriately?',
            type: 'single-choice',
            paragraph: 'The speaker is discussing mental wellbeing and stress. Choose a polite and empathetic response.',
            options: [
                {
                    id: optionId++,
                    text: '大変ですね。リラックスする時間を作ったほうがいいですよ。',
                    isCorrect: true,
                    explanation: 'This response acknowledges the stress and gives polite advice on relaxation.',
                    supportingLinks: [
                        {description: 'Lesson on Mental Wellbeing and Stress Management Discussions', url: '/'},
                    ],
                },
                {
                    id: optionId++,
                    text: 'それは面白いですね。',
                    isCorrect: false,
                    explanation: 'Saying "That is interesting" is inappropriate for a stress-related topic.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: '仕事をやめたほうがいいです。',
                    isCorrect: false,
                    explanation: 'Telling someone to quit work directly may be too abrupt and culturally inappropriate.',
                    supportingLinks: [],
                },
            ],
        },
    ],
},
{
    id: testId++,
    courseId: 5, // JLPT N1: Advanced Japanese Through Real Texts
    questions: [
        {
            id: questionId++,
            text: 'You read a paragraph in a report: 「著者は政策の影響を分析し、消費者行動の変化に注目している」. What is the main idea?',
            type: 'single-choice',
            paragraph: 'Focus on what the author emphasizes and what is being analyzed in the text.',
            options: [
                {
                    id: optionId++,
                    text: 'The author analyzes policy impact with attention to consumer behavior changes.',
                    isCorrect: true,
                    explanation: 'The sentence clearly states that the author analyzes policies and observes consumer behavior.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: 'The author explains cooking methods.',
                    isCorrect: false,
                    explanation: 'This has nothing to do with consumer behavior or policy.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: 'The author talks about travel experiences.',
                    isCorrect: false,
                    explanation: 'Travel is not mentioned in the context.',
                    supportingLinks: [],
                },
            ],
        },
        {
            id: questionId++,
            text: 'Which phrases indicate that an argument is being supported with evidence? (Choose all that apply)',
            type: 'multiple-choice',
            paragraph: 'You are analyzing a panel discussion transcript. Pay attention to phrases used to justify opinions.',
            options: [
                {
                    id: optionId++,
                    text: 'なぜなら',
                    isCorrect: true,
                    explanation: '"Because" introduces reasoning or supporting evidence.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: '一方で',
                    isCorrect: true,
                    explanation: '"On the other hand" contrasts arguments and is common in reasoning.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: 'こんにちは',
                    isCorrect: false,
                    explanation: 'This is a greeting and not used for supporting arguments.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: 'たぶん',
                    isCorrect: false,
                    explanation: '"Maybe" expresses uncertainty, not evidence.',
                    supportingLinks: [],
                },
            ],
        },
        {
            id: questionId++,
            text: 'During an interview, a speaker says: 「この業界の課題は、規制の複雑さにあります」. What is being expressed?',
            type: 'single-choice',
            paragraph: 'Consider the context of an advanced conversation about professional challenges.',
            options: [
                {
                    id: optionId++,
                    text: 'The main challenge in the industry is the complexity of regulations.',
                    isCorrect: true,
                    explanation: 'The sentence states clearly that the difficulty lies in regulatory complexity.',
                    supportingLinks: [
                        {description: 'Lesson on Following Complex Conversations in Interviews and Panels', url: '/'},
                    ],
                },
                {
                    id: optionId++,
                    text: 'The industry has no challenges.',
                    isCorrect: false,
                    explanation: 'The speaker explicitly mentions a challenge, so this is incorrect.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: 'The speaker is talking about food culture.',
                    isCorrect: false,
                    explanation: 'This context is professional/industry-related, not about food.',
                    supportingLinks: [],
                },
            ],
        },
    ],
},
{
    id: testId++,
    courseId: 6, // JLPT N2: Bridging Intermediate to Advanced Japanese
    questions: [
        {
            id: questionId++,
            text: 'You hear a long conversation: 「明日の会議では新しいプロジェクトの進行状況を報告する予定です」. What is the main focus of tomorrow’s meeting?',
            type: 'single-choice',
            paragraph: 'Listen carefully to the key nouns and verbs in the sentence to understand the main topic.',
            options: [
                {
                    id: optionId++,
                    text: 'Reporting the progress of a new project.',
                    isCorrect: true,
                    explanation: '「新しいプロジェクトの進行状況を報告する」 indicates that the meeting focuses on reporting project progress.',
                    supportingLinks: [
                        {description: 'Lesson on Understanding Extended Conversations in Daily Life', url: '/'},
                    ],
                },
                {
                    id: optionId++,
                    text: 'Planning a party.',
                    isCorrect: false,
                    explanation: 'The sentence mentions a project report, not a social event.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: 'Discussing travel plans.',
                    isCorrect: false,
                    explanation: 'Travel is not mentioned; the conversation is work-related.',
                    supportingLinks: [],
                },
            ],
        },
        {
            id: questionId++,
            text: 'Which of the following phrases signal warnings, explanations, or instructions in daily life contexts? (Choose all that apply)',
            type: 'multiple-choice',
            paragraph: 'Focus on expressions commonly used to provide guidance, cautions, or detailed explanations.',
            options: [
                {
                    id: optionId++,
                    text: '～しないでください',
                    isCorrect: true,
                    explanation: 'This is a polite warning meaning "Please do not …".',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: '～してください',
                    isCorrect: true,
                    explanation: 'This is a polite instruction meaning "Please do …".',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: 'こんにちは',
                    isCorrect: false,
                    explanation: 'This is a greeting, not an instruction or warning.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: 'さようなら',
                    isCorrect: false,
                    explanation: 'This is a farewell, not a warning or instruction.',
                    supportingLinks: [],
                },
            ],
        },
        {
            id: questionId++,
            text: 'A public announcement says: 「明日の電車は点検のため遅延が予想されます」. What is the correct interpretation?',
            type: 'single-choice',
            paragraph: 'Focus on verbs and context to determine what travelers should expect.',
            options: [
                {
                    id: optionId++,
                    text: 'Trains will likely be delayed tomorrow due to maintenance.',
                    isCorrect: true,
                    explanation: '「遅延が予想されます」 means delays are expected, and 「点検のため」 indicates it is due to maintenance.',
                    supportingLinks: [
                        {description: 'Lesson on Listening to and Reading News, Announcements, and Public Information', url: '/'},
                    ],
                },
                {
                    id: optionId++,
                    text: 'All trains will run on time without issue.',
                    isCorrect: false,
                    explanation: 'The announcement predicts delays, not normal operation.',
                    supportingLinks: [],
                },
                {
                    id: optionId++,
                    text: 'The station will be closed.',
                    isCorrect: false,
                    explanation: 'The sentence does not mention closure, only train delays.',
                    supportingLinks: [],
                },
            ],
        },
    ],
},
]};