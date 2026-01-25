import type { Course, Module, Lesson, LessonContent, LessonVocabulary } from "../../types/Course";
import { dictionaryDb } from "./dictionary";


let courseId = 0;
let moduleId = 0;
let lessonId = 0;
let lessonContentId = 0;
let lessonVocabularyId = 0;

// Courses
let courses: Course[] = populateCourses();
// Modules
let modules: Module[] = populateModules();
// Lessons
let lessons: Lesson[] = populateLessons();
// Lesson Content
let lessonContents: LessonContent[] = populateLessonContents();
// Lesson Vocabulary
let lessonVocabulary: LessonVocabulary[] = populateLessonVocabulary();

export const coursesDb = {
    getAll: () => {
        return [...courses];
    },
    getById: (id: number) => {
        const course = courses.find(c => c.id === id);
        if (!course) throw new Error(`Course with id ${id} not found`);
        return course;
    },
    create: (course: Omit<Course, 'id'>) => {
        const newCourse: Course = {
            id: courseId++,
            ...course,
        };
        courses.push(newCourse);
        return newCourse;
    },
    update: (id: number, updates: Partial<Course>) => {
        const toUpdateIndex = courses.findIndex(c => c.id === id);
        if (toUpdateIndex === -1) throw new Error(`Course with id ${id} not found`);
        courses[toUpdateIndex] = {...courses[toUpdateIndex], ...updates};
        return courses[toUpdateIndex];
    },
    delete: (id: number) => {
        const lengthBefore = courses.length;
        courses = courses.filter(c => c.id !== id);
        if (lengthBefore !== courses.length)
            return true;
        else throw new Error(`Course with ${id} not found.`);
    },
}

export const modulesDb = {
    getAll: () => {
        return [...modules];
    },
    getById: (id: number) => {
        const module = modules.find(m => m.id === id);
        if (!module) throw new Error(`Module with id ${id} not found`);
        return module;
    },
    getCourseModules: (courseId: number) => {
        const courseModules = modules.filter(m => m.courseId === courseId);
        return courseModules;
    },
    create: (module: Omit<Module, 'id'>) => {
        const newModule: Module = {
            id: moduleId++,
            ...module,
        };
        modules.push(newModule);
        return newModule;
    },
    update: (id: number, updates: Partial<Module>) => {
        const toUpdateIndex = modules.findIndex(m => m.id === id);
        if (toUpdateIndex === -1) throw new Error(`Module with id ${id} not found`);
        modules[toUpdateIndex] = {...modules[toUpdateIndex], ...updates};
        return modules[toUpdateIndex];
    },
    delete: (id: number) => {
        const lengthBefore = modules.length;
        modules = modules.filter(m => m.id !== id);
        if (lengthBefore !== modules.length)
            return true;
        else throw new Error(`Module with ${id} not found.`);
    },
}

export const lessonsDb = {
    getAll: () => {
        return [...lessons];
    },
    getById: (id: number) => {
        const lesson = lessons.find(l => l.id === id);
        if (!lesson) throw new Error(`Lesson with id ${id} not found`);
        return lesson;
    },
    getCourseLessons: (courseId: number) => {        
        const courseModules = modulesDb.getCourseModules(courseId);        
        const moduleIds = courseModules.map(m => m.id);
        const courseLessons = lessons.filter(l => moduleIds.includes(l.moduleId));        
        return courseLessons;
    },
    getModuleLessons: (moduleId: number) => {
        const moduleLessons = lessons.filter(l => l.moduleId === moduleId);        
        return moduleLessons;
    },
    getLessonVocabulary: (lessonId: number) => {
        return lessonVocabularyDb.getLessonVocab(lessonId);
    },
    getLessonContent: (lessonId: number) => {
        return lessonContentsDb.getLessonContent(lessonId);
    },
    create: (lesson: Omit<Lesson, 'id'>) => {
        const newLesson: Lesson = {
            id: lessonId++,
            ...lesson,
        };
        lessons.push(newLesson);
        return newLesson;
    },
    update: (id: number, updates: Partial<Lesson>) => {
        const toUpdateIndex = lessons.findIndex(l => l.id === id);
        if (toUpdateIndex === -1) throw new Error(`Lesson with id ${id} not found`);
        lessons[toUpdateIndex] = {...lessons[toUpdateIndex], ...updates};
        return lessons[toUpdateIndex];
    },
    delete: (id: number) => {
        const lengthBefore = lessons.length;
        lessons = lessons.filter(l => l.id !== id);
        if (lengthBefore !== lessons.length)
            return true;
        else throw new Error(`Lesson with ${id} not found.`);
    }
}

// inner API, not exposed to client (for now)
export const lessonContentsDb = {
    getAll: () => {
        return [...lessonContents];
    },
    getById: (id: number) => {
        const lessonContent = lessonContents.find(lC => lC.id === id);
        if (!lessonContent) throw new Error(`Lesson content with id ${id} not found`);
        return lessonContent;
    },
    getLessonContent: (lessonId: number) => {
        const lessonContent = lessonContents.filter(lC => lC.lessonId === lessonId);        
        return lessonContent;
    },    
    create: (lessonContent: Omit<LessonContent, 'id'>) => {
        const newLessonContent: LessonContent = {
            id: lessonContentId++,
            ...lessonContent,
        };
        lessonContents.push(newLessonContent);
        return newLessonContent;
    },
    update: (id: number, updates: Partial<LessonContent>) => {
        const toUpdateIndex = lessonContents.findIndex(lC => lC.id === id);
        if (toUpdateIndex === -1) throw new Error(`Lesson content with id ${id} not found`);
        lessonContents[toUpdateIndex] = {...lessonContents[toUpdateIndex], ...updates};
        return lessonContents[toUpdateIndex];
    },
    delete: (id: number) => {
        const lengthBefore = lessonContents.length;
        lessonContents = lessonContents.filter(lC => lC.id !== id);
        if (lengthBefore !== lessonContents.length)
            return true;
        else throw new Error(`Lesson content with id ${id} not found`);
    }
}

// inner API, not exposed to client (for now)
export const lessonVocabularyDb = {
    getAll: () => {
        return [...lessonVocabulary];
    },
    getById: (id: number) => {
        const lessonVocab = lessonVocabulary.find(lV => lV.id === id);
        if (!lessonVocab) throw new Error(`Lesson vocabulary with id ${id} not found`);
        return lessonVocab;
    },
    getLessonVocab: (lessonId: number) => {
        const lessonVocab = lessonVocabulary.filter(lV => lV.lessonId === lessonId);        
        const lessonVocabData = lessonVocab.map(lV => dictionaryDb.getById(lV.dictionaryId));
        return lessonVocabData;
    },    
    create: (lessonVocab: Omit<LessonVocabulary, 'id'>) => {
        const newLessonVocab: LessonVocabulary = {
            id: lessonVocabularyId++,
            ...lessonVocab,
        };
        lessonVocabulary.push(newLessonVocab);
        return newLessonVocab;
    },
    update: (id: number, updates: Partial<LessonVocabulary>) => {
        const toUpdateIndex = lessonVocabulary.findIndex(lV => lV.id === id);
        if (toUpdateIndex === -1) throw new Error(`Lesson vocabulary with id ${id} not found`);
        lessonVocabulary[toUpdateIndex] = {...lessonVocabulary[toUpdateIndex], ...updates};
        return lessonVocabulary[toUpdateIndex];
    },
    delete: (id: number) => {
        const lengthBefore = lessonVocabulary.length;
        lessonVocabulary = lessonVocabulary.filter(lV => lV.id !== id);
        if (lengthBefore !== lessonVocabulary.length)
            return true;
        else throw new Error(`Lesson vocabulary with id ${id} not found`);
    }
}

function populateCourses(): Course[] {return [
    { id: courseId++ },
    { id: courseId++ },
    { id: courseId++ },
    { id: courseId++ },
    { id: courseId++ },
    { id: courseId++ },
    { id: courseId++ },
]};

function populateModules(): Module[] {return [
    { id: moduleId++, name: "Daily Life Interactions", duration: 1, courseId: 0 },    
    { id: moduleId++, name: "Public Places & Services", duration: 2, courseId: 0 },    
    { id: moduleId++, name: "Social Situations", duration: 1, courseId: 0 },

    { id: moduleId++, name: "Getting Around in Japan", duration: 2, courseId: 1 },    
    { id: moduleId++, name: "Travel Essentials", duration: 4, courseId: 1 },    

    { id: moduleId++, name: "Everyday Office Communication", duration: 4, courseId: 2 },    
    { id: moduleId++, name: "Meetings and Professional Interaction", duration: 3, courseId: 2 },    

    { id: moduleId++, name: "Japanese Cooking Vocabulary and Instructions", duration: 6, courseId: 3 },    
    { id: moduleId++, name: "Exploring Food Culture and Conversations", duration: 8, courseId: 3 },    
    
    { id: moduleId++, name: "Daily Health Communication", duration: 4, courseId: 4 },    
    { id: moduleId++, name: "Wellness and Lifestyle Conversations", duration: 5, courseId: 4 },    
    
    { id: moduleId++, name: "Analyzing News and Opinion Texts", duration: 5, courseId: 5 },    
    { id: moduleId++, name: "Exploring Real-Life Dialogue and Media", duration: 8, courseId: 5 },

    { id: moduleId++, name: "Complex Everyday Situations", duration: 7, courseId: 6 },
    { id: moduleId++, name: "Media and Social Contexts", duration: 8, courseId: 6 },
]};

function populateLessons(): Lesson[] {return [
    { id: lessonId++, name: "Listening to Casual Conversations", duration: 0.5, moduleId: 0, previousLessonId: null, nextLessonId: 1},    
    { id: lessonId++, name: "Understanding Common Follow-up Questions", duration: 1, moduleId: 0, previousLessonId: 0, nextLessonId: 2},    
    { id: lessonId++, name: "Listening at Shops and Restaurants", duration: 1, moduleId: 1, previousLessonId: 1, nextLessonId: 3},    
    { id: lessonId++, name: "Understanding Announcements and Requests", duration: 2, moduleId: 1, previousLessonId: 2, nextLessonId: 4},    
    { id: lessonId++, name: "Listening to Invitations and Plans", duration: 1, moduleId: 2, previousLessonId: 3, nextLessonId: 5},    
    { id: lessonId++, name: "Understanding Opinions and Simple Explanations", duration: 3, moduleId: 2, previousLessonId: 4, nextLessonId: null},        
    
    { id: lessonId++, name: "Understanding Basic Directions and Signs", duration: 3, moduleId: 3, previousLessonId: null, nextLessonId: 7},        
    { id: lessonId++, name: "Asking for Help and Simple Information", duration: 1, moduleId: 3, previousLessonId: 6, nextLessonId: 8},        
    { id: lessonId++, name: "Using Transportation and Tickets", duration: 2, moduleId: 4, previousLessonId: 7, nextLessonId: 9},        
    { id: lessonId++, name: "Handling Basic Hotel and Airport Situations", duration: 3, moduleId: 4, previousLessonId: 8, nextLessonId: null},        

    { id: lessonId++, name: "Understanding Workplace Greetings and Small Talk", duration: 3, moduleId: 5, previousLessonId: null, nextLessonId: 11},        
    { id: lessonId++, name: "Following Instructions and Task Updates", duration: 1, moduleId: 5, previousLessonId: 10, nextLessonId: 12},        
    { id: lessonId++, name: "Understanding Opinions and Suggestions at Work", duration: 4, moduleId: 6, previousLessonId: 11, nextLessonId: 13},
    { id: lessonId++, name: "Handling Requests, Problems, and Clarifications", duration: 3, moduleId: 6, previousLessonId: 12, nextLessonId: null},        

    { id: lessonId++, name: "Understanding Recipe Language and Cooking Verbs", duration: 3, moduleId: 7, previousLessonId: null, nextLessonId: 15},        
    { id: lessonId++, name: "Following Spoken Cooking Instructions", duration: 3, moduleId: 7, previousLessonId: 14, nextLessonId: 16},        
    { id: lessonId++, name: "Discussing Ingredients, Taste, and Preferences", duration: 3, moduleId: 8, previousLessonId: 15, nextLessonId: 17},        
    { id: lessonId++, name: "Talking About Food Culture and Traditions", duration: 3, moduleId: 8, previousLessonId: 16, nextLessonId: null},        
    
    { id: lessonId++, name: "Talking About Symptoms and Health Conditions", duration: 3, moduleId: 9, previousLessonId: null, nextLessonId: 19},        
    { id: lessonId++, name: "Understanding Medical Advice and Instructions", duration: 4, moduleId: 9, previousLessonId: 18, nextLessonId: 20},        
    { id: lessonId++, name: "Discussing Diet, Exercise, and Habits", duration: 5, moduleId: 10, previousLessonId: 19, nextLessonId: 21},        
    { id: lessonId++, name: "Mental Wellbeing and Stress Management Discussions", duration: 2, moduleId: 10, previousLessonId: 20, nextLessonId: null},        

    { id: lessonId++, name: "Understanding Main Ideas and Author Perspective", duration: 2, moduleId: 11, previousLessonId: null, nextLessonId: 23},        
    { id: lessonId++, name: "Identifying Arguments, Evidence, and Implicit Meaning", duration: 2, moduleId: 11, previousLessonId: 22, nextLessonId: 24},        
    { id: lessonId++, name: "Following Complex Conversations in Interviews and Panels", duration: 2, moduleId: 12, previousLessonId: 23, nextLessonId: 25},        
    { id: lessonId++, name: "Comprehending Reports, Reviews, and Commentaries", duration: 2, moduleId: 12, previousLessonId: 24, nextLessonId: null},        

    { id: lessonId++, name: "Understanding Extended Conversations in Daily Life", duration: 5, moduleId: 13, previousLessonId: null, nextLessonId: 27},        
    { id: lessonId++, name: "Following Instructions, Warnings, and Explanations", duration: 4, moduleId: 13, previousLessonId: 26, nextLessonId: 28},        
    { id: lessonId++, name: "Listening to and Reading News, Announcements, and Public Information", duration: 7, moduleId: 14, previousLessonId: 27, nextLessonId: 29},        
    { id: lessonId++, name: "Understanding Opinions, Debates, and Social Discussions", duration: 2, moduleId: 14, previousLessonId: 28, nextLessonId: null},        
]};

function populateLessonContents(): LessonContent[] {return [
    {
        id: lessonContentId++,
        lessonId: 0,        
        heading: "Introduction: Why Natural Conversations Matter",
        content: {type: 'paragraph', text: 'In this lesson, you will focus on short, natural conversations between friends, classmates, and coworkers. Unlike textbook dialogues, these conversations reflect how Japanese is actually spoken in daily life. Speakers may hesitate, repeat themselves, or change the topic mid-sentence. At first, this may feel fast or confusing, but the goal is to build real-world listening skills rather than memorizing grammar rules.'},
    },
    {
        id: lessonContentId++,
        lessonId: 0,        
        heading: "Understanding General Meaning",
        content: {type: 'paragraph', text: 'At the N4 level, it is normal to miss some words or expressions. The most important skill is to understand the situation, the relationship between speakers, and the main topic. For example, you may hear someone talking about plans for the weekend, but not every detail. Instead of translating every word, try to focus on keywords and the overall flow.'},
    },
    {
        id: lessonContentId++,
        lessonId: 0,                
        content: {type: 'paragraph', text: 'Key strategies:'},
    },
    {
        id: lessonContentId++,
        lessonId: 0,                
        content: {type: 'list', items: ['Listen without pausing too often to translate.', 'Focus on familiar words and phrases you already know.', 'Use context to infer meanings of unknown words.']},
    },
    {
        id: lessonContentId++,
        lessonId: 0,        
        heading: "Recognizing Casual Forms",
        content: {type: 'paragraph', text: 'In everyday Japanese, speakers often use shortened sentences, informal endings, and filler words. Words like えっと (uh), まあ (well), and そうね (let’s see) appear frequently. You may also hear casual verb endings like ～んだ or ～だよ. These forms make speech sound natural but are often skipped in textbooks. Pay attention to how these expressions are used and try to notice patterns, such as how speakers respond to questions or show agreement.'},
    },
    {
        id: lessonContentId++,
        lessonId: 0,                
        content: {type: 'paragraph', text: 'Listening tips:'},
    },
    {
        id: lessonContentId++,
        lessonId: 0,                
        content: {type: 'list', items: ['Notice the tone and rhythm, not just the words.', 'Pay attention to repeated phrases—they often signal important ideas.', 'Don’t stress about unknown grammar; focus on overall comprehension.']},
    },
    {
        id: lessonContentId++,
        lessonId: 0,        
        heading: "Practice Techniques",
        content: {type: 'paragraph', text: 'Repetition is key. Listen to the same conversation multiple times, ideally on different days. The first time, focus on general meaning. The second time, listen for specific expressions and words. The third time, try to summarize the conversation in Japanese or in your own language. This gradual approach strengthens both listening comprehension and memory.'},
    },
    {
        id: lessonContentId++,
        lessonId: 0,
        heading: 'Understanding は vs が particles',
        content: {type: 'image', url: '/storage/lessons/lessonImages/0.png'},
    },
    {
        id: lessonContentId++,
        lessonId: 0,                
        content: {type: 'paragraph', text: 'Additional practice:'},
    },
    {
        id: lessonContentId++,
        lessonId: 0,                
        content: {type: 'list', items: ['Shadow the audio by repeating words and phrases out loud.', 'Write down words or expressions you recognize and check their meaning later.', 'Compare your notes with the actual conversation transcript if available.']},
    },
    {
        id: lessonContentId++,
        lessonId: 0,        
        heading: "Summary",
        content: {type: 'paragraph', text: 'In this lesson, you learned how to approach casual, natural conversations in Japanese. The focus is on understanding the overall meaning, recognizing casual speech forms, and using repeated exposure to build listening skills. Remember, comprehension will grow over time; missing words is normal. The key is consistent practice and listening with attention to context, rhythm, and tone. Over time, casual Japanese will feel more natural, and you will gain confidence in real-world conversations.'},
    },
    {
        id: lessonContentId++,
        lessonId: 1,        
        heading: "Introduction: Why Follow-up Questions Matter",
        content: {type: 'paragraph', text: 'In everyday conversations, the first question is rarely the last. After a basic greeting or topic introduction, Japanese speakers often ask follow-up questions to keep the conversation flowing. At the N4 level, these questions may seem fast or unexpected, but learning to recognize them is crucial for natural comprehension. Understanding follow-up questions helps you respond appropriately, maintain the conversation, and sound more fluent.'},
    },
    {
        id: lessonContentId++,
        lessonId: 1,        
        heading: "Common Types of Follow-up Questions",
        content: {type: 'paragraph', text: 'Follow-up questions often seek clarification, confirmation, or additional details. Some examples include:'},
    },
    {
        id: lessonContentId++,
        lessonId: 1,
        heading: 'Degrees of refering to another person',
        content: {type: 'image', url: '/storage/lessons/lessonImages/1.png'},
    },
    {
        id: lessonContentId++,
        lessonId: 1,                
        content: {type: 'list', items: ['Clarifying questions: 「どういう意味ですか？」 (What do you mean?) or 「もう一度言ってくれますか？」 (Could you say that again?)', 'Confirmation questions: 「本当ですか？」 (Really?) or 「そうですか？」 (Is that so?)', 'Detail questions: 「どこで会うの？」 (Where shall we meet?) or 「何時に始まりますか？」 (What time does it start?)']},
    },
    {
        id: lessonContentId++,
        lessonId: 1,                
        content: {type: 'paragraph', text: 'Recognizing these patterns helps you predict the type of answer expected and reduces the stress of listening in real time.'},
    },
    {
        id: lessonContentId++,
        lessonId: 1,        
        heading: "Tips for Recognizing Follow-up Questions",
        content: {type: 'paragraph', text: 'Follow-up questions are often signaled by tone, sentence endings, or context. For example, rising intonation at the end of a sentence usually indicates a question. Particles like か, の, or ね also hint at questioning or seeking agreement. Additionally, speakers may repeat a key word from your previous response to confirm or expand on it.'},
    },
    {
        id: lessonContentId++,
        lessonId: 1,        
        heading: "Listening strategies:",
        content: {type: 'list', items: ['Focus on the last part of a sentence; this is where the question usually appears.', 'Pay attention to rising intonation and questioning particles.', 'Look for repeated words or topics from your previous answer.']},
    },
    {
        id: lessonContentId++,
        lessonId: 1,        
        heading: "Practice Techniques",
        content: {type: 'paragraph', text: 'To improve, listen to short dialogues and pause after each line to predict the follow-up question. Repeat the dialogue multiple times, focusing first on general meaning and then on specific questions. Try answering out loud, even if it’s simple, to reinforce comprehension and speaking confidence.'},
    },
    {
        id: lessonContentId++,
        lessonId: 1,        
        heading: "Additional exercises:",
        content: {type: 'list', items: ['Write down the follow-up questions you hear and practice answering them.', 'Compare your predicted answers with the actual responses in the dialogue.', 'Practice with a partner or language app to simulate real conversation dynamics.']},
    },
    {
        id: lessonContentId++,
        lessonId: 1,        
        heading: "Summary",
        content: {type: 'paragraph', text: 'In this lesson, you learned to identify and understand common follow-up questions in everyday Japanese. By recognizing question types, intonation patterns, and key particles, you can better anticipate the next part of a conversation and respond naturally. Regular listening practice and repetition are essential for reinforcing this skill. Over time, follow-up questions will become easier to catch, making daily conversations smoother and more enjoyable.'},
    },
    {
    id: lessonContentId++,
    lessonId: 2,
    heading: "Introduction: Listening in Everyday Service Situations",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will practice listening to conversations that happen in shops, cafés, and restaurants. These situations are very common in daily life in Japan, but they can feel stressful because the exchanges are fast and often follow fixed patterns. The goal of this lesson is to help you recognize those patterns and feel more comfortable listening without panic.'
    }
},
{
    id: lessonContentId++,
    lessonId: 2,
    content: {
        type: 'paragraph',
        text: 'Service staff usually speak politely but quickly, and they often assume the listener understands the context. You may not understand every word, but you can still follow the conversation by focusing on what stage of the interaction you are in, such as ordering, paying, or being asked a question.'
    }
},
{
    id: lessonContentId++,
    lessonId: 2,
    heading: "Common Listening Situations",
    content: {
        type: 'paragraph',
        text: 'You will hear dialogues from places like convenience stores, restaurants, and small shops. These conversations often include greetings, short questions, and set expressions. Because the situations are predictable, listening becomes easier with repeated exposure.'
    }
},
{
    id: lessonContentId++,
    lessonId: 2,
    content: {
        type: 'list',
        items: [
            'Being asked if you want a bag or receipt',
            'Ordering food or drinks',
            'Confirming quantities or prices',
            'Responding to polite questions from staff'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 2,
    heading: "Recognizing Set Phrases",
    content: {
        type: 'paragraph',
        text: 'In shops and restaurants, many phrases are repeated every day. Expressions like いらっしゃいませ, こちらでお召し上がりですか, or レシートはご利用ですか appear frequently. You do not need to analyze their grammar. Instead, focus on recognizing their sound and the situation in which they appear.'
    }
},
{
    id: lessonContentId++,
    lessonId: 2,
    content: {
        type: 'paragraph',
        text: 'Often, you can understand what is being asked before the sentence finishes. This skill develops naturally as you listen more. Try to notice how staff members pause slightly before key words such as numbers, prices, or choices.'
    }
},
{
    id: lessonContentId++,
    lessonId: 2,
    heading: "Listening Strategies for Service Conversations",
    content: {
        type: 'list',
        items: [
            'Focus on keywords like numbers, counters, and food names',
            'Use context to guess meaning instead of translating',
            'Pay attention to polite verb endings like ～ます and ～です',
            'Notice repeated expressions used across different shops'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 2,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'Listen to each dialogue multiple times. On the first listen, try to understand the situation only. On the second listen, focus on what questions are being asked. On the third listen, try to imagine yourself responding naturally, even with simple answers.'
    }
},
{
    id: lessonContentId++,
    lessonId: 2,
    content: {
        type: 'paragraph',
        text: 'Do not worry if you feel overwhelmed at first. These conversations are short, repetitive, and highly structured. With continued exposure, your brain will begin to recognize patterns automatically, making real-life shopping and dining much less stressful.'
    }
},
{
    id: lessonContentId++,
    lessonId: 2,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you practiced listening to common conversations in shops and restaurants. You learned to rely on context, recognize set phrases, and focus on key information rather than every word. These skills will help you navigate everyday service situations in Japanese with greater confidence and ease.'
    }
},
{
    id: lessonContentId++,
    lessonId: 3,
    heading: "Introduction: Listening Without Interaction",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will practice listening to announcements and public requests. Unlike conversations, these situations usually do not allow you to ask for clarification. Announcements appear in places such as trains, stations, buildings, and stores, and understanding them is an important real-life listening skill.'
    }
},
{
    id: lessonContentId++,
    lessonId: 3,
    content: {
        type: 'paragraph',
        text: 'Announcements are often spoken clearly but at a steady pace. They may contain polite language and formal expressions, which can feel difficult at first. However, the content is usually limited and follows familiar patterns, making it possible to understand the message even if you miss some details.'
    }
},
{
    id: lessonContentId++,
    lessonId: 3,
    heading: "Common Types of Announcements",
    content: {
        type: 'paragraph',
        text: 'You will hear different kinds of announcements related to daily life. These messages are designed to inform or guide many people at once. The key is to identify what action, if any, is required from the listener.'
    }
},
{
    id: lessonContentId++,
    lessonId: 3,
    content: {
        type: 'list',
        items: [
            'Train and bus announcements about stops or delays',
            'In-store announcements about sales or closing time',
            'Public requests asking people to follow rules',
            'Short warnings or reminders in buildings'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 3,
    heading: "Understanding Requests and Instructions",
    content: {
        type: 'paragraph',
        text: 'Many announcements include polite requests rather than direct commands. Expressions like お願いいたします, ご協力ください, or ～ないようにしてください are commonly used. These forms may sound long, but they often signal that the listener is being asked to do something specific.'
    }
},
{
    id: lessonContentId++,
    lessonId: 3,
    content: {
        type: 'paragraph',
        text: 'Try to listen for verbs that indicate actions, such as 待つ, 立つ, 乗る, or 使う. Even if you do not understand the entire sentence, recognizing the action can help you understand the purpose of the announcement.'
    }
},
{
    id: lessonContentId++,
    lessonId: 3,
    heading: "Listening Strategies for Announcements",
    content: {
        type: 'list',
        items: [
            'Listen for keywords related to place, time, or action',
            'Ignore unnecessary polite phrases at first',
            'Focus on what you are expected to do or not do',
            'Use the situation to predict the message'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 3,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'When practicing, listen to each announcement more than once. On the first listen, identify the setting, such as a train or store. On the second listen, focus on the key message or request. On later listens, notice how polite language is used to soften instructions.'
    }
},
{
    id: lessonContentId++,
    lessonId: 3,
    content: {
        type: 'paragraph',
        text: 'It is normal for announcements to feel difficult at first because there is no visual support. Over time, repeated exposure will train you to catch important information quickly and remain calm even when you do not understand everything.'
    }
},
{
    id: lessonContentId++,
    lessonId: 3,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you learned how to approach announcements and public requests in Japanese. By focusing on keywords, actions, and context, you can understand the main message without needing full comprehension. These skills are essential for navigating public spaces confidently in Japan.'
    }
},
{
    id: lessonContentId++,
    lessonId: 4,
    heading: "Introduction: Conversations About Plans",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will listen to conversations about invitations and future plans. These situations include talking about meeting friends, making plans for the weekend, or inviting someone to join an activity. Understanding these conversations is important for building real social connections in Japanese.'
    }
},
{
    id: lessonContentId++,
    lessonId: 4,
    content: {
        type: 'paragraph',
        text: 'Unlike service interactions, conversations about plans are more flexible and personal. Speakers may hesitate, change ideas, or speak indirectly. This can make listening more challenging, but it also reflects how real Japanese conversations naturally unfold.'
    }
},
{
    id: lessonContentId++,
    lessonId: 4,
    heading: "Common Invitation Patterns",
    content: {
        type: 'paragraph',
        text: 'Invitations in Japanese are often soft and indirect. Instead of directly saying “let’s do this,” speakers may use forms that sound more like suggestions. Recognizing these patterns will help you understand when someone is inviting you, even if it does not sound like a clear question.'
    }
},
{
    id: lessonContentId++,
    lessonId: 4,
    content: {
        type: 'list',
        items: [
            'Using ～ませんか to suggest an activity',
            'Saying 今度 or 週末に when talking about future time',
            'Pausing or using けど to soften an invitation',
            'Asking about availability before inviting'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 4,
    heading: "Listening for Dates, Times, and Decisions",
    content: {
        type: 'paragraph',
        text: 'When people make plans, important information often includes dates, times, and places. These details may be repeated or adjusted during the conversation. Focus on listening for numbers, days of the week, and location words rather than every sentence.'
    }
},
{
    id: lessonContentId++,
    lessonId: 4,
    content: {
        type: 'paragraph',
        text: 'You may also hear expressions that signal uncertainty, such as たぶん or まだわからない. These indicate that plans are not final. Understanding this helps you follow the flow of the conversation and avoid confusion.'
    }
},
{
    id: lessonContentId++,
    lessonId: 4,
    heading: "Listening Strategies for Planning Conversations",
    content: {
        type: 'list',
        items: [
            'Identify whether the speaker is inviting, suggesting, or confirming',
            'Listen carefully for time expressions and numbers',
            'Notice hesitation or uncertainty in the speaker’s tone',
            'Focus on the final decision, not every idea mentioned'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 4,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'Listen to each conversation several times. On the first listen, identify the general plan being discussed. On the second listen, focus on when and where. On later listens, notice how speakers agree, hesitate, or change their minds during the conversation.'
    }
},
{
    id: lessonContentId++,
    lessonId: 4,
    content: {
        type: 'paragraph',
        text: 'Try imagining yourself as one of the speakers. Even if your answers are simple, responding mentally helps reinforce understanding and prepares you for real-life interactions.'
    }
},
{
    id: lessonContentId++,
    lessonId: 4,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you practiced listening to invitations and conversations about plans. You learned to recognize indirect invitations, track important details, and follow changes in plans. These skills will help you participate more naturally in social conversations in Japanese.'
    }
},
{
    id: lessonContentId++,
    lessonId: 5,
    heading: "Introduction: Listening Beyond Facts",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will practice listening to opinions and simple explanations in everyday Japanese. These conversations go beyond basic information and focus on what someone thinks, feels, or believes. Understanding opinions is an important step toward deeper communication and real conversation.'
    }
},
{
    id: lessonContentId++,
    lessonId: 5,
    content: {
        type: 'paragraph',
        text: 'At the N4 level, opinions are usually expressed in short, simple sentences. Speakers may explain their reasons briefly or give examples from daily life. The language is often casual, especially when talking with friends or classmates.'
    }
},
{
    id: lessonContentId++,
    lessonId: 5,
    heading: "Common Ways Opinions Are Expressed",
    content: {
        type: 'paragraph',
        text: 'Japanese speakers often express opinions indirectly. Instead of stating a strong opinion, they may soften their language to sound polite or modest. Recognizing these expressions helps you understand the speaker’s true meaning.'
    }
},
{
    id: lessonContentId++,
    lessonId: 5,
    content: {
        type: 'list',
        items: [
            'Using と思います to express an opinion',
            'Saying ～かな to show uncertainty',
            'Using ちょっと or あまり to soften statements',
            'Ending sentences with けど to leave things open'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 5,
    heading: "Understanding Simple Explanations",
    content: {
        type: 'paragraph',
        text: 'Simple explanations often follow a clear pattern: an opinion or statement, followed by a short reason. Words like から or ので may appear, but sometimes the reason is implied through context rather than stated directly.'
    }
},
{
    id: lessonContentId++,
    lessonId: 5,
    content: {
        type: 'paragraph',
        text: 'When listening, focus on the main idea first. Even if you miss the reason, understanding what the speaker thinks is usually enough to follow the conversation. Over time, you will naturally begin to catch more details.'
    }
},
{
    id: lessonContentId++,
    lessonId: 5,
    heading: "Listening Strategies for Opinions",
    content: {
        type: 'list',
        items: [
            'Listen for phrases that signal opinions',
            'Pay attention to tone and hesitation',
            'Focus on the main idea, not every word',
            'Use context to understand unstated reasons'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 5,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'Listen to each dialogue several times. On the first listen, identify whose opinion is being expressed. On the second listen, focus on whether the speaker is positive, negative, or unsure. On later listens, notice how explanations are structured.'
    }
},
{
    id: lessonContentId++,
    lessonId: 5,
    content: {
        type: 'paragraph',
        text: 'Try summarizing the opinion in one simple sentence. This helps reinforce comprehension and prepares you to respond naturally in your own conversations.'
    }
},
{
    id: lessonContentId++,
    lessonId: 5,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you practiced understanding opinions and simple explanations in Japanese. You learned to recognize indirect expressions, focus on main ideas, and use context to fill in missing details. These skills will help you engage more confidently in everyday conversations and discussions.'
    }
},

{
    id: lessonContentId++,
    lessonId: 6,
    heading: "Introduction: Reading and Listening in Public Places",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will learn how to understand basic directions and signs in Japan. These are things you see and hear every day while traveling, such as in stations, streets, and buildings. Even simple understanding can make traveling much easier and less stressful.'
    }
},
{
    id: lessonContentId++,
    lessonId: 6,
    content: {
        type: 'paragraph',
        text: 'Many signs use short words, arrows, and symbols. Spoken directions are also often simple and repeated. You do not need perfect understanding. The goal is to recognize important words and connect them to what you see around you.'
    }
},
{
        id: lessonContentId++,
        lessonId: 6,
        heading: 'Degrees of refering to another person',
        content: {type: 'image', url: '/storage/lessons/lessonImages/1.png'},
    },
{
    id: lessonContentId++,
    lessonId: 6,
    heading: "Common Direction Words",
    content: {
        type: 'paragraph',
        text: 'You will hear and see basic direction words used in public places. These words are often combined with gestures or signs, making them easier to understand. Learning to recognize them quickly will help you move with confidence.'
    }
},
{
    id: lessonContentId++,
    lessonId: 6,
    content: {
        type: 'list',
        items: [
            '右 and 左 for right and left',
            '前 and 後ろ for front and back',
            '上 and 下 for up and down',
            'まっすぐ for straight ahead'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 6,
    heading: "Understanding Signs and Symbols",
    content: {
        type: 'paragraph',
        text: 'In Japan, many signs include simple Japanese words with clear symbols. For example, exits, restrooms, and platforms are clearly marked. Even if you cannot read everything, recognizing key words helps you understand the message.'
    }
},
{
    id: lessonContentId++,
    lessonId: 6,
    content: {
        type: 'paragraph',
        text: 'Announcements and signs often repeat the same information. This gives you more chances to understand. Do not rush. Take a moment to connect the words you hear with the place you are in.'
    }
},
{
    id: lessonContentId++,
    lessonId: 6,
    heading: "Listening Tips for Directions",
    content: {
        type: 'list',
        items: [
            'Look at signs while listening to directions',
            'Focus on one keyword at a time',
            'Use arrows and maps as visual support',
            'Do not worry about long sentences'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 6,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'Listen to short direction phrases several times. First, listen while looking at a map or image. Next, listen again and point to the direction being described. This helps your brain connect language with movement.'
    }
},
{
    id: lessonContentId++,
    lessonId: 6,
    content: {
        type: 'paragraph',
        text: 'Repeat the words out loud if possible. Speaking helps you remember and recognize the sounds later when you hear them in real situations.'
    }
},
{
    id: lessonContentId++,
    lessonId: 6,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you learned how to understand basic directions and signs in Japanese. By focusing on key words, symbols, and context, you can navigate public places more easily. These skills are essential for comfortable and confident travel in Japan.'
    }
},
{
    id: lessonContentId++,
    lessonId: 7,
    heading: "Introduction: Getting Help While Traveling",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will learn how to understand and use simple Japanese when asking for help. While traveling, you may need to ask for directions, locations, or basic information. Even short phrases can be very effective in these situations.'
    }
},
{
    id: lessonContentId++,
    lessonId: 7,
    content: {
        type: 'paragraph',
        text: 'People in Japan are generally willing to help, even if your Japanese is limited. Clear pronunciation and polite expressions make communication smoother. Listening carefully to the response is just as important as asking the question.'
    }
},
{
    id: lessonContentId++,
    lessonId: 7,
    heading: "Common Situations for Asking Help",
    content: {
        type: 'paragraph',
        text: 'You will hear simple questions used in everyday travel situations. These questions are usually short and focus on one key piece of information. Learning to recognize these patterns helps you understand both the question and the answer.'
    }
},
{
    id: lessonContentId++,
    lessonId: 7,
    content: {
        type: 'list',
        items: [
            'Asking where something is',
            'Asking how to get to a place',
            'Asking if someone speaks English',
            'Asking for confirmation or repetition'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 7,
    heading: "Key Phrases to Listen For",
    content: {
        type: 'paragraph',
        text: 'When asking for help, certain phrases appear often. Words like どこ, どうやって, or ありますか signal a question. In responses, listen for place names, direction words, or gestures that support the spoken language.'
    }
},
{
    id: lessonContentId++,
    lessonId: 7,
    content: {
        type: 'paragraph',
        text: 'You may also hear polite endings such as ～です or ～ます. These forms do not change the main meaning. Focus on the key words instead of trying to understand every part of the sentence.'
    }
},
{
    id: lessonContentId++,
    lessonId: 7,
    heading: "Listening Strategies for Help Situations",
    content: {
        type: 'list',
        items: [
            'Listen for place names and direction words',
            'Watch the speaker’s gestures',
            'Ask for repetition if needed',
            'Stay calm and listen to the full response'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 7,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'Practice by listening to short question-and-answer dialogues. First, identify the question being asked. Next, listen for the main information in the response. Do not worry if you miss small details.'
    }
},
{
    id: lessonContentId++,
    lessonId: 7,
    content: {
        type: 'paragraph',
        text: 'Try repeating the question out loud and imagining yourself asking it in real life. This builds confidence and helps prepare you for actual travel situations.'
    }
},
{
    id: lessonContentId++,
    lessonId: 7,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you learned how to ask for help and understand simple information in Japanese. By focusing on key phrases, gestures, and context, you can communicate effectively even with limited language ability. These skills are essential for safe and enjoyable travel.'
    }
},
{
    id: lessonContentId++,
    lessonId: 8,
    heading: "Introduction: Moving Around by Train and Bus",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will learn how to understand basic Japanese used when traveling by train, bus, or subway. Transportation is a big part of daily life in Japan, and even simple listening skills can help you move around more smoothly.'
    }
},
{
    id: lessonContentId++,
    lessonId: 8,
    content: {
        type: 'paragraph',
        text: 'You will hear common words and short phrases related to tickets, gates, and destinations. These expressions are often repeated and supported by signs, making them easier to understand with practice.'
    }
},
{
    id: lessonContentId++,
    lessonId: 8,
    heading: "Common Transportation Situations",
    content: {
        type: 'paragraph',
        text: 'Transportation conversations are usually short and task-focused. You may hear announcements, staff instructions, or simple questions at ticket counters. Understanding the situation helps you predict what information is important.'
    }
},
{
    id: lessonContentId++,
    lessonId: 8,
    content: {
        type: 'list',
        items: [
            'Buying a ticket from a machine or counter',
            'Passing through ticket gates',
            'Listening for train or bus destinations',
            'Asking which platform or stop to use'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 8,
    heading: "Listening for Key Words",
    content: {
        type: 'paragraph',
        text: 'When using transportation, certain words appear often. Listen for station names, numbers, and time expressions. You may also hear words like 切符, 乗り場, or 出口, which help you understand what action to take.'
    }
},
{
    id: lessonContentId++,
    lessonId: 8,
    content: {
        type: 'paragraph',
        text: 'Announcements may sound fast, but the most important information is usually repeated. Do not try to catch everything. Focus on recognizing familiar sounds and matching them to what you see.'
    }
},
{
    id: lessonContentId++,
    lessonId: 8,
    heading: "Listening Strategies for Transportation",
    content: {
        type: 'list',
        items: [
            'Listen for station names and numbers',
            'Check signs while listening',
            'Notice repeated words in announcements',
            'Focus on the final destination or stop'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 8,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'Listen to short dialogues and announcements several times. First, identify whether the situation is buying a ticket, boarding, or arriving. Next, listen for key information like destination or platform number.'
    }
},
{
    id: lessonContentId++,
    lessonId: 8,
    content: {
        type: 'paragraph',
        text: 'Try pointing to a map or imagining the route as you listen. This helps connect the language to real movement and improves understanding over time.'
    }
},
{
    id: lessonContentId++,
    lessonId: 8,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you learned how to understand basic Japanese used in transportation and ticket situations. By focusing on keywords, repetition, and visual support, you can navigate trains and buses with more confidence during your travels.'
    }
},
{
    id: lessonContentId++,
    lessonId: 9,
    heading: "Introduction: Staying and Traveling Comfortably",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will learn how to understand simple Japanese used in hotels and airports. These situations often happen at the beginning or end of a trip, and understanding basic language can help you feel more relaxed and confident.'
    }
},
{
    id: lessonContentId++,
    lessonId: 9,
    content: {
        type: 'paragraph',
        text: 'Hotel and airport conversations are usually polite and follow clear routines. Staff members use similar phrases every day, which makes them easier to understand once you become familiar with the patterns.'
    }
},
{
    id: lessonContentId++,
    lessonId: 9,
    heading: "Common Hotel Situations",
    content: {
        type: 'paragraph',
        text: 'At hotels, you may hear simple questions and explanations during check-in or check-out. These conversations often include names, numbers, and times. Paying attention to these details helps you follow the interaction smoothly.'
    }
},
{
    id: lessonContentId++,
    lessonId: 9,
    content: {
        type: 'list',
        items: [
            'Checking in or checking out',
            'Being asked for your name or passport',
            'Hearing room numbers or times',
            'Asking about breakfast or facilities'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 9,
    heading: "Common Airport Situations",
    content: {
        type: 'paragraph',
        text: 'At airports, you may hear announcements and short instructions related to flights, gates, or security. These messages are often repeated and supported by signs, making them easier to understand even with limited Japanese.'
    }
},
{
    id: lessonContentId++,
    lessonId: 9,
    content: {
        type: 'paragraph',
        text: 'Listen for words related to time, gate numbers, or actions such as 行く or 待つ. Even if you do not understand the full sentence, recognizing these words helps you understand what to do next.'
    }
},
{
    id: lessonContentId++,
    lessonId: 9,
    heading: "Listening Strategies for Hotels and Airports",
    content: {
        type: 'list',
        items: [
            'Listen for names, numbers, and times',
            'Watch gestures and follow signs',
            'Notice repeated phrases used by staff',
            'Stay calm and focus on key information'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 9,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'Practice by listening to short dialogues from hotels and airports. First, identify the situation, such as check-in or boarding. Next, focus on the key information being given. Repetition will make these exchanges feel familiar.'
    }
},
{
    id: lessonContentId++,
    lessonId: 9,
    content: {
        type: 'paragraph',
        text: 'Imagine yourself in each situation as you listen. This mental practice helps reduce stress and prepares you for real-life travel interactions.'
    }
},
{
    id: lessonContentId++,
    lessonId: 9,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you learned how to understand basic Japanese used in hotel and airport situations. By focusing on patterns, key words, and context, you can handle these important travel moments with greater confidence and ease.'
    }
},

{
    id: lessonContentId++,
    lessonId: 10,
    heading: "Introduction: Importance of Workplace Greetings",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will focus on listening to everyday greetings and small talk in an office environment. Greetings are not just polite forms—they set the tone for professional relationships and help you understand colleagues’ mood and intentions. Recognizing patterns in these interactions is key at the N3 level.'
    }
},
{
    id: lessonContentId++,
    lessonId: 10,
    content: {
        type: 'paragraph',
        text: 'Small talk at work often includes comments about the weather, the weekend, or the office itself. These conversations may be short but contain nuances, intonation, and indirect language that N3 learners need to practice. Understanding them helps you join discussions naturally.'
    }
},
{
    id: lessonContentId++,
    lessonId: 10,
    heading: "Common Workplace Greetings",
    content: {
        type: 'paragraph',
        text: 'Japanese workplaces use a mix of standard greetings and office-specific phrases. Recognizing these greetings and when they are used will help you respond appropriately and follow the flow of conversation.'
    }
},
{
    id: lessonContentId++,
    lessonId: 10,
    content: {
        type: 'list',
        items: [
            'おはようございます – morning greetings',
            'お疲れ様です – greeting colleagues finishing tasks',
            '失礼します – entering or leaving a room',
            'よろしくお願いします – starting a task or meeting'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 10,
    heading: "Listening for Small Talk Topics",
    content: {
        type: 'paragraph',
        text: 'Small talk may sound casual, but N3 learners must pay attention to context and implied meaning. People often talk indirectly about workload, meetings, or their feelings about tasks. Listening carefully allows you to respond naturally and avoid misunderstandings.'
    }
},
{
    id: lessonContentId++,
    lessonId: 10,
    content: {
        type: 'list',
        items: [
            'Weather or seasons: 今日も寒いですね',
            'Weekend or personal time: 週末はどうでしたか',
            'Workload: 最近忙しいですね',
            'Office environment: 会議室の空調が少し寒いですね'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 10,
    heading: "Listening Strategies for Greetings and Small Talk",
    content: {
        type: 'list',
        items: [
            'Focus on key words and polite expressions',
            'Notice intonation to understand mood or emphasis',
            'Pay attention to context cues: who is speaking and when',
            'Do not worry if you miss minor details; main idea is enough'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 10,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'Listen to short office dialogues multiple times. On the first listen, identify who is speaking and the general situation. On subsequent listens, focus on specific greetings and small talk expressions. Repeat phrases out loud to improve both recognition and production.'
    }
},
{
    id: lessonContentId++,
    lessonId: 10,
    content: {
        type: 'paragraph',
        text: 'You can also practice by imagining yourself entering the office or greeting a colleague. Visualizing the situation while listening strengthens comprehension and helps you respond naturally in real life.'
    }
},
{
    id: lessonContentId++,
    lessonId: 10,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you practiced understanding workplace greetings and small talk. By focusing on key phrases, intonation, and context, you can recognize polite forms and conversational cues, allowing you to communicate naturally and professionally in an office setting.'
    }
},
{
    id: lessonContentId++,
    lessonId: 11,
    heading: "Introduction: Understanding Instructions in the Office",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will practice listening to instructions and task updates at work. Understanding what colleagues or managers ask you to do is critical in professional settings. At N3 level, instructions may include indirect language, polite forms, and context-dependent cues.'
    }
},
{
    id: lessonContentId++,
    lessonId: 11,
    content: {
        type: 'paragraph',
        text: 'Task updates often happen quickly during meetings or casual check-ins. You may hear short phrases about progress, deadlines, or next steps. Listening for key verbs and nouns is more important than catching every single word.'
    }
},
{
    id: lessonContentId++,
    lessonId: 11,
    heading: "Common Instruction Patterns",
    content: {
        type: 'paragraph',
        text: 'Instructions in Japanese offices are often polite but indirect. Understanding the main action requested and any time or condition associated with it is essential for completing tasks correctly.'
    }
},
{
    id: lessonContentId++,
    lessonId: 11,
    content: {
        type: 'list',
        items: [
            '～てください – polite request: 提出してください',
            '～てもらえますか – softer request: 確認してもらえますか',
            '～ように – instruction or recommendation: 注意するように',
            '～までに – deadline expression: 明日までにお願いします'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 11,
    heading: "Listening for Updates",
    content: {
        type: 'paragraph',
        text: 'Task updates may include brief progress reports, notifications about delays, or clarifications about responsibilities. Listening carefully allows you to understand what has been done and what you need to do next.'
    }
},
{
    id: lessonContentId++,
    lessonId: 11,
    content: {
        type: 'list',
        items: [
            '誰が (who) is responsible for which task',
            'いつ (when) something is due',
            '何を (what) needs to be completed',
            'どのように (how) it should be done'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 11,
    heading: "Listening Strategies for Instructions",
    content: {
        type: 'list',
        items: [
            'Focus on the main verb and object in the sentence',
            'Pay attention to polite forms and requests',
            'Listen for time expressions and conditions',
            'Do not get distracted by small talk before or after the instruction'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 11,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'Listen to short dialogues where a colleague or manager gives instructions. On the first listen, identify the main task. On the second, note any deadlines, conditions, or responsible persons. Repeat key phrases out loud to reinforce recognition and production.'
    }
},
{
    id: lessonContentId++,
    lessonId: 11,
    content: {
        type: 'paragraph',
        text: 'Visualizing the task while listening helps link the language to action. You can imagine yourself performing the task or checking off steps as the dialogue progresses.'
    }
},
{
    id: lessonContentId++,
    lessonId: 11,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you practiced understanding instructions and task updates in the office. By focusing on key verbs, objects, deadlines, and context cues, you can follow workplace conversations more effectively and respond accurately to colleagues and managers.'
    }
},
{
    id: lessonContentId++,
    lessonId: 12,
    heading: "Introduction: Listening to Opinions and Suggestions",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will focus on listening to colleagues’ opinions and suggestions in office meetings or casual discussions. At N3 level, people often express ideas indirectly or politely, so understanding the main point and implied meaning is crucial.'
    }
},
{
    id: lessonContentId++,
    lessonId: 12,
    content: {
        type: 'paragraph',
        text: 'Opinions at work may include suggestions for improvements, agreement or disagreement with ideas, and personal viewpoints. Recognizing the structure of these expressions helps you follow conversations and respond appropriately.'
    }
},
{
    id: lessonContentId++,
    lessonId: 12,
    heading: "Common Expressions for Opinions",
    content: {
        type: 'paragraph',
        text: 'Japanese speakers often use specific patterns to express opinions politely. Being able to identify these expressions quickly allows you to catch the main idea even if the phrasing is indirect.'
    }
},
{
    id: lessonContentId++,
    lessonId: 12,
    content: {
        type: 'list',
        items: [
            '～と思います – I think …: この方法はいいと思います',
            '～ではないでしょうか – softer suggestion: この案ではないでしょうか',
            '～かもしれません – uncertainty: 少し難しいかもしれません',
            '～ほうがいい – giving advice or suggestion: 早めに対応したほうがいい'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 12,
    heading: "Listening for Suggestions",
    content: {
        type: 'paragraph',
        text: 'Suggestions are often phrased indirectly, especially in meetings. Pay attention to the verbs and expressions that indicate recommendation or opinion. Tone and intonation also provide clues about the speaker’s attitude or level of certainty.'
    }
},
{
    id: lessonContentId++,
    lessonId: 12,
    content: {
        type: 'list',
        items: [
            'Identify the main suggestion or idea',
            'Notice words that indicate uncertainty or politeness',
            'Listen for who is suggesting and who responds',
            'Focus on the outcome or action implied'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 12,
    heading: "Listening Strategies for Opinions",
    content: {
        type: 'list',
        items: [
            'Focus on key verbs and nouns indicating tasks or ideas',
            'Pay attention to polite expressions and indirect phrasing',
            'Use context to infer suggestions or implied meaning',
            'Do not get stuck on minor words that do not affect the main point'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 12,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'Listen to dialogues where colleagues give opinions or suggestions. On the first listen, identify the main idea. On the second listen, note the suggestion, who proposed it, and any supporting reasoning. Repeat phrases out loud to internalize structure and intonation.'
    }
},
{
    id: lessonContentId++,
    lessonId: 12,
    content: {
        type: 'paragraph',
        text: 'Visualizing the situation in a meeting helps you anticipate responses. Imagining yourself participating reinforces comprehension and prepares you for real office interactions.'
    }
},
{
    id: lessonContentId++,
    lessonId: 12,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you practiced understanding opinions and suggestions at work. By focusing on key phrases, indirect expressions, and context cues, you can follow discussions more effectively and respond naturally to colleagues’ ideas.'
    }
},
{
    id: lessonContentId++,
    lessonId: 13,
    heading: "Introduction: Managing Requests and Problems",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will practice listening to requests, problem explanations, and clarifications in the office. N3-level conversations often involve indirect language, polite forms, and implied meaning. Understanding these will help you respond appropriately and maintain smooth communication.'
    }
},
{
    id: lessonContentId++,
    lessonId: 13,
    content: {
        type: 'paragraph',
        text: 'Workplace problems can be minor, like missing information, or more complex, like delays in a project. Listening carefully allows you to identify the issue and any request for action, even if it is not stated directly.'
    }
},
{
    id: lessonContentId++,
    lessonId: 13,
    heading: "Common Phrases for Requests",
    content: {
        type: 'paragraph',
        text: 'Requests at work are usually polite and may be phrased indirectly. Recognizing these phrases will help you identify when someone needs assistance and how to respond.'
    }
},
{
    id: lessonContentId++,
    lessonId: 13,
    content: {
        type: 'list',
        items: [
            '～てもいいですか – asking for permission: これを使ってもいいですか',
            '～ていただけますか – polite request: 確認していただけますか',
            '～してくださいませんか – very polite request: 教えてくださいませんか',
            '～てもらえますか – softer request: 修正してもらえますか'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 13,
    heading: "Listening for Problems and Clarifications",
    content: {
        type: 'paragraph',
        text: 'Colleagues may explain issues indirectly. Listen for key problem words such as 遅れる, 間違い, or 足りない. Clarification questions often include どういう意味ですか or もう一度お願いします. Recognizing these cues helps you respond correctly.'
    }
},
{
    id: lessonContentId++,
    lessonId: 13,
    content: {
        type: 'list',
        items: [
            'Identify what the problem or request is',
            'Notice polite forms and softening expressions',
            'Focus on the action needed rather than minor details',
            'Pay attention to questions for clarification'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 13,
    heading: "Listening Strategies for Requests and Problems",
    content: {
        type: 'list',
        items: [
            'Focus on key verbs and nouns indicating action or issue',
            'Notice indirect phrasing and implied meaning',
            'Use context to infer the requested solution',
            'Do not get distracted by background conversation or filler phrases'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 13,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'Listen to dialogues where colleagues explain problems or make requests. On the first listen, identify the main problem. On the second listen, focus on the requested action or clarification needed. Repeat key phrases aloud to reinforce understanding and improve comprehension speed.'
    }
},
{
    id: lessonContentId++,
    lessonId: 13,
    content: {
        type: 'paragraph',
        text: 'Visualizing yourself in the conversation helps anticipate possible responses. Imagining appropriate polite replies reinforces comprehension and prepares you for real-life office interactions.'
    }
},
{
    id: lessonContentId++,
    lessonId: 13,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you practiced understanding requests, problem explanations, and clarifications in the office. By focusing on key phrases, indirect expressions, and context, you can handle workplace communication more effectively and respond politely to colleagues’ needs.'
    }
},

{
    id: lessonContentId++,
    lessonId: 14,
    heading: "Introduction: Reading and Listening Recipes",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will focus on listening to recipe instructions and cooking-related language. Recipes often use specific verbs, expressions, and quantities that N2 learners need to recognize. Understanding these terms allows you to follow spoken instructions or video demonstrations accurately.'
    }
},
{
    id: lessonContentId++,
    lessonId: 14,
    content: {
        type: 'paragraph',
        text: 'Cooking language in Japanese includes verbs for actions like cutting, boiling, or mixing, as well as expressions for time, temperature, and order of steps. Even if some words are unfamiliar, context often provides clues.'
    }
},
{
    id: lessonContentId++,
    lessonId: 14,
    heading: "Common Cooking Verbs",
    content: {
        type: 'paragraph',
        text: 'Many verbs appear repeatedly in recipes and cooking instructions. Recognizing them quickly helps you follow steps without needing a dictionary.'
    }
},
{
    id: lessonContentId++,
    lessonId: 14,
    content: {
        type: 'list',
        items: [
            '切る – to cut or slice',
            '煮る – to simmer or boil',
            '焼く – to grill or bake',
            '混ぜる – to mix or combine',
            '炒める – to stir-fry',
            '加える – to add an ingredient'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 14,
    heading: "Listening for Quantities and Timing",
    content: {
        type: 'paragraph',
        text: 'Recipes often include amounts, timing, and sequence words. Listening carefully helps you understand how much of each ingredient to use and in what order. Words like 少々, 大さじ, 分, or 中火 indicate quantity, measurement, and cooking intensity.'
    }
},
{
    id: lessonContentId++,
    lessonId: 14,
    content: {
        type: 'paragraph',
        text: 'Even if you miss a small word, recognizing the main verb and number allows you to follow the step correctly. This is especially useful when listening to cooking shows or video demonstrations.'
    }
},
{
    id: lessonContentId++,
    lessonId: 14,
    heading: "Listening Strategies for Recipes",
    content: {
        type: 'list',
        items: [
            'Focus on verbs describing actions',
            'Listen for numbers and quantities',
            'Note temporal or sequence words: 最初に, 次に, 最後に',
            'Use context to infer missing or unclear details'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 14,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'Listen to short recipe clips or dialogues multiple times. On the first listen, identify the main action. On the second listen, note the ingredients and quantities. Repeat key verbs aloud to reinforce comprehension and pronunciation.'
    }
},
{
    id: lessonContentId++,
    lessonId: 14,
    content: {
        type: 'paragraph',
        text: 'Visualizing the steps while listening strengthens understanding. Imagine yourself chopping, boiling, or mixing ingredients as the verbs are spoken, which helps link language to action.'
    }
},
{
    id: lessonContentId++,
    lessonId: 14,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you practiced understanding recipe language and common cooking verbs. By focusing on key verbs, quantities, and sequence words, you can follow cooking instructions more accurately and confidently in spoken Japanese.'
    }
},
{
    id: lessonContentId++,
    lessonId: 15,
    heading: "Introduction: Listening to Cooking in Action",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will focus on following spoken cooking instructions. Listening comprehension is key when someone explains a recipe verbally, such as in cooking shows, classes, or tutorials. N2 learners will encounter a mix of precise instructions, timing, and casual commentary.'
    }
},
{
    id: lessonContentId++,
    lessonId: 15,
    content: {
        type: 'paragraph',
        text: 'Spoken instructions often include repetitions, clarifications, and extra tips. Recognizing main actions while filtering minor commentary helps you understand the essential steps without getting lost in additional details.'
    }
},
{
    id: lessonContentId++,
    lessonId: 15,
    heading: "Key Verbs and Expressions to Listen For",
    content: {
        type: 'paragraph',
        text: 'In addition to standard cooking verbs, spoken instructions often include modal expressions and advice. These indicate recommended ways to perform a step or adjust the recipe. N2 learners should notice subtle nuances in meaning.'
    }
},
{
    id: lessonContentId++,
    lessonId: 15,
    content: {
        type: 'list',
        items: [
            '火を通す – to cook thoroughly',
            '味を見てください – check the taste',
            'ゆっくり混ぜる – mix gently',
            '焦げないように – to avoid burning',
            '必要に応じて – as needed'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 15,
    heading: "Listening for Sequence and Timing",
    content: {
        type: 'paragraph',
        text: 'Timing words such as 約5分, 中火で, or 少し煮る indicate when and how long to perform an action. Sequence words like 最初に, 次に, and 最後に are often emphasized. Paying attention to these cues helps you follow the recipe correctly.'
    }
},
{
    id: lessonContentId++,
    lessonId: 15,
    content: {
        type: 'paragraph',
        text: 'Even if the speaker uses extra commentary or casual expressions, focus on verbs, quantities, and time. Context allows you to infer actions, so missing minor details rarely prevents understanding the step.'
    }
},
{
    id: lessonContentId++,
    lessonId: 15,
    heading: "Listening Strategies for Spoken Recipes",
    content: {
        type: 'list',
        items: [
            'Focus on verbs indicating the main action',
            'Pay attention to numbers, timing, and quantities',
            'Note sequence words for order of steps',
            'Ignore minor commentary that does not affect action',
            'Repeat instructions mentally or aloud to reinforce comprehension'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 15,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'Listen to short cooking clips multiple times. First, identify the main step. Next, note the ingredients and quantities used. On later listens, notice timing and extra tips. Repeating key phrases aloud helps internalize vocabulary and natural pronunciation.'
    }
},
{
    id: lessonContentId++,
    lessonId: 15,
    content: {
        type: 'paragraph',
        text: 'Visualizing yourself performing each step strengthens comprehension. Imagine cutting, boiling, mixing, or tasting as the speaker explains each action to connect language to practical activity.'
    }
},
{
    id: lessonContentId++,
    lessonId: 15,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you practiced following spoken cooking instructions. By focusing on verbs, timing, quantities, and sequence, you can understand and execute recipes more accurately. These listening skills are useful for both cooking shows and real-life kitchen situations.'
    }
},
{
    id: lessonContentId++,
    lessonId: 16,
    heading: "Introduction: Talking About Ingredients and Taste",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will focus on listening to conversations about ingredients, taste, and food preferences. At N2 level, discussions often include subtle opinions, comparisons, and descriptive language. Understanding these helps you participate in culinary conversations naturally.'
    }
},
{
    id: lessonContentId++,
    lessonId: 16,
    content: {
        type: 'paragraph',
        text: 'Food conversations often include adjectives, comparisons, and evaluative phrases. People may express personal preferences or describe taste, texture, and freshness. Listening carefully allows you to understand the speaker’s perspective and respond appropriately.'
    }
},
{
    id: lessonContentId++,
    lessonId: 16,
    heading: "Common Expressions for Taste and Preferences",
    content: {
        type: 'paragraph',
        text: 'Japanese speakers use a variety of adjectives and phrases to describe food. These expressions help convey subtle differences in flavor, texture, or preference.'
    }
},
{
    id: lessonContentId++,
    lessonId: 16,
    content: {
        type: 'list',
        items: [
            '甘い／辛い／酸っぱい／苦い – sweet, spicy, sour, bitter',
            '柔らかい／硬い／サクサク – soft, hard, crispy',
            '～のほうが好き – I prefer …',
            '～の味がする – tastes like …',
            '～の風味がある – has the flavor of …'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 16,
    heading: "Listening for Opinions About Food",
    content: {
        type: 'paragraph',
        text: 'In discussions about food, people often express likes and dislikes indirectly. Phrases like ちょっと苦手かもしれません or これはおいしいですね indicate subtle opinions. Recognizing these expressions is essential for understanding nuanced evaluations.'
    }
},
{
    id: lessonContentId++,
    lessonId: 16,
    content: {
        type: 'list',
        items: [
            'Listen for adjectives describing taste and texture',
            'Notice hedging or softening expressions indicating preference',
            'Focus on the main opinion even if minor details are missed',
            'Pay attention to comparisons between ingredients or dishes'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 16,
    heading: "Listening Strategies for Preferences",
    content: {
        type: 'list',
        items: [
            'Identify key adjectives for taste and texture',
            'Listen for verbs indicating preference: 好き, 嫌い, 似ている',
            'Pay attention to nuance and softening phrases',
            'Infer the speaker’s overall opinion from context'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 16,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'Listen to dialogues discussing ingredients, flavors, and personal preferences. First, identify the main opinion. On subsequent listens, note descriptive adjectives, comparisons, and hedging phrases. Repeat key expressions aloud to improve both recognition and speaking ability.'
    }
},
{
    id: lessonContentId++,
    lessonId: 16,
    content: {
        type: 'paragraph',
        text: 'Visualizing tasting or preparing the ingredients as you listen reinforces comprehension. Associating language with sensory experience helps internalize vocabulary and descriptive phrases.'
    }
},
{
    id: lessonContentId++,
    lessonId: 16,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you practiced listening to conversations about ingredients, taste, and preferences. By focusing on adjectives, comparisons, and subtle opinions, you can understand food discussions more effectively and engage naturally in culinary conversations.'
    }
},
{
    id: lessonContentId++,
    lessonId: 17,
    heading: "Introduction: Exploring Japanese Food Culture",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will focus on listening to discussions about Japanese food culture and culinary traditions. At N2 level, speakers often use explanations, comparisons, and cultural references that require understanding both language and context.'
    }
},
{
    id: lessonContentId++,
    lessonId: 17,
    content: {
        type: 'paragraph',
        text: 'Food culture conversations may include seasonal ingredients, regional specialties, dining etiquette, and festival foods. Recognizing key vocabulary and context allows you to follow these discussions even when they include unfamiliar terms.'
    }
},
{
    id: lessonContentId++,
    lessonId: 17,
    heading: "Common Expressions for Cultural Discussions",
    content: {
        type: 'paragraph',
        text: 'Japanese speakers use a variety of phrases to describe traditions and culture. These expressions often include explanation verbs, time-related words, and comparative language.'
    }
},
{
    id: lessonContentId++,
    lessonId: 17,
    content: {
        type: 'list',
        items: [
            '～の習慣 – custom of …: 正月の習慣',
            '～によく使われる – commonly used in …',
            '～は地域によって違う – varies by region',
            '～が有名 – is famous for …',
            '～の季節に – in the season of …'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 17,
    heading: "Listening for Explanations and Comparisons",
    content: {
        type: 'paragraph',
        text: 'Cultural explanations often include comparisons or historical context. Listen for markers such as 例えば, 一方, and しかし, which indicate examples, contrasts, or exceptions. Understanding these markers helps you follow the speaker’s reasoning.'
    }
},
{
    id: lessonContentId++,
    lessonId: 17,
    content: {
        type: 'list',
        items: [
            'Identify the main topic or tradition being discussed',
            'Notice phrases indicating examples or contrasts',
            'Listen for cultural or regional vocabulary',
            'Focus on key ideas rather than every single word'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 17,
    heading: "Listening Strategies for Food Culture",
    content: {
        type: 'list',
        items: [
            'Pay attention to connectors: 例えば, 一方, しかし',
            'Listen for time expressions and seasonal references',
            'Focus on main idea and cultural significance',
            'Use context to infer meanings of unfamiliar words'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 17,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'Listen to dialogues or short explanations about food culture. On the first listen, identify the main tradition or topic. On subsequent listens, focus on examples, comparisons, and cultural context. Repeat key phrases aloud to reinforce comprehension and natural usage.'
    }
},
{
    id: lessonContentId++,
    lessonId: 17,
    content: {
        type: 'paragraph',
        text: 'Visualizing the traditions, dishes, or festivals while listening helps you connect language to real-world experiences. Associating vocabulary with cultural imagery strengthens understanding and retention.'
    }
},
{
    id: lessonContentId++,
    lessonId: 17,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you practiced listening to discussions about Japanese food culture and traditions. By focusing on key expressions, comparisons, and cultural context, you can understand complex explanations and participate more naturally in conversations about Japanese culinary practices.'
    }
},

{
    id: lessonContentId++,
    lessonId: 18,
    heading: "Introduction: Describing Symptoms in Japanese",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will practice listening to conversations about health symptoms and conditions. At N3 level, people often describe their discomfort with indirect expressions or colloquial phrasing, so it is important to focus on key words and context.'
    }
},
{
    id: lessonContentId++,
    lessonId: 18,
    content: {
        type: 'paragraph',
        text: 'Patients and people in everyday situations may use everyday expressions, onomatopoeia, and body language to describe pain or discomfort. Recognizing these patterns helps you understand what is happening even if the phrasing is casual or partial.'
    }
},
{
    id: lessonContentId++,
    lessonId: 18,
    heading: "Common Symptoms and Expressions",
    content: {
        type: 'paragraph',
        text: 'Japanese speakers use a combination of vocabulary and onomatopoeia to describe physical states. At N3, you will encounter more natural and nuanced expressions rather than textbook sentences.'
    }
},
{
    id: lessonContentId++,
    lessonId: 18,
    content: {
        type: 'list',
        items: [
            '頭が痛い – headache',
            'お腹が痛い – stomachache',
            '咳が出る – coughing',
            '熱がある – having a fever',
            'だるい – feeling sluggish or fatigued',
            'めまいがする – feeling dizzy'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 18,
    heading: "Listening for Details",
    content: {
        type: 'paragraph',
        text: 'When listening to someone describe their symptoms, focus on key words, frequency, severity, and duration. Words like 少し, ずっと, or ときどき indicate intensity or timing. These cues help you understand the overall condition.'
    }
},
{
    id: lessonContentId++,
    lessonId: 18,
    content: {
        type: 'paragraph',
        text: 'Even if you miss minor details, recognizing the main symptom and any related conditions allows you to follow the conversation and respond appropriately.'
    }
},
{
    id: lessonContentId++,
    lessonId: 18,
    heading: "Listening Strategies for Symptoms",
    content: {
        type: 'list',
        items: [
            'Focus on verbs and adjectives describing the symptom',
            'Notice frequency and intensity words',
            'Pay attention to context and gestures',
            'Do not get distracted by filler words or casual commentary'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 18,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'Listen to short dialogues where someone explains their symptoms. On the first listen, identify the main complaint. On subsequent listens, note frequency, intensity, and additional details. Repeat phrases aloud to reinforce comprehension and pronunciation.'
    }
},
{
    id: lessonContentId++,
    lessonId: 18,
    content: {
        type: 'paragraph',
        text: 'Visualizing the symptom or imagining yourself explaining it helps link language to real experience. This technique strengthens listening comprehension and prepares you for real-life medical or everyday situations.'
    }
},
{
    id: lessonContentId++,
    lessonId: 18,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you practiced listening to descriptions of symptoms and health conditions. By focusing on key words, intensity, timing, and context, you can understand natural conversations about health and respond appropriately in everyday situations.'
    }
},
{
    id: lessonContentId++,
    lessonId: 19,
    heading: "Introduction: Listening to Medical Guidance",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will practice understanding medical advice and instructions. At N3 level, explanations from doctors, pharmacists, or health professionals may include indirect expressions, polite forms, and natural speech patterns. Focusing on key actions and conditions is essential.'
    }
},
{
    id: lessonContentId++,
    lessonId: 19,
    content: {
        type: 'paragraph',
        text: 'Medical advice often includes instructions for medication, rest, diet, and activity restrictions. Recognizing verbs, quantities, and time expressions allows you to follow the guidance correctly even if some parts are phrased indirectly.'
    }
},
{
    id: lessonContentId++,
    lessonId: 19,
    heading: "Common Instructions and Expressions",
    content: {
        type: 'paragraph',
        text: 'Health professionals use set phrases and modal expressions to explain what you should or should not do. Understanding these expressions is crucial for comprehension and following instructions safely.'
    }
},
{
    id: lessonContentId++,
    lessonId: 19,
    content: {
        type: 'list',
        items: [
            '～してください – please do …: 安静にしてください',
            '～しないでください – please do not …: 運動しないでください',
            '～てはいけません – must not …: 食べてはいけません',
            '～方がいい – it is better to …: 水を多く飲んだほうがいい',
            '～ようにしてください – please try to …: 食事の後に薬を飲むようにしてください'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 19,
    heading: "Listening for Quantities and Timing",
    content: {
        type: 'paragraph',
        text: 'Medical instructions often include numbers, frequency, and timing. Words like 一日三回, 食前, 食後, or 5分間 indicate dosage and schedule. Paying attention to these details ensures you follow instructions safely.'
    }
},
{
    id: lessonContentId++,
    lessonId: 19,
    content: {
        type: 'paragraph',
        text: 'Even if minor details are missed, understanding the main action, timing, and condition allows you to follow the instructions correctly.'
    }
},
{
    id: lessonContentId++,
    lessonId: 19,
    heading: "Listening Strategies for Medical Instructions",
    content: {
        type: 'list',
        items: [
            'Focus on key verbs and actions',
            'Notice quantities and timing expressions',
            'Pay attention to polite forms and modal verbs',
            'Do not get distracted by explanations that are not essential for action'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 19,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'Listen to dialogues where a doctor or pharmacist gives instructions. On the first listen, identify the main action required. On subsequent listens, focus on timing, frequency, and conditions. Repeat key phrases aloud to reinforce comprehension and pronunciation.'
    }
},
{
    id: lessonContentId++,
    lessonId: 19,
    content: {
        type: 'paragraph',
        text: 'Visualizing yourself taking medication, resting, or following health advice helps link language to action. This technique strengthens listening skills and prepares you for real-life situations.'
    }
},
{
    id: lessonContentId++,
    lessonId: 19,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you practiced understanding medical advice and instructions. By focusing on verbs, quantities, timing, and context, you can follow spoken guidance accurately and respond appropriately in everyday health situations.'
    }
},
{
    id: lessonContentId++,
    lessonId: 20,
    heading: "Introduction: Talking About Daily Habits",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will practice listening to conversations about diet, exercise, and daily habits. At N3 level, speakers often explain routines, give advice, or discuss personal preferences using natural speech patterns and indirect expressions.'
    }
},
{
    id: lessonContentId++,
    lessonId: 20,
    content: {
        type: 'paragraph',
        text: 'Conversations about health and habits may include explanations, comparisons, and suggestions. Recognizing verbs, adverbs, and expressions of frequency allows you to understand routines and advice, even if the phrasing is casual or partially indirect.'
    }
},
{
    id: lessonContentId++,
    lessonId: 20,
    heading: "Common Expressions for Diet and Exercise",
    content: {
        type: 'paragraph',
        text: 'Japanese speakers use specific verbs, adverbs, and expressions to describe habits. Listening for these helps you understand routines and advice.'
    }
},
{
    id: lessonContentId++,
    lessonId: 20,
    content: {
        type: 'list',
        items: [
            '食事に気をつける – to pay attention to diet',
            '運動する – to exercise',
            '毎日～する – do … every day',
            '控える – to refrain from …',
            '～したほうがいい – it’s better to …',
            '～習慣をつける – to develop a habit'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 20,
    heading: "Listening for Frequency and Routine",
    content: {
        type: 'paragraph',
        text: 'Words and phrases indicating frequency and routine, such as 毎日, 時々, 週に一度, or なるべく, are important cues. They help you understand how often an action is performed and the degree of emphasis.'
    }
},
{
    id: lessonContentId++,
    lessonId: 20,
    content: {
        type: 'paragraph',
        text: 'Even if you miss minor words, focusing on main verbs and adverbs allows you to follow conversations about habits, diet, and exercise routines.'
    }
},
{
    id: lessonContentId++,
    lessonId: 20,
    heading: "Listening Strategies for Diet and Exercise",
    content: {
        type: 'list',
        items: [
            'Focus on verbs describing actions or habits',
            'Notice frequency and intensity adverbs',
            'Pay attention to advice expressions: ～したほうがいい, 控える',
            'Use context to infer routines and recommendations'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 20,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'Listen to short dialogues where someone explains their daily diet, exercise, or lifestyle habits. On the first listen, identify the main activity. On subsequent listens, note frequency, timing, and advice. Repeat key phrases aloud to reinforce comprehension and natural speech patterns.'
    }
},
{
    id: lessonContentId++,
    lessonId: 20,
    content: {
        type: 'paragraph',
        text: 'Visualizing the described habits while listening helps link language to real life. Imagining yourself performing or giving advice about diet or exercise strengthens comprehension and retention.'
    }
},
{
    id: lessonContentId++,
    lessonId: 20,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you practiced listening to conversations about diet, exercise, and daily habits. By focusing on verbs, frequency expressions, and advice phrases, you can understand lifestyle discussions and participate naturally in health-related conversations.'
    }
},
{
    id: lessonContentId++,
    lessonId: 21,
    heading: "Introduction: Listening to Mental Wellbeing Conversations",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will focus on listening to discussions about mental wellbeing and stress management. At N3 level, speakers often describe feelings, coping strategies, and experiences using natural, sometimes indirect expressions. Recognizing these patterns helps you follow conversations effectively.'
    }
},
{
    id: lessonContentId++,
    lessonId: 21,
    content: {
        type: 'paragraph',
        text: 'People often talk about stress, mood, or emotional states indirectly or with softening phrases. Listening for key emotions, verbs, and adverbs allows you to understand the main idea even if some details are casual or implied.'
    }
},
{
    id: lessonContentId++,
    lessonId: 21,
    heading: "Common Expressions for Mental Wellbeing",
    content: {
        type: 'paragraph',
        text: 'Japanese speakers use specific adjectives, verbs, and phrases to describe stress and emotional states. Being familiar with these expressions helps you follow conversations naturally.'
    }
},
{
    id: lessonContentId++,
    lessonId: 21,
    content: {
        type: 'list',
        items: [
            '疲れがたまる – to accumulate fatigue',
            '気分が落ち込む – to feel down',
            'ストレスを感じる – to feel stressed',
            'リラックスする – to relax',
            '気分転換をする – to refresh your mood',
            '無理をしない – do not overwork yourself'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 21,
    heading: "Listening for Advice and Coping Strategies",
    content: {
        type: 'paragraph',
        text: 'Discussions about mental wellbeing often include suggestions or coping strategies. Phrases like ～したほうがいい, ～ようにする, or なるべく～ help convey recommendations. Recognizing these helps you understand advice and respond appropriately.'
    }
},
{
    id: lessonContentId++,
    lessonId: 21,
    content: {
        type: 'list',
        items: [
            'Listen for verbs describing actions to relieve stress',
            'Notice hedging or softening expressions indicating suggestions',
            'Pay attention to frequency and intensity adverbs: 時々, なるべく, 少し',
            'Focus on the main point rather than every word'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 21,
    heading: "Listening Strategies for Stress Conversations",
    content: {
        type: 'list',
        items: [
            'Focus on key adjectives and verbs for emotions',
            'Listen for advice expressions and recommendations',
            'Use context to infer feelings or coping methods',
            'Do not get distracted by casual commentary or filler words'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 21,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'Listen to dialogues discussing stress, mood, and coping strategies. On the first listen, identify the main emotional state or problem. On subsequent listens, note suggested actions or advice. Repeat key phrases aloud to reinforce comprehension and natural usage.'
    }
},
{
    id: lessonContentId++,
    lessonId: 21,
    content: {
        type: 'paragraph',
        text: 'Visualizing yourself or someone else performing coping strategies while listening helps link language to real-life behavior. This strengthens comprehension and prepares you to participate in conversations about mental wellbeing.'
    }
},
{
    id: lessonContentId++,
    lessonId: 21,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you practiced listening to conversations about mental wellbeing and stress management. By focusing on adjectives, verbs, and advice expressions, you can understand emotional states and participate naturally in discussions about health and lifestyle.'
    }
},

{
    id: lessonContentId++,
    lessonId: 22,
    heading: "Introduction: Grasping the Main Idea",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will focus on identifying the main idea and author perspective in advanced Japanese texts. At N1 level, texts often include nuanced argumentation, complex sentence structures, and implicit opinions. Understanding the central point allows you to follow the author’s reasoning effectively.'
    }
},
{
    id: lessonContentId++,
    lessonId: 22,
    content: {
        type: 'paragraph',
        text: 'Texts such as editorials, essays, and news articles frequently express subtle viewpoints. Authors may imply opinions without stating them directly. Recognizing key verbs, particles, and conjunctions helps you detect tone, stance, and focus.'
    }
},
{
    id: lessonContentId++,
    lessonId: 22,
    heading: "Common Linguistic Markers for Main Ideas",
    content: {
        type: 'paragraph',
        text: 'At N1, authors often use conjunctions, adverbs, and sentence patterns to indicate main ideas or conclusions. Being familiar with these markers enables efficient identification of the central message.'
    }
},
{
    id: lessonContentId++,
    lessonId: 22,
    content: {
        type: 'list',
        items: [
            'つまり – in short, in other words',
            '要するに – to sum up',
            '結論として – in conclusion',
            '一方で – on the other hand',
            '～に対して – regarding …',
            '～が指摘されている – it is pointed out that …'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 22,
    heading: "Listening for Author Perspective",
    content: {
        type: 'paragraph',
        text: 'Authors may present contrasting views, counterarguments, or hedged statements. Listening or reading carefully for expressions like ～と考えられる, ～の可能性がある, or ～と思われる helps you understand subtle stances.'
    }
},
{
    id: lessonContentId++,
    lessonId: 22,
    content: {
        type: 'list',
        items: [
            'Identify key verbs indicating opinion or assessment',
            'Notice particles and conjunctions signaling contrast or emphasis',
            'Focus on repeated themes or concepts',
            'Use context to infer implicit perspective'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 22,
    heading: "Strategies for Comprehension",
    content: {
        type: 'list',
        items: [
            'Skim for topic sentences to identify the main idea',
            'Underline or note key opinion markers',
            'Recognize contrastive and causal connectors',
            'Do not get stuck on difficult kanji; focus on the overall message'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 22,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'Listen to or read short N1-level texts, such as news editorials or opinion essays. On the first pass, identify the main idea. On subsequent passes, focus on the author’s perspective, reasoning, and any implied stance. Summarize the main point in your own words.'
    }
},
{
    id: lessonContentId++,
    lessonId: 22,
    content: {
        type: 'paragraph',
        text: 'Visualizing the structure of the text and relationships between ideas helps connect language to logical reasoning. Imagining yourself explaining the author’s point strengthens comprehension and retention.'
    }
},
{
    id: lessonContentId++,
    lessonId: 22,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you practiced identifying the main idea and author perspective in advanced Japanese texts. By focusing on linguistic markers, repeated themes, and implied meaning, you can understand complex texts more effectively and follow the author’s reasoning.'
    }
},
{
    id: lessonContentId++,
    lessonId: 23,
    heading: "Introduction: Understanding Arguments and Evidence",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will focus on identifying arguments, supporting evidence, and implicit meaning in advanced Japanese texts. At N1 level, writers often use examples, statistics, and comparisons to strengthen their points. Recognizing these patterns helps you follow reasoning and detect nuance.'
    }
},
{
    id: lessonContentId++,
    lessonId: 23,
    content: {
        type: 'paragraph',
        text: 'Texts may include explicit evidence or subtle hints. Authors often imply their perspective through examples, contrasts, and context. Understanding both stated and implied meaning is essential for advanced comprehension.'
    }
},
{
    id: lessonContentId++,
    lessonId: 23,
    heading: "Common Expressions for Evidence and Support",
    content: {
        type: 'paragraph',
        text: 'Recognizing phrases that introduce examples, reasoning, or evidence helps you distinguish arguments from commentary. These markers are common in essays, editorials, and analytical texts.'
    }
},
{
    id: lessonContentId++,
    lessonId: 23,
    content: {
        type: 'list',
        items: [
            '例えば – for example',
            '～によると – according to …',
            '～が示すように – as … shows',
            '～ことから – from this it can be inferred',
            '統計によれば – according to statistics',
            '～と言える – it can be said that …'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 23,
    heading: "Listening and Reading for Implicit Meaning",
    content: {
        type: 'paragraph',
        text: 'Advanced texts often imply meaning rather than stating it directly. Phrases like ～と思われる, ～可能性がある, or ～傾向がある signal tentative conclusions. Recognizing these helps you detect subtle reasoning and the author’s perspective.'
    }
},
{
    id: lessonContentId++,
    lessonId: 23,
    content: {
        type: 'list',
        items: [
            'Identify explicit examples and supporting evidence',
            'Notice hedging phrases indicating tentative meaning',
            'Focus on cause-and-effect relationships between sentences',
            'Use context to infer unstated conclusions'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 23,
    heading: "Strategies for Comprehension",
    content: {
        type: 'list',
        items: [
            'Underline or highlight evidence markers and examples',
            'Map argument structure: claim → evidence → conclusion',
            'Recognize connectors indicating cause, contrast, or comparison',
            'Do not translate word-for-word; focus on logic and meaning'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 23,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'Listen to or read N1-level editorials, essays, or reports. On the first pass, identify the main argument. On subsequent passes, note supporting evidence, examples, and implied conclusions. Summarize the argument structure in your own words to reinforce comprehension.'
    }
},
{
    id: lessonContentId++,
    lessonId: 23,
    content: {
        type: 'paragraph',
        text: 'Visualizing the relationship between claims and evidence strengthens understanding. Imagining how the examples support or challenge the main point helps internalize reasoning and nuance.'
    }
},
{
    id: lessonContentId++,
    lessonId: 23,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you practiced identifying arguments, supporting evidence, and implicit meaning in advanced Japanese texts. By focusing on markers, logical relationships, and tentative phrasing, you can comprehend complex reasoning and subtle nuance more effectively.'
    }
},
{
    id: lessonContentId++,
    lessonId: 24,
    heading: "Introduction: Listening to Advanced Conversations",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will practice listening to complex conversations in interviews, panels, and discussion programs. At N1 level, speakers may talk quickly, overlap, and include advanced vocabulary, idiomatic expressions, and implied opinions. Understanding the flow and key points is essential.'
    }
},
{
    id: lessonContentId++,
    lessonId: 24,
    content: {
        type: 'paragraph',
        text: 'Panel discussions often include multiple speakers with differing opinions. Recognizing who is speaking, their stance, and the relationship between statements helps you follow the discussion without getting lost in details.'
    }
},
{
    id: lessonContentId++,
    lessonId: 24,
    heading: "Key Expressions in Interviews and Panels",
    content: {
        type: 'paragraph',
        text: 'Speakers often use set phrases, discourse markers, and polite or indirect forms to express opinions, agreement, or disagreement. Identifying these phrases helps you understand speaker intentions and nuances.'
    }
},
{
    id: lessonContentId++,
    lessonId: 24,
    content: {
        type: 'list',
        items: [
            '～と思います／～と考えます – I think …',
            '確かに – indeed, that’s true',
            '一方で – on the other hand',
            '～かもしれません – it might be …',
            '～という意見もある – there is also an opinion that …',
            'なるほど – I see / indeed'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 24,
    heading: "Listening for Main Points and Nuance",
    content: {
        type: 'paragraph',
        text: 'In fast or overlapping speech, focus on verbs, key nouns, and opinion markers. Identify main points, supporting statements, and contrasting opinions. Pay attention to tone and emphasis for implied meaning or disagreement.'
    }
},
{
    id: lessonContentId++,
    lessonId: 24,
    content: {
        type: 'list',
        items: [
            'Identify speaker and their stance',
            'Listen for agreement, disagreement, or hedging',
            'Focus on repeated keywords and expressions',
            'Infer implicit meaning from tone and context'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 24,
    heading: "Listening Strategies for Complex Speech",
    content: {
        type: 'list',
        items: [
            'Segment the conversation mentally: Speaker A → Speaker B → Response',
            'Focus on connecting phrases like つまり, 一方で, それに対して',
            'Do not try to understand every word; capture main ideas',
            'Note contrasting opinions or tentative statements'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 24,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'Listen to recorded interviews, panel discussions, or debate clips. On the first listen, identify the main points and speakers’ stances. On subsequent listens, focus on supporting statements, nuance, and implied meaning. Repeat key phrases aloud to internalize natural speech patterns.'
    }
},
{
    id: lessonContentId++,
    lessonId: 24,
    content: {
        type: 'paragraph',
        text: 'Visualizing the discussion and imagining yourself as part of the conversation strengthens comprehension. This technique helps you follow multi-speaker interactions and recognize subtle opinion shifts.'
    }
},
{
    id: lessonContentId++,
    lessonId: 24,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you practiced following complex conversations in interviews and panels. By focusing on speaker stance, key expressions, and implied meaning, you can comprehend advanced discussions and engage more naturally with real-life spoken Japanese.'
    }
},
{
    id: lessonContentId++,
    lessonId: 25,
    heading: "Introduction: Understanding Professional Texts",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will practice listening to or reading reports, reviews, and commentaries. N1-level materials often include specialized vocabulary, subtle opinions, and nuanced reasoning. Understanding the structure and key points allows you to follow arguments and evaluate content effectively.'
    }
},
{
    id: lessonContentId++,
    lessonId: 25,
    content: {
        type: 'paragraph',
        text: 'These texts often contain explicit statements and implied opinions. Recognizing patterns in language, markers of contrast, and evaluative phrases is essential to comprehend both the facts and the author’s perspective.'
    }
},
{
    id: lessonContentId++,
    lessonId: 25,
    heading: "Key Expressions in Reports and Reviews",
    content: {
        type: 'paragraph',
        text: 'Authors frequently use expressions to describe trends, evaluate events, or highlight significance. Identifying these expressions helps you understand the purpose and tone of the text.'
    }
},
{
    id: lessonContentId++,
    lessonId: 25,
    content: {
        type: 'list',
        items: [
            '報告によると – according to the report',
            '調査の結果 – as a result of the survey',
            '～が明らかになった – it became clear that …',
            '～と評価されている – is evaluated as …',
            '～の傾向がある – there is a tendency that …',
            '～と言える – it can be said that …'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 25,
    heading: "Listening and Reading for Implicit Meaning",
    content: {
        type: 'paragraph',
        text: 'Professional texts often imply significance without stating it directly. Phrases like ～と考えられる, ～可能性がある, or ～が注目されている suggest conclusions or emphasis. Recognizing these allows you to understand both explicit facts and nuanced interpretation.'
    }
},
{
    id: lessonContentId++,
    lessonId: 25,
    content: {
        type: 'list',
        items: [
            'Identify explicit findings, conclusions, and evaluations',
            'Notice hedging and tentative expressions for nuance',
            'Pay attention to comparative and contrastive markers',
            'Use context to infer implicit meaning or significance'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 25,
    heading: "Strategies for Comprehension",
    content: {
        type: 'list',
        items: [
            'Skim for key facts and main conclusions',
            'Underline evaluative and trend markers',
            'Recognize cause-effect and contrast connectors',
            'Focus on logic and reasoning rather than translating word-for-word'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 25,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'Listen to or read reports, commentaries, or reviews. On the first pass, identify main findings and conclusions. On subsequent passes, focus on supporting evidence, evaluative language, and implicit meaning. Summarize key points in your own words to reinforce comprehension.'
    }
},
{
    id: lessonContentId++,
    lessonId: 25,
    content: {
        type: 'paragraph',
        text: 'Visualizing the report or review and connecting facts to conclusions strengthens understanding. Imagining how the findings relate to real-life situations helps internalize complex reasoning and vocabulary.'
    }
},
{
    id: lessonContentId++,
    lessonId: 25,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you practiced comprehending reports, reviews, and commentaries. By focusing on evaluative expressions, trend markers, and implicit meaning, you can understand advanced texts more effectively and follow professional reasoning in Japanese.'
    }
},

{
    id: lessonContentId++,
    lessonId: 26,
    heading: "Introduction: Following Longer Conversations",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will practice listening to extended conversations in everyday life. At N2 level, dialogues may include multiple topics, interjections, and natural pauses. Learning to identify main points and transitions helps you follow conversations more smoothly.'
    }
},
{
    id: lessonContentId++,
    lessonId: 26,
    content: {
        type: 'paragraph',
        text: 'Extended conversations often include digressions, repeated information, and casual expressions. Paying attention to context, tone, and transitional phrases allows you to extract key information without getting lost in minor details.'
    }
},
{
    id: lessonContentId++,
    lessonId: 26,
    heading: "Common Expressions in Daily Conversations",
    content: {
        type: 'paragraph',
        text: 'Speakers at N2 level use a variety of expressions to signal topic changes, agreement, hesitation, or emphasis. Recognizing these helps you follow the flow naturally.'
    }
},
{
    id: lessonContentId++,
    lessonId: 26,
    content: {
        type: 'list',
        items: [
            'ところで – by the way, changing topic',
            'そういえば – come to think of it',
            'なるほど – I see / indeed',
            'それで – so / therefore',
            'まあ – well / you know (hesitation or softening)',
            'ちなみに – by the way / for your information'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 26,
    heading: "Listening for Main Points and Transitions",
    content: {
        type: 'paragraph',
        text: 'In longer dialogues, key points are often surrounded by transitions or emphasis phrases. Listening for these markers helps you separate important information from digressions and track the conversation structure.'
    }
},
{
    id: lessonContentId++,
    lessonId: 26,
    content: {
        type: 'list',
        items: [
            'Identify the main topic at the start of the dialogue',
            'Notice transitional phrases indicating subtopics',
            'Pay attention to repeated keywords or phrases',
            'Focus on speaker intent and implied meaning'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 26,
    heading: "Listening Strategies for Extended Conversations",
    content: {
        type: 'list',
        items: [
            'Segment the dialogue mentally: opening → development → conclusion',
            'Focus on topic sentences and transitional markers',
            'Do not try to understand every filler or interjection',
            'Infer meaning from context and tone'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 26,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'Listen to dialogues at home, work, or public settings. On the first listen, identify the main topic. On subsequent listens, note transitions, subtopics, and key points. Repeat natural expressions aloud to improve comprehension and fluency.'
    }
},
{
    id: lessonContentId++,
    lessonId: 26,
    content: {
        type: 'paragraph',
        text: 'Visualizing the scene and imagining yourself as part of the conversation reinforces understanding. Associating expressions with real-life situations helps internalize vocabulary and natural flow.'
    }
},
{
    id: lessonContentId++,
    lessonId: 26,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you practiced listening to extended conversations in daily life. By focusing on transitional phrases, key points, and context, you can follow longer dialogues smoothly and extract the essential information without losing track of the conversation.'
    }
},
{
    id: lessonContentId++,
    lessonId: 27,
    heading: "Introduction: Understanding Instructions and Warnings",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will focus on listening to instructions, warnings, and explanations in everyday and professional contexts. At N2 level, speakers may combine direct commands, polite requests, and explanatory remarks. Recognizing key verbs, particles, and emphasis markers is crucial to follow guidance accurately.'
    }
},
{
    id: lessonContentId++,
    lessonId: 27,
    content: {
        type: 'paragraph',
        text: 'Instructions and warnings often appear in workplaces, public facilities, and manuals. Understanding nuance is important, as indirect phrasing may soften warnings or provide polite alternatives to direct commands.'
    }
},
{
    id: lessonContentId++,
    lessonId: 27,
    heading: "Common Expressions for Instructions and Warnings",
    content: {
        type: 'paragraph',
        text: 'At N2, speakers frequently use a mix of plain, polite, and indirect forms. Familiarity with these expressions helps you follow both explicit and subtle instructions.'
    }
},
{
    id: lessonContentId++,
    lessonId: 27,
    content: {
        type: 'list',
        items: [
            '～してください – please do …',
            '～しないでください – please do not …',
            '～てはいけません – must not …',
            '～ように – so that … / please …',
            '注意してください – please be careful',
            '～可能性があります – there is a possibility that …'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 27,
    heading: "Listening for Key Actions and Conditions",
    content: {
        type: 'paragraph',
        text: 'Instructions may include specific actions, timing, or conditional statements. Words and phrases such as 必ず, なるべく, 時間通りに, and もし～なら indicate importance, frequency, or conditional requirements. Paying attention to these ensures correct comprehension.'
    }
},
{
    id: lessonContentId++,
    lessonId: 27,
    content: {
        type: 'list',
        items: [
            'Focus on verbs indicating required actions',
            'Notice adverbs indicating frequency or urgency',
            'Pay attention to conditionals and cause-effect phrases',
            'Do not get distracted by filler expressions or polite softeners'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 27,
    heading: "Listening Strategies for Instructions",
    content: {
        type: 'list',
        items: [
            'Segment information mentally: action → condition → timing',
            'Highlight repeated or emphasized phrases',
            'Infer unstated consequences from context',
            'Focus on practical implications rather than minor words'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 27,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'Listen to dialogues or announcements with instructions and warnings. On the first pass, identify the main action or warning. On subsequent passes, focus on conditions, timing, and nuance. Repeat key phrases aloud to internalize natural intonation and comprehension.'
    }
},
{
    id: lessonContentId++,
    lessonId: 27,
    content: {
        type: 'paragraph',
        text: 'Visualizing the scenario, imagining yourself following instructions, and mentally performing the actions helps connect language to real life. This strengthens comprehension and prepares you for practical situations.'
    }
},
{
    id: lessonContentId++,
    lessonId: 27,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you practiced following instructions, warnings, and explanations. By focusing on verbs, adverbs, conditionals, and contextual cues, you can understand practical guidance and respond appropriately in daily and professional situations.'
    }
},
{
    id: lessonContentId++,
    lessonId: 28,
    heading: "Introduction: Comprehending Media and Public Information",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will practice listening to and reading news, announcements, and public information. At N2 level, these texts may include formal expressions, indirect phrasing, and advanced vocabulary. Understanding main points and implied meaning is essential for real-life comprehension.'
    }
},
{
    id: lessonContentId++,
    lessonId: 28,
    content: {
        type: 'paragraph',
        text: 'News and public announcements often combine factual information with recommendations, warnings, or background context. Recognizing markers of importance, causality, and emphasis helps you follow the intended message efficiently.'
    }
},
{
    id: lessonContentId++,
    lessonId: 28,
    heading: "Common Expressions in News and Announcements",
    content: {
        type: 'paragraph',
        text: 'Formal and semi-formal expressions are common in reports and public messages. Familiarity with these phrases helps identify the speaker’s intent and the information’s reliability.'
    }
},
{
    id: lessonContentId++,
    lessonId: 28,
    content: {
        type: 'list',
        items: [
            '～によると – according to …',
            '～と報じられている – it is reported that …',
            '～が確認された – it has been confirmed that …',
            '～が予想される – it is expected that …',
            '注意喚起 – alert / warning',
            '～の可能性がある – there is a possibility that …'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 28,
    heading: "Listening and Reading for Key Information",
    content: {
        type: 'paragraph',
        text: 'Focus on who is speaking, the subject, and the main points. Numbers, dates, locations, and proper nouns often indicate critical information. Pay attention to emphasis and hedging phrases for nuance and importance.'
    }
},
{
    id: lessonContentId++,
    lessonId: 28,
    content: {
        type: 'list',
        items: [
            'Identify the main topic and key facts',
            'Notice dates, locations, and figures',
            'Listen for or read expressions indicating importance or caution',
            'Focus on context to interpret indirect statements'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 28,
    heading: "Strategies for Comprehension",
    content: {
        type: 'list',
        items: [
            'Skim text or listen for topic sentences first',
            'Highlight critical information: numbers, names, warnings',
            'Infer meaning from context and transitional phrases',
            'Do not get stuck on difficult vocabulary; focus on overall understanding'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 28,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'Listen to news broadcasts, public announcements, or read online bulletins. On the first pass, identify the main point and the most important facts. On subsequent passes, note supporting details, warnings, or recommendations. Repeat key phrases aloud to reinforce comprehension.'
    }
},
{
    id: lessonContentId++,
    lessonId: 28,
    content: {
        type: 'paragraph',
        text: 'Visualizing events or information while listening or reading helps connect language to real-world context. This strengthens comprehension and prepares you for practical understanding of Japanese media and public communication.'
    }
},
{
    id: lessonContentId++,
    lessonId: 28,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you practiced listening to and reading news, announcements, and public information. By focusing on key facts, warnings, transitional markers, and context, you can efficiently understand formal or semi-formal Japanese texts in real-life settings.'
    }
},
{
    id: lessonContentId++,
    lessonId: 29,
    heading: "Introduction: Following Opinions and Debates",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you will practice understanding opinions, debates, and social discussions. At N2 level, speakers present arguments, counterarguments, and personal viewpoints. Recognizing stance, tone, and logical structure is essential for comprehension.'
    }
},
{
    id: lessonContentId++,
    lessonId: 29,
    content: {
        type: 'paragraph',
        text: 'Social discussions often include agreement, disagreement, and nuanced reasoning. Listening for markers of opinion, contrast, and emphasis helps you follow the flow and distinguish facts from personal interpretations.'
    }
},
{
    id: lessonContentId++,
    lessonId: 29,
    heading: "Common Expressions in Debates and Opinions",
    content: {
        type: 'paragraph',
        text: 'Speakers use specific expressions to present their views, show agreement or disagreement, or soften opinions. Familiarity with these phrases helps you identify stance and subtle nuance.'
    }
},
{
    id: lessonContentId++,
    lessonId: 29,
    content: {
        type: 'list',
        items: [
            '～と思う／～と考える – I think …',
            '確かに – indeed / that’s true',
            'しかし／ところが – however / on the other hand',
            '一方で – on the other hand',
            '～という意見もある – there is also an opinion that …',
            'なるほど – I see / that makes sense'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 29,
    heading: "Listening for Key Arguments and Nuance",
    content: {
        type: 'paragraph',
        text: 'In debates, each speaker’s position may shift or overlap with others. Focus on the main claim, supporting evidence, counterpoints, and any tentative or hedging expressions. Tone, emphasis, and repetition provide clues about priority and importance.'
    }
},
{
    id: lessonContentId++,
    lessonId: 29,
    content: {
        type: 'list',
        items: [
            'Identify speaker stance and main argument',
            'Notice agreements, disagreements, and hedging',
            'Focus on transitional phrases: それに対して, その一方で, つまり',
            'Infer implied meaning from context and tone'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 29,
    heading: "Listening Strategies for Debates",
    content: {
        type: 'list',
        items: [
            'Segment dialogue by speaker to track arguments',
            'Focus on opinion markers and transitional phrases',
            'Do not try to catch every word; capture key points',
            'Compare contrasting statements to understand nuance'
        ]
    }
},
{
    id: lessonContentId++,
    lessonId: 29,
    heading: "Practice Approach",
    content: {
        type: 'paragraph',
        text: 'Listen to social discussion programs, debate clips, or talk shows. On the first listen, identify main opinions and speaker stances. On subsequent listens, note supporting statements, counterarguments, and subtle cues. Repeat key phrases aloud to internalize natural expressions and argument flow.'
    }
},
{
    id: lessonContentId++,
    lessonId: 29,
    content: {
        type: 'paragraph',
        text: 'Visualizing the discussion and mentally summarizing each speaker’s point helps link language to reasoning. This strengthens comprehension and prepares you to follow or participate in advanced social conversations.'
    }
},
{
    id: lessonContentId++,
    lessonId: 29,
    heading: "Summary",
    content: {
        type: 'paragraph',
        text: 'In this lesson, you practiced understanding opinions, debates, and social discussions. By focusing on opinion markers, argument structure, and context, you can follow nuanced conversations and comprehend complex social interactions in Japanese.'
    }
},
]};
  
function populateLessonVocabulary(): LessonVocabulary[] {return [    
    { id: lessonVocabularyId++, lessonId: 0, dictionaryId: 0, },
    { id: lessonVocabularyId++, lessonId: 0, dictionaryId: 1, },
    { id: lessonVocabularyId++, lessonId: 0, dictionaryId: 2, },
    { id: lessonVocabularyId++, lessonId: 0, dictionaryId: 3, },
    { id: lessonVocabularyId++, lessonId: 0, dictionaryId: 4, },
    
    { id: lessonVocabularyId++, lessonId: 1, dictionaryId: 0, },
    { id: lessonVocabularyId++, lessonId: 1, dictionaryId: 1, },
    { id: lessonVocabularyId++, lessonId: 1, dictionaryId: 2, },
    { id: lessonVocabularyId++, lessonId: 1, dictionaryId: 3, },
    { id: lessonVocabularyId++, lessonId: 1, dictionaryId: 4, },
    
    { id: lessonVocabularyId++, lessonId: 2, dictionaryId: 0, },
    { id: lessonVocabularyId++, lessonId: 2, dictionaryId: 1, },
    { id: lessonVocabularyId++, lessonId: 2, dictionaryId: 2, },
    { id: lessonVocabularyId++, lessonId: 2, dictionaryId: 3, },
    { id: lessonVocabularyId++, lessonId: 2, dictionaryId: 4, },

    { id: lessonVocabularyId++, lessonId: 3, dictionaryId: 0, },
    { id: lessonVocabularyId++, lessonId: 3, dictionaryId: 1, },
    { id: lessonVocabularyId++, lessonId: 3, dictionaryId: 2, },
    { id: lessonVocabularyId++, lessonId: 3, dictionaryId: 3, },
    { id: lessonVocabularyId++, lessonId: 3, dictionaryId: 4, },

    { id: lessonVocabularyId++, lessonId: 4, dictionaryId: 0, },
    { id: lessonVocabularyId++, lessonId: 4, dictionaryId: 1, },
    { id: lessonVocabularyId++, lessonId: 4, dictionaryId: 2, },
    { id: lessonVocabularyId++, lessonId: 4, dictionaryId: 3, },
    { id: lessonVocabularyId++, lessonId: 4, dictionaryId: 4, },

    { id: lessonVocabularyId++, lessonId: 5, dictionaryId: 0, },
    { id: lessonVocabularyId++, lessonId: 5, dictionaryId: 1, },
    { id: lessonVocabularyId++, lessonId: 5, dictionaryId: 2, },
    { id: lessonVocabularyId++, lessonId: 5, dictionaryId: 3, },
    { id: lessonVocabularyId++, lessonId: 5, dictionaryId: 4, },

    { id: lessonVocabularyId++, lessonId: 6, dictionaryId: 5, },
    { id: lessonVocabularyId++, lessonId: 6, dictionaryId: 6, },
    { id: lessonVocabularyId++, lessonId: 6, dictionaryId: 7, },
    { id: lessonVocabularyId++, lessonId: 6, dictionaryId: 8, },
    { id: lessonVocabularyId++, lessonId: 6, dictionaryId: 9, },

    { id: lessonVocabularyId++, lessonId: 7, dictionaryId: 5, },
    { id: lessonVocabularyId++, lessonId: 7, dictionaryId: 6, },
    { id: lessonVocabularyId++, lessonId: 7, dictionaryId: 7, },
    { id: lessonVocabularyId++, lessonId: 7, dictionaryId: 8, },
    { id: lessonVocabularyId++, lessonId: 7, dictionaryId: 9, },

    { id: lessonVocabularyId++, lessonId: 8, dictionaryId: 5, },
    { id: lessonVocabularyId++, lessonId: 8, dictionaryId: 6, },
    { id: lessonVocabularyId++, lessonId: 8, dictionaryId: 7, },
    { id: lessonVocabularyId++, lessonId: 8, dictionaryId: 8, },
    { id: lessonVocabularyId++, lessonId: 8, dictionaryId: 9, },

    { id: lessonVocabularyId++, lessonId: 9, dictionaryId: 5, },
    { id: lessonVocabularyId++, lessonId: 9, dictionaryId: 6, },
    { id: lessonVocabularyId++, lessonId: 9, dictionaryId: 7, },
    { id: lessonVocabularyId++, lessonId: 9, dictionaryId: 8, },
    { id: lessonVocabularyId++, lessonId: 9, dictionaryId: 9, },

    { id: lessonVocabularyId++, lessonId: 10, dictionaryId: 5, },
    { id: lessonVocabularyId++, lessonId: 10, dictionaryId: 6, },
    { id: lessonVocabularyId++, lessonId: 10, dictionaryId: 7, },
    { id: lessonVocabularyId++, lessonId: 10, dictionaryId: 8, },
    { id: lessonVocabularyId++, lessonId: 10, dictionaryId: 9, },

    { id: lessonVocabularyId++, lessonId: 11, dictionaryId: 10, },
    { id: lessonVocabularyId++, lessonId: 11, dictionaryId: 11, },
    { id: lessonVocabularyId++, lessonId: 11, dictionaryId: 12, },
    { id: lessonVocabularyId++, lessonId: 11, dictionaryId: 13, },
    { id: lessonVocabularyId++, lessonId: 11, dictionaryId: 14, },

    { id: lessonVocabularyId++, lessonId: 12, dictionaryId: 10, },
    { id: lessonVocabularyId++, lessonId: 12, dictionaryId: 11, },
    { id: lessonVocabularyId++, lessonId: 12, dictionaryId: 12, },
    { id: lessonVocabularyId++, lessonId: 12, dictionaryId: 13, },
    { id: lessonVocabularyId++, lessonId: 12, dictionaryId: 14, },

    { id: lessonVocabularyId++, lessonId: 13, dictionaryId: 10, },
    { id: lessonVocabularyId++, lessonId: 13, dictionaryId: 11, },
    { id: lessonVocabularyId++, lessonId: 13, dictionaryId: 12, },
    { id: lessonVocabularyId++, lessonId: 13, dictionaryId: 13, },
    { id: lessonVocabularyId++, lessonId: 13, dictionaryId: 14, },

    { id: lessonVocabularyId++, lessonId: 14, dictionaryId: 15, },
    { id: lessonVocabularyId++, lessonId: 14, dictionaryId: 16, },
    { id: lessonVocabularyId++, lessonId: 14, dictionaryId: 17, },
    { id: lessonVocabularyId++, lessonId: 14, dictionaryId: 18, },
    { id: lessonVocabularyId++, lessonId: 14, dictionaryId: 19, },

    { id: lessonVocabularyId++, lessonId: 15, dictionaryId: 15, },
    { id: lessonVocabularyId++, lessonId: 15, dictionaryId: 16, },
    { id: lessonVocabularyId++, lessonId: 15, dictionaryId: 17, },
    { id: lessonVocabularyId++, lessonId: 15, dictionaryId: 18, },
    { id: lessonVocabularyId++, lessonId: 15, dictionaryId: 19, },

    { id: lessonVocabularyId++, lessonId: 16, dictionaryId: 15, },
    { id: lessonVocabularyId++, lessonId: 16, dictionaryId: 16, },
    { id: lessonVocabularyId++, lessonId: 16, dictionaryId: 17, },
    { id: lessonVocabularyId++, lessonId: 16, dictionaryId: 18, },
    { id: lessonVocabularyId++, lessonId: 16, dictionaryId: 19, },

    { id: lessonVocabularyId++, lessonId: 17, dictionaryId: 15, },
    { id: lessonVocabularyId++, lessonId: 17, dictionaryId: 16, },
    { id: lessonVocabularyId++, lessonId: 17, dictionaryId: 17, },
    { id: lessonVocabularyId++, lessonId: 17, dictionaryId: 18, },
    { id: lessonVocabularyId++, lessonId: 17, dictionaryId: 19, },

    { id: lessonVocabularyId++, lessonId: 18, dictionaryId: 20, },
    { id: lessonVocabularyId++, lessonId: 18, dictionaryId: 21, },
    { id: lessonVocabularyId++, lessonId: 18, dictionaryId: 22, },
    { id: lessonVocabularyId++, lessonId: 18, dictionaryId: 23, },
    { id: lessonVocabularyId++, lessonId: 18, dictionaryId: 24, },

    { id: lessonVocabularyId++, lessonId: 19, dictionaryId: 20, },
    { id: lessonVocabularyId++, lessonId: 19, dictionaryId: 21, },
    { id: lessonVocabularyId++, lessonId: 19, dictionaryId: 22, },
    { id: lessonVocabularyId++, lessonId: 19, dictionaryId: 23, },
    { id: lessonVocabularyId++, lessonId: 19, dictionaryId: 24, },

    { id: lessonVocabularyId++, lessonId: 20, dictionaryId: 20, },
    { id: lessonVocabularyId++, lessonId: 20, dictionaryId: 21, },
    { id: lessonVocabularyId++, lessonId: 20, dictionaryId: 22, },
    { id: lessonVocabularyId++, lessonId: 20, dictionaryId: 23, },
    { id: lessonVocabularyId++, lessonId: 20, dictionaryId: 24, },

    { id: lessonVocabularyId++, lessonId: 21, dictionaryId: 20, },
    { id: lessonVocabularyId++, lessonId: 21, dictionaryId: 21, },
    { id: lessonVocabularyId++, lessonId: 21, dictionaryId: 22, },
    { id: lessonVocabularyId++, lessonId: 21, dictionaryId: 23, },
    { id: lessonVocabularyId++, lessonId: 21, dictionaryId: 24, },

    { id: lessonVocabularyId++, lessonId: 22, dictionaryId: 25, },
    { id: lessonVocabularyId++, lessonId: 22, dictionaryId: 26, },
    { id: lessonVocabularyId++, lessonId: 22, dictionaryId: 27, },
    { id: lessonVocabularyId++, lessonId: 22, dictionaryId: 28, },
    { id: lessonVocabularyId++, lessonId: 22, dictionaryId: 29, },

    { id: lessonVocabularyId++, lessonId: 23, dictionaryId: 25, },
    { id: lessonVocabularyId++, lessonId: 23, dictionaryId: 26, },
    { id: lessonVocabularyId++, lessonId: 23, dictionaryId: 27, },
    { id: lessonVocabularyId++, lessonId: 23, dictionaryId: 28, },
    { id: lessonVocabularyId++, lessonId: 23, dictionaryId: 29, },

    { id: lessonVocabularyId++, lessonId: 24, dictionaryId: 25, },
    { id: lessonVocabularyId++, lessonId: 24, dictionaryId: 26, },
    { id: lessonVocabularyId++, lessonId: 24, dictionaryId: 27, },
    { id: lessonVocabularyId++, lessonId: 24, dictionaryId: 28, },
    { id: lessonVocabularyId++, lessonId: 24, dictionaryId: 29, },

    { id: lessonVocabularyId++, lessonId: 25, dictionaryId: 25, },
    { id: lessonVocabularyId++, lessonId: 25, dictionaryId: 26, },
    { id: lessonVocabularyId++, lessonId: 25, dictionaryId: 27, },
    { id: lessonVocabularyId++, lessonId: 25, dictionaryId: 28, },
    { id: lessonVocabularyId++, lessonId: 25, dictionaryId: 29, },

    { id: lessonVocabularyId++, lessonId: 26, dictionaryId: 30, },
    { id: lessonVocabularyId++, lessonId: 26, dictionaryId: 31, },
    { id: lessonVocabularyId++, lessonId: 26, dictionaryId: 32, },
    { id: lessonVocabularyId++, lessonId: 26, dictionaryId: 33, },
    { id: lessonVocabularyId++, lessonId: 26, dictionaryId: 34, },

    { id: lessonVocabularyId++, lessonId: 27, dictionaryId: 30, },
    { id: lessonVocabularyId++, lessonId: 27, dictionaryId: 31, },
    { id: lessonVocabularyId++, lessonId: 27, dictionaryId: 32, },
    { id: lessonVocabularyId++, lessonId: 27, dictionaryId: 33, },
    { id: lessonVocabularyId++, lessonId: 27, dictionaryId: 34, },

    { id: lessonVocabularyId++, lessonId: 28, dictionaryId: 30, },
    { id: lessonVocabularyId++, lessonId: 28, dictionaryId: 31, },
    { id: lessonVocabularyId++, lessonId: 28, dictionaryId: 32, },
    { id: lessonVocabularyId++, lessonId: 28, dictionaryId: 33, },
    { id: lessonVocabularyId++, lessonId: 28, dictionaryId: 34, },

    { id: lessonVocabularyId++, lessonId: 29, dictionaryId: 30, },
    { id: lessonVocabularyId++, lessonId: 29, dictionaryId: 31, },
    { id: lessonVocabularyId++, lessonId: 29, dictionaryId: 32, },
    { id: lessonVocabularyId++, lessonId: 29, dictionaryId: 33, },
    { id: lessonVocabularyId++, lessonId: 29, dictionaryId: 34, },
]};