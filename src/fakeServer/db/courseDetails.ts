import type { AccordionContent } from "../../types/AccordionContent";
import { type CourseDetail } from "../../types/CourseDetail";
import { lessonsDb, modulesDb } from "./courses";

const BASE_PFP_URL = '/storage/users/userAvatars';
const POSTER_BASE_URL = '/storage/courses/coursePosters';

let courseDetailId = 0;
let curriculumId = 0;

let courseDetails: CourseDetail[] = populateCourseDetails();

export const courseDetailsDb = {
    getAll: () => {
        return [...courseDetails];
    },
    getById: (id: number) => {
        const courseDetail = courseDetails.find(cD => cD.id === id);        
        if (!courseDetail) throw new Error(`Course detail with id ${id} not found`);
        return courseDetail;
    },
    create: (courseDetail: Omit<CourseDetail, 'id'>) => {
        const newCourseDetail: CourseDetail = {
            id: courseDetailId++,
            ...courseDetail,
        };
        courseDetails.push(newCourseDetail);
        return newCourseDetail;
    },
    update: (id: number, updates: Partial<CourseDetail>) => {
        const toUpdateIndex = courseDetails.findIndex(cD => cD.id === id);
        if (toUpdateIndex === -1) throw new Error(`Course detail with id ${id} not found`);
        courseDetails[toUpdateIndex] = {...courseDetails[toUpdateIndex], ...updates};
        return courseDetails[toUpdateIndex];
    },
    delete: (id: number) => {
        const lengthBefore = courseDetails.length;
        courseDetails = courseDetails.filter(cD => cD.id !== id);
        if (lengthBefore !== courseDetails.length)
            return true;
        else throw new Error(`Course detail with ${id} not found.`);
    }
}

function createCourseDetails(courseDetails: Omit<CourseDetail, 'id' | 'curriculum' | 'courseValues'>): CourseDetail {
    const curriculum: AccordionContent[] = modulesDb.getCourseModules(courseDetails.courseId).map(cM => {
        const moduleLessonsNames = lessonsDb.getModuleLessons(cM.id).map(mL => mL.name);

        return {
            id: curriculumId++,
            heading: cM.name,
            text: moduleLessonsNames,
            expanded: false,
        }
    });

    return {
        id: courseDetailId++,
        ...courseDetails,
        curriculum,
        courseValues: [
            {label: "JLPT level", value: courseDetails.jlptLevel.toUpperCase()},
            {label: "Total words", value: courseDetails.vocabularyCount},
            {label: "Total XP", value: courseDetails.totalXP},
            {label: "Duration (hrs)", value: courseDetails.duration},
        ]
    }
}

function populateCourseDetails(): CourseDetail[] {return [
    createCourseDetails({
        courseId: 0,
        name: '(N4) Everyday Japanese Listening for Real Conversations',
        shortDescription: 'Build real listening comprehension for everyday Japanese using natural, level-appropriate input.',
        description: 'This course focuses on developing listening comprehension through repeated exposure to natural Japanese used in daily life. Instead of drills or isolated exercises, learners engage with meaningful audio content designed to be understandable while still challenging, allowing listening ability to grow naturally over time.',
        posterUrl: `${POSTER_BASE_URL}/0.jpg`,
        jlptLevel: 'n4',
        vocabularyCount: 850,
        totalXP: 1200,
        goals: ['listening', 'speaking'],
        topic: 'casualConversation',
        duration: 15,
        achievements: [
            { highlight: 'Understand natural speech', text: 'Follow everyday Japanese conversations without translating word by word.' },
            { highlight: 'Improve listening confidence', text: 'Feel comfortable listening to Japanese spoken at a natural pace.' },
            { highlight: 'Recognize common patterns', text: 'Automatically recognize frequent grammar and vocabulary in audio.' },
            { highlight: 'Build listening stamina', text: 'Listen for longer periods without mental fatigue or stress.' },
        ],
        features: [
            { type: 'audio', text: '78 natural listening tracks with varied speakers' },
            { type: 'quiz', text: '16 comprehension-based listening quizzes' },
            { type: 'flashcard', text: '420 context-based vocabulary flashcards' },
            { type: 'video', text: '12 short videos explaining listening strategies' },
            { type: 'assignment', text: '10 guided listening reflection assignments' },
            { type: 'downloadable', text: '6 downloadable transcripts for optional support' },
        ],
        prerequesites: [
            'Ability to read Hiragana and Katakana',
            'Basic understanding of simple Japanese sentences',
            'Some exposure to spoken Japanese',
            'Willingness to listen regularly without translating',
        ],
        testimonials: [
            { username: 'AikoLearns', rating: 5, text: 'This course completely changed how I approach listening. I stopped panicking and started understanding.', pfpUrl: `${BASE_PFP_URL}/0.png` },
            { username: 'KenjiR', rating: 5, text: 'The audio feels real, not textbook Japanese. After a few weeks, things started to click.', pfpUrl: `${BASE_PFP_URL}/1.png` },
            { username: 'Sora88', rating: 4, text: 'I finally feel like my listening is catching up to my reading.', pfpUrl: `${BASE_PFP_URL}/2.png` },
            { username: 'MinaK', rating: 5, text: 'Listening no longer feels exhausting. That alone made this course worth it.', pfpUrl: `${BASE_PFP_URL}/3.png` },
            { username: 'TomL', rating: 4, text: 'Great pacing and very natural progression. No overwhelm.', pfpUrl: `${BASE_PFP_URL}/4.png` },
            { username: 'YukiStudies', rating: 5, text: 'I noticed improvement without actively studying rules.', pfpUrl: `${BASE_PFP_URL}/1.png` },
            { username: 'Rin_J', rating: 5, text: 'This matches how I actually want to learn Japanese.', pfpUrl: `${BASE_PFP_URL}/2.png` },
            { username: 'AlexM', rating: 4, text: 'Simple but effective. The audio quality and content are excellent.', pfpUrl: `${BASE_PFP_URL}/3.png` },
        ],
        author: { name: 'Hiro Tanaka', nCourses: 7, avgRating: 4.6, pfpUrl: `${BASE_PFP_URL}/0.png`, about: "A renowned Japanese teacher with over 20 years of experience. He successfully tought over 5000 studends, with 3500 of which were able to pass JLPT N2 after just 2 years of studying. "},
        rating: 5,
        tags: ['Conversation', 'Vocabulary', 'Culture'],
        createdAt: new Date('2023-08-21T09:30:00'),
    }),
    createCourseDetails({
        courseId: 1,
        name: 'Practical Japanese for Travel Situations',
        shortDescription: 'Learn to understand and use Japanese naturally in real travel situations without memorizing rigid phrases.',
        description: 'This course is designed for learners who want to feel comfortable using Japanese while traveling in Japan. Instead of scripted dialogues, it focuses on understanding real speech patterns used in stations, shops, restaurants, and casual interactions, allowing learners to respond naturally and confidently.',
        posterUrl: `${POSTER_BASE_URL}/1.jpg`,
        jlptLevel: 'n5',
        vocabularyCount: 600,
        totalXP: 900,
        goals: ['listening', 'speaking'],
        topic: 'travel',
        duration: 20,
        achievements: [
            { highlight: 'Handle real interactions', text: 'Understand and respond in common travel situations without panic.' },
            { highlight: 'Recognize natural phrasing', text: 'Identify how Japanese is actually spoken in shops and stations.' },
            { highlight: 'Build speaking confidence', text: 'Respond naturally instead of relying on memorized sentences.' },
            { highlight: 'Navigate independently', text: 'Travel in Japan with less reliance on translation apps.' },
        ],
        features: [
            { type: 'audio', text: '62 real-world listening scenarios' },
            { type: 'video', text: '18 situational travel videos' },
            { type: 'quiz', text: '14 comprehension-focused quizzes' },
            { type: 'flashcard', text: '300 travel-focused vocabulary cards' },
            { type: 'assignment', text: '9 speaking and response practice tasks' },
            { type: 'downloadable', text: '4 printable travel phrase summaries' },
        ],
        prerequesites: [
            'Ability to read Hiragana and Katakana',
            'Very basic Japanese sentence exposure',
            'No prior speaking experience required',
            'Willingness to learn through listening and context',
        ],
        testimonials: [
            { username: 'TravelNeko', rating: 5, text: 'I used this course before my trip and felt surprisingly comfortable understanding people.', pfpUrl: `${BASE_PFP_URL}/0.png` },
            { username: 'MapleSam', rating: 4, text: 'It helped me stop freezing when someone spoke to me in Japanese.', pfpUrl: `${BASE_PFP_URL}/1.png` },
            { username: 'LenaW', rating: 5, text: 'The situations felt real, not like textbook roleplays.', pfpUrl: `${BASE_PFP_URL}/2.png` },
            { username: 'Riku92', rating: 5, text: 'I finally understood announcements at stations.', pfpUrl: `${BASE_PFP_URL}/3.png` },
            { username: 'AnnaK', rating: 4, text: 'Very practical and stress-free approach.', pfpUrl: `${BASE_PFP_URL}/4.png` },
            { username: 'JonP', rating: 5, text: 'This course made my trip way more enjoyable.', pfpUrl: `${BASE_PFP_URL}/1.png` },
            { username: 'MiaR', rating: 4, text: 'Good pacing and very realistic audio.', pfpUrl: `${BASE_PFP_URL}/2.png` },
            { username: 'SvenT', rating: 5, text: 'Exactly what I needed as a beginner traveler.', pfpUrl: `${BASE_PFP_URL}/3.png` },
        ],
        author: {
            name: 'Yumi Sato',
            nCourses: 5,
            avgRating: 4.5,
            pfpUrl: `${BASE_PFP_URL}/1.png`,
            about: 'Yumi is a Japanese language educator specializing in beginner-friendly, input-based learning with a focus on real-world communication and stress-free acquisition.',
        },
        rating: 4,
        tags: ['Conversation', 'Culture', 'Vocabulary'],
        createdAt: new Date('2023-10-05T14:20:00'),
    }),
    createCourseDetails({
        courseId: 2,
        name: 'Japanese for the Workplace: Natural Office Communication',
        shortDescription: 'Understand and use Japanese naturally in workplace situations without relying on rigid business phrases.',
        description: 'This course helps learners navigate Japanese workplace communication by focusing on understanding how colleagues actually speak in meetings, emails, and daily interactions. Rather than memorizing formal templates, learners acquire patterns through realistic input and repeated exposure to natural office language.',
        posterUrl: `${POSTER_BASE_URL}/2.jpg`,
        jlptLevel: 'n3',
        vocabularyCount: 1400,
        totalXP: 1800,
        goals: ['listening', 'speaking', 'reading'],
        topic: 'business-work',
        duration: 8,
        achievements: [
            { highlight: 'Understand workplace conversations', text: 'Follow meetings, small talk, and instructions in a Japanese office.' },
            { highlight: 'Use polite speech naturally', text: 'Apply appropriate levels of politeness without overthinking rules.' },
            { highlight: 'Read work-related texts', text: 'Understand emails, notices, and simple reports used at work.' },
            { highlight: 'Communicate with confidence', text: 'Respond appropriately in common professional situations.' },
        ],
        features: [
            { type: 'audio', text: '85 workplace conversation recordings' },
            { type: 'video', text: '22 realistic office scenario videos' },
            { type: 'quiz', text: '20 comprehension-based quizzes' },
            { type: 'flashcard', text: '520 work-related vocabulary flashcards' },
            { type: 'assignment', text: '12 practical communication tasks' },
            { type: 'downloadable', text: '6 reference sheets for workplace language patterns' },
        ],
        prerequesites: [
            'Comfortable with Hiragana and Katakana',
            'Basic understanding of polite Japanese',
            'Some prior listening experience',
            'Interest in working or communicating in Japanese environments',
        ],
        testimonials: [
            { username: 'OfficeLearner', rating: 5, text: 'This helped me understand my coworkers instead of just memorizing phrases.', pfpUrl: `${BASE_PFP_URL}/0.png` },
            { username: 'DevInTokyo', rating: 4, text: 'Very realistic examples of how people actually speak at work.', pfpUrl: `${BASE_PFP_URL}/1.png` },
            { username: 'MariaK', rating: 5, text: 'I finally feel less anxious during meetings.', pfpUrl: `${BASE_PFP_URL}/2.png` },
            { username: 'KenjiWork', rating: 4, text: 'Great balance between politeness and natural speech.', pfpUrl: `${BASE_PFP_URL}/3.png` },
            { username: 'SamR', rating: 5, text: 'The listening content feels authentic and useful.', pfpUrl: `${BASE_PFP_URL}/4.png` },
            { username: 'YaraL', rating: 4, text: 'Helped me read internal messages much faster.', pfpUrl: `${BASE_PFP_URL}/1.png` },
            { username: 'LeoT', rating: 5, text: 'This course filled a huge gap in my Japanese.', pfpUrl: `${BASE_PFP_URL}/2.png` },
            { username: 'NinaJ', rating: 4, text: 'Very practical and well-paced.', pfpUrl: `${BASE_PFP_URL}/3.png` },
        ],
        author: {
            name: 'Masato Kuroda',
            nCourses: 9,
            avgRating: 4.7,
            pfpUrl: `${BASE_PFP_URL}/2.png`,
            about: 'Masato has worked in Japanese corporate environments for over a decade and designs courses that reflect how Japanese is actually used in real workplaces.',
        },
        rating: 3,
        tags: ['Conversation', 'Grammar', 'Culture'],
        createdAt: new Date('2023-11-18T11:45:00'),
    }),
    createCourseDetails({
        courseId: 3,
        name: 'Japanese Through Cooking and Food Culture',
        shortDescription: 'Learn natural Japanese by understanding recipes, food conversations, and everyday cooking language.',
        description: 'This course uses Japanese food culture as a gateway to language acquisition. Learners build reading and listening skills by engaging with recipes, cooking instructions, and natural conversations about food, allowing vocabulary and grammar to emerge naturally through meaningful context.',
        posterUrl: `${POSTER_BASE_URL}/3.jpg`,
        jlptLevel: 'n2',
        vocabularyCount: 1100,
        totalXP: 1500,
        goals: ['reading', 'listening', 'speaking'],
        topic: 'cooking',
        duration: 30,
        achievements: [
            { highlight: 'Read Japanese recipes', text: 'Understand common recipe formats, ingredients, and instructions in Japanese.' },
            { highlight: 'Follow spoken instructions', text: 'Comprehend natural cooking explanations and demonstrations.' },
            { highlight: 'Use food-related vocabulary', text: 'Talk naturally about ingredients, tastes, and cooking processes.' },
            { highlight: 'Understand food culture', text: 'Gain insight into how food and language intersect in everyday Japanese life.' },
        ],
        features: [
            { type: 'video', text: '24 cooking demonstration videos with natural narration' },
            { type: 'audio', text: '58 food-related listening tracks' },
            { type: 'quiz', text: '18 comprehension and vocabulary quizzes' },
            { type: 'flashcard', text: '460 food and cooking vocabulary flashcards' },
            { type: 'assignment', text: '10 practical tasks based on real recipes' },
            { type: 'downloadable', text: '5 printable recipe-style reading materials' },
        ],
        prerequesites: [
            'Ability to read Hiragana and Katakana',
            'Basic familiarity with simple Japanese sentences',
            'Interest in food or cooking',
            'Willingness to learn through context rather than translation',
        ],
        testimonials: [
            { username: 'FoodieJP', rating: 5, text: 'I never thought learning Japanese through cooking would be this effective.', pfpUrl: `${BASE_PFP_URL}/4.png` },
            { username: 'CookAndLearn', rating: 5, text: 'The recipes made vocabulary stick naturally without memorization.', pfpUrl: `${BASE_PFP_URL}/3.png` },
            { username: 'AnnaB', rating: 4, text: 'Very enjoyable and surprisingly practical for daily Japanese.', pfpUrl: `${BASE_PFP_URL}/2.png` },
            { username: 'RyoLearner', rating: 5, text: 'I can now read simple recipes and understand cooking videos.', pfpUrl: `${BASE_PFP_URL}/1.png` },
            { username: 'MartaS', rating: 4, text: 'The cultural explanations made everything more intuitive.', pfpUrl: `${BASE_PFP_URL}/0.png` },
            { username: 'LeoCook', rating: 5, text: 'This course made learning Japanese feel fun again.', pfpUrl: `${BASE_PFP_URL}/1.png` },
            { username: 'NinaF', rating: 4, text: 'Great pacing and very natural language.', pfpUrl: `${BASE_PFP_URL}/2.png` },
            { username: 'TomH', rating: 5, text: 'Perfect mix of language and culture.', pfpUrl: `${BASE_PFP_URL}/3.png` },
        ],
        author: {
            name: 'Keiko Yamamoto',
            nCourses: 6,
            avgRating: 4.6,
            pfpUrl: `${BASE_PFP_URL}/4.png`,
            about: 'Keiko combines her background in Japanese language education and food culture to create immersive, context-driven learning experiences centered around everyday life.',
        },
        rating: 4,
        tags: ['Culture', 'Vocabulary', 'Conversation'],
        createdAt: new Date('2024-01-09T08:40:00'),
    }),
    createCourseDetails({
        courseId: 4,
        name: 'JLPT N3: Everyday Japanese for Health and Daily Wellbeing',
        shortDescription: 'Understand and use Japanese naturally in health-related situations like clinics, pharmacies, and daily wellness conversations.',
        description: 'This course helps learners acquire Japanese used in everyday health contexts such as describing symptoms, understanding simple medical advice, and talking about daily wellbeing. The focus is on comprehension-first learning through realistic input rather than memorizing technical medical terms.',
        posterUrl: `${POSTER_BASE_URL}/4.jpg`,
        jlptLevel: 'n3',
        vocabularyCount: 950,
        totalXP: 1300,
        goals: ['listening', 'speaking', 'reading'],
        topic: 'health',
        duration: 40,
        achievements: [
            { highlight: 'Describe symptoms naturally', text: 'Explain common physical conditions and feelings in simple, natural Japanese.' },
            { highlight: 'Understand basic medical instructions', text: 'Follow explanations given at clinics or pharmacies without panic.' },
            { highlight: 'Build health-related vocabulary', text: 'Recognize common words related to the body, illness, and daily wellbeing.' },
            { highlight: 'Navigate real situations', text: 'Handle everyday health interactions with more confidence and clarity.' },
        ],
        features: [
            { type: 'audio', text: '64 realistic health-related listening scenarios' },
            { type: 'video', text: '16 situational videos set in clinics and pharmacies' },
            { type: 'quiz', text: '15 comprehension-based quizzes' },
            { type: 'flashcard', text: '380 health and body-related vocabulary flashcards' },
            { type: 'assignment', text: '9 practical speaking and comprehension tasks' },
            { type: 'downloadable', text: '5 printable reference sheets for common expressions' },
        ],
        prerequesites: [
            'Ability to read Hiragana and Katakana',
            'Basic understanding of everyday Japanese sentences',
            'Some listening experience recommended',
            'Interest in practical, real-life Japanese usage',
        ],
        testimonials: [
            { username: 'WellnessJP', rating: 5, text: 'I finally understood what the pharmacist was saying without switching to English.', pfpUrl: `${BASE_PFP_URL}/0.png` },
            { username: 'HealthLearner', rating: 4, text: 'Very reassuring course for dealing with everyday situations.', pfpUrl: `${BASE_PFP_URL}/1.png` },
            { username: 'MikaR', rating: 5, text: 'The listening content felt very real and useful.', pfpUrl: `${BASE_PFP_URL}/2.png` },
            { username: 'JonS', rating: 4, text: 'Helped me explain symptoms more naturally.', pfpUrl: `${BASE_PFP_URL}/3.png` },
            { username: 'SaraL', rating: 5, text: 'Practical and calm approach, exactly what I needed.', pfpUrl: `${BASE_PFP_URL}/4.png` },
            { username: 'AlexP', rating: 4, text: 'Good balance between language and real-life application.', pfpUrl: `${BASE_PFP_URL}/1.png` },
            { username: 'YumiT', rating: 5, text: 'I feel much less anxious about health-related conversations now.', pfpUrl: `${BASE_PFP_URL}/2.png` },
            { username: 'ChrisM', rating: 4, text: 'Very approachable and well-structured.', pfpUrl: `${BASE_PFP_URL}/3.png` },
        ],
        author: {
            name: 'Naoko Fujita',
            nCourses: 4,
            avgRating: 4.5,
            pfpUrl: `${BASE_PFP_URL}/4.png`,
            about: 'Naoko specializes in practical Japanese for daily life and focuses on helping learners feel calm and confident in real-world situations through comprehensible input.',
        },
        rating: 4,
        tags: ['Conversation', 'Vocabulary', 'Culture'],
        createdAt: new Date('2024-02-14T10:10:00'),
    }),
    createCourseDetails({
        courseId: 5,
        name: 'JLPT N1: Advanced Japanese Through Real Texts',
        shortDescription: 'Develop N1-level comprehension by working with authentic Japanese texts and advanced listening material.',
        description: 'This course is designed for advanced learners preparing for JLPT N1 who want to strengthen real comprehension rather than rely on test tricks. Learners engage with complex written and spoken Japanese drawn from essays, commentary-style audio, and formal discussions, allowing advanced grammar and vocabulary to be acquired through repeated exposure.',
        posterUrl: `${POSTER_BASE_URL}/5.png`,
        jlptLevel: 'n1',
        vocabularyCount: 3200,
        totalXP: 2600,
        goals: ['reading', 'listening', 'examPrep'],
        topic: 'business-work',
        duration: 14,
        achievements: [
            { highlight: 'Understand advanced texts', text: 'Read essays, opinion pieces, and formal explanations written for native speakers.' },
            { highlight: 'Follow abstract discussions', text: 'Comprehend spoken Japanese dealing with abstract, technical, or social topics.' },
            { highlight: 'Internalize N1 grammar', text: 'Recognize advanced grammar patterns instantly without conscious analysis.' },
            { highlight: 'Build exam confidence', text: 'Approach JLPT N1 reading and listening sections with calm and clarity.' },
        ],
        features: [
            { type: 'reading', text: 'Advanced reading passages modeled on real Japanese texts' } as any,
            { type: 'audio', text: '72 long-form listening tracks with formal and semi-formal speech' },
            { type: 'quiz', text: '22 N1-style comprehension quizzes' },
            { type: 'flashcard', text: '680 high-frequency N1 vocabulary flashcards' },
            { type: 'assignment', text: '14 deep comprehension and summary tasks' },
            { type: 'downloadable', text: '6 printable reading and listening reference guides' },
        ],
        prerequesites: [
            'Solid N2-level reading and listening comprehension',
            'Comfortable reading long Japanese texts',
            'Ability to focus for extended listening sessions',
            'Goal of passing JLPT N1 or reaching near-native comprehension',
        ],
        testimonials: [
            { username: 'N1Hopeful', rating: 5, text: 'This finally made N1-level texts feel readable instead of terrifying.', pfpUrl: `${BASE_PFP_URL}/4.png` },
            { username: 'AdvancedJP', rating: 5, text: 'The listening material is tough but realistic, exactly what I needed.', pfpUrl: `${BASE_PFP_URL}/3.png` },
            { username: 'LinguaMax', rating: 4, text: 'I stopped overanalyzing grammar and started understanding meaning.', pfpUrl: `${BASE_PFP_URL}/2.png` },
            { username: 'SatoshiL', rating: 5, text: 'This course bridged the gap between study Japanese and real Japanese.', pfpUrl: `${BASE_PFP_URL}/1.png` },
            { username: 'ClaireN', rating: 4, text: 'Very demanding but extremely rewarding.', pfpUrl: `${BASE_PFP_URL}/0.png` },
            { username: 'YutoExam', rating: 5, text: 'My reading speed and confidence improved dramatically.', pfpUrl: `${BASE_PFP_URL}/4.png` },
            { username: 'MarkJP', rating: 4, text: 'Not easy, but it finally feels like real progress.', pfpUrl: `${BASE_PFP_URL}/3.png` },
            { username: 'EmiK', rating: 5, text: 'This is what advanced learners actually need.', pfpUrl: `${BASE_PFP_URL}/2.png` },
        ],
        author: {
            name: 'Takeshi Mori',
            nCourses: 11,
            avgRating: 4.8,
            pfpUrl: `${BASE_PFP_URL}/0.png`,
            about: 'Takeshi specializes in advanced Japanese acquisition and JLPT preparation, focusing on deep comprehension through authentic materials rather than shortcut-based test strategies.',
        },
        rating: 5,
        tags: ['JLPT', 'Grammar', 'Vocabulary'],
        createdAt: new Date('2024-03-22T16:00:00'),
    }),
    createCourseDetails({
        courseId: 6,
        name: 'JLPT N2: Bridging Intermediate to Advanced Japanese',
        shortDescription: 'Close the gap between N3 comfort and N1 complexity through structured, realistic Japanese input.',
        description: 'This course targets learners who feel stuck between intermediate and advanced Japanese. Through carefully graded readings and listening material, students gradually adapt to longer sentences, denser vocabulary, and more abstract topics while maintaining a strong focus on comprehension over memorization.',
        posterUrl: `${POSTER_BASE_URL}/6.png`,
        jlptLevel: 'n2',
        vocabularyCount: 2100,
        totalXP: 1900,
        goals: ['reading', 'listening', 'examPrep'],
        topic: 'business-work',
        duration: 18,
        achievements: [
            { highlight: 'Handle long sentences', text: 'Understand multi-clause sentences without losing track of meaning.' },
            { highlight: 'Comprehend abstract topics', text: 'Follow discussions on social issues, work culture, and opinions.' },
            { highlight: 'Strengthen N2 grammar', text: 'Recognize N2 grammar patterns naturally through repeated exposure.' },
            { highlight: 'Prepare for N1', text: 'Build the foundation needed to confidently move toward N1-level materials.' },
        ],
        features: [
            { type: 'audio', text: '58 intermediate-to-advanced listening recordings' },
            { type: 'video', text: '14 explanatory and situational videos' },
            { type: 'quiz', text: '18 comprehension-based quizzes' },
            { type: 'flashcard', text: '520 high-frequency N2 vocabulary flashcards' },
            { type: 'assignment', text: '12 structured reading and listening tasks' },
            { type: 'downloadable', text: '6 printable grammar and reading summaries' },
        ],
        prerequesites: [
            'Comfortable N3-level reading and listening skills',
            'Ability to read short articles in Japanese',
            'Basic familiarity with formal Japanese',
            'Motivation to move beyond textbook-style learning',
        ],
        testimonials: [
            { username: 'StuckAtN2', rating: 5, text: 'This finally made N2 feel manageable instead of overwhelming.', pfpUrl: `${BASE_PFP_URL}/0.png` },
            { username: 'JPBridge', rating: 4, text: 'Great pacing and realistic material.', pfpUrl: `${BASE_PFP_URL}/1.png` },
            { username: 'N2Journey', rating: 5, text: 'Helped me stop translating in my head.', pfpUrl: `${BASE_PFP_URL}/2.png` },
            { username: 'AlexW', rating: 4, text: 'Challenging but very well structured.', pfpUrl: `${BASE_PFP_URL}/3.png` },
            { username: 'KanaLearner', rating: 5, text: 'Exactly what I needed between N3 and N1.', pfpUrl: `${BASE_PFP_URL}/4.png` },
            { username: 'TomJP', rating: 4, text: 'The listening content feels very authentic.', pfpUrl: `${BASE_PFP_URL}/1.png` },
            { username: 'MayaR', rating: 5, text: 'I can finally read longer texts without fatigue.', pfpUrl: `${BASE_PFP_URL}/2.png` },
            { username: 'LeoS', rating: 4, text: 'Solid preparation for advanced Japanese.', pfpUrl: `${BASE_PFP_URL}/3.png` },
        ],
        author: {
            name: 'Ayaka Nishimura',
            nCourses: 9,
            avgRating: 4.6,
            pfpUrl: `${BASE_PFP_URL}/1.png`,
            about: 'Ayaka focuses on helping intermediate learners cross the hardest plateau in Japanese by emphasizing clarity, repetition, and meaningful exposure to real language.',
        },
        rating: 5,
        tags: ['JLPT', 'Grammar', 'Vocabulary'],
        createdAt: new Date('2024-01-18T13:30:00'),
    }),
]};