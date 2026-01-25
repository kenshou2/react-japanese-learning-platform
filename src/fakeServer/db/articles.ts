import type { Article } from "../../types/Article";

const POSTER_BASE_URL = '/storage/articles/articlePosters';
const ARTICLE_IMG_BASE_URL = '/storage/articles/articleImages';
let articleId = 0;

let articles: Article[] = populateArticles();

export const articlesDb = {
    getAll: () => [...articles],
    getById: (id: number) => {
        const article = articles.find(a => a.id === id);
        if (!article) throw new Error(`Article with ${id} not found.`);
        return article;
    },
    create: (article: Omit<Article, 'id'>) => {
        const newArticle: Article = {
            id: articleId++,
            ...article,
        };
        articles.push(newArticle);
        return newArticle;
    },
    update: (id: number, updates: Partial<Article>) => {
        const toUpdateIndex = articles.findIndex(a => a.id === id);
        if (toUpdateIndex === -1)
            throw new Error(`Article with ${id} not found.`);
        articles[toUpdateIndex] = {...articles[toUpdateIndex], ...updates};
        return articles[toUpdateIndex];
    },
    delete: (id: number) => {
        const lengthBefore = articles.length;
        articles = articles.filter(a => a.id !== id);
        if (lengthBefore !== articles.length)
            return true;
        else throw new Error(`Article with ${id} not found.`);        
    },
}

function slugify(text: string) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
}

function createArticle(input: Omit<Article, 'id'>): Article {
    const headingIdMap = new Map<string, number>()

    const content = input.content.map(block => {
        if (block.type !== 'heading') return block

        const base = slugify(block.text)
        const count = headingIdMap.get(base) ?? 0
        headingIdMap.set(base, count + 1)

        return {
            ...block,
            id: count === 0 ? base : `${base}-${count}`,
        }
    })

    return {
        ...input,
        id: articleId++,
        content,
    }
}

function populateArticles(): Article[] {return [
    createArticle({
        name: "Understanding は vs が in Natural Japanese",
        overview: 'A meaning-first explanation of は and が, focusing on how they are actually used and acquired through real exposure rather than memorized rules.',
        timeToRead: 12,
        tags: ['JLPT', 'Grammar'],
        content: [
            {type: 'heading', id: '', text: 'Why は and が Feel Impossible at First'},
            {type: 'paragraph', text: 'If you have spent any time learning Japanese, you have probably run into は and が and felt immediately confused. Many learners are told that both particles mark the subject, yet native speakers seem to use them in ways that do not match simple explanations.'},
            {type: 'paragraph', text: 'This confusion is not a personal failure. It is a natural result of trying to understand a deeply contextual feature of Japanese through abstract rules rather than lived examples.'},
            {type: 'note', text: 'Feeling confused about は and が often means you are moving beyond beginner-level pattern memorization and into real language understanding.'},
            {type: 'heading', id: '', text: 'は: Talking About Something'},
            {type: 'paragraph', text: 'は is best understood as a topic marker. When you use は, you are telling the listener, “We are now talking about this.” Once the topic is set, the sentence gives new or relevant information about it.'},
            {type: 'paragraph', text: 'This is why は frequently appears in general statements, explanations, and situations where the speaker assumes shared knowledge with the listener.'},
            {type: 'list', items: ['は introduces what the sentence is about', 'It often refers to information already known or assumed', 'It can create contrast, even without saying so directly']},
            {type: 'important', text: 'If you think of は as “the subject,” many real Japanese sentences will feel illogical. Thinking in terms of “topic” makes them suddenly make sense.'},
            {type: 'heading', id: '', text: 'が: Pointing Something Out'},
            {type: 'paragraph', text: 'が is used when the speaker wants to point something out, identify it, or bring it into focus. It often appears when something is new, unexpected, or important in that moment.'},
            {type: 'paragraph', text: 'This is why が frequently shows up in answers to questions, descriptions, and sentences where the speaker is discovering or emphasizing something.'},
            {type: 'list', items: ['が highlights the subject itself', 'It is common in answers to “who” or “what” questions', 'It often introduces new information']},
            {type: 'image', url: `${ARTICLE_IMG_BASE_URL}/0.png`, alt: 'This is an image for an article.'},
            {type: 'heading', id: '', text: 'Why Rules Alone Don\'t Work'},
            {type: 'paragraph', text: 'Many textbooks attempt to explain は and が using decision trees or fixed rules. While these explanations may seem logical, they often break down when learners encounter real Japanese in the wild.'},
            {type: 'paragraph', text: 'Native speakers do not choose は or が by following rules. They choose them instinctively, based on what feels natural in the context. This instinct is built through exposure, not explanation.'},
            {type: 'note', text: 'Understanding particles is less about knowing why something is correct and more about recognizing that it is correct.'},
            {type: 'heading', id: '', text: 'How to Actually Acquire は and が'},
            {type: 'paragraph', text: 'The most reliable way to internalize は and が is through large amounts of meaningful input. Reading stories, watching videos, and listening to conversations allows your brain to notice patterns without conscious effort.'},
            {type: 'paragraph', text: 'Over time, sentences with は or が will start to sound right or wrong instinctively. This is a sign that acquisition is happening, even if you cannot explain the rule.'},
            {type: 'list', items: ['Read content you genuinely enjoy', 'Avoid stopping to analyze every sentence', 'Trust that understanding builds gradually']},
            {type: 'heading', id: '', text: 'Final Thoughts'},
            {type: 'paragraph', text: 'は and が are not problems to be solved once and forgotten. They are features of Japanese that become clearer as your exposure deepens. Confusion fades naturally when your input is rich, interesting, and understandable.'},
            {type: 'list', items: ['は sets the topic', 'が draws attention', 'Intuition comes from exposure', 'Enjoyment accelerates learning']},
            {type: 'heading', id: '', text: 'Reference'},
            {type: 'reference', items: [{name: 'Grammar explanation resource', url: '',}, {name: 'Particle example collection', url: '/',}, {name: 'Comprehensible input reading set', url: '/',}]},
        ],
        posterUrl: `${POSTER_BASE_URL}/${articleId}.png`,
    }),    
    createArticle({
        name: "How Japanese People Really Say “You”",
        overview: 'A cultural and linguistic look at why Japanese often avoids direct words for “you,” and what native speakers do instead.',
        timeToRead: 10,
        tags: ['Vocabulary', 'Culture'],
        content: [
            {type: 'heading', id: '', text: 'Why “You” Is Rare in Japanese'},
            {type: 'paragraph', text: 'One of the first surprises for many Japanese learners is the absence of a common, neutral word for “you.” While textbooks introduce words like あなた, native speakers often avoid using any explicit “you” at all.'},
            {type: 'paragraph', text: 'This is not a gap in the language. It is a reflection of how Japanese communication prioritizes context, relationships, and shared understanding over direct reference.'},
            {type: 'note', text: 'If Japanese feels vague or indirect at first, that feeling usually fades as your exposure increases.'},
            {type: 'heading', id: '', text: 'The Problem with あなた'},
            {type: 'paragraph', text: 'あなた technically means “you,” but its real-world usage is limited. In many situations, it can sound distant, overly formal, or even rude depending on tone and context.'},
            {type: 'paragraph', text: 'Because of this, native speakers often reserve あなた for very specific situations, such as formal writing, advertisements, or certain fixed expressions.'},
            {type: 'important', text: 'Using あなた frequently in conversation can make your Japanese sound unnatural, even if it is grammatically correct.'},
            {type: 'heading', id: '', text: 'What Japanese Uses Instead'},
            {type: 'paragraph', text: 'Rather than saying “you,” Japanese speakers usually rely on context. In many conversations, the listener is already obvious, making a pronoun unnecessary. When clarification is needed, speakers may use the person\'s name, title, or role instead.'},            
            {type: 'list', items: ['The listener\'s name', 'Job titles or roles', 'Family terms in close relationships', 'No pronoun at all']},
            {type: 'image', url: `${ARTICLE_IMG_BASE_URL}/1.png`},
            {type: 'heading', id: '', text: 'Words That Can Mean “You” — and Their Risks'},
            {type: 'paragraph', text: 'Japanese does have several words that translate to “you,” such as 君, お前, and 貴方. However, these words carry strong social and emotional nuance.'},
            {type: 'paragraph', text: 'Using the wrong one in the wrong situation can sound aggressive, arrogant, or overly intimate. For this reason, learners are often better off avoiding them early on.'},
            {type: 'list', items: ['Some forms are gendered', 'Some imply hierarchy or dominance', 'Many are restricted to close relationships']},
            {type: 'note', text: 'Not using “you” is often safer and more natural than choosing the “correct” word.'},
            {type: 'heading', id: '', text: 'How Learners Naturally Pick This Up'},
            {type: 'paragraph', text: 'Most learners do not consciously memorize when to avoid “you.” Instead, they acquire this habit by seeing and hearing how Japanese is used in stories, shows, and real conversations.'},
            {type: 'paragraph', text: 'After enough exposure, sentences with unnecessary pronouns start to feel awkward, even if you cannot explain why.'},
            {type: 'heading', id: '', text: 'Key Takeaways'},
            {type: 'paragraph', text: 'Japanese does not lack a word for “you.” It simply does not rely on one in the same way English does. Understanding this is less about vocabulary and more about adopting a different way of thinking about communication.'},
            {type: 'list', items: ['“You” is often implied, not stated', 'Names and roles replace pronouns', 'Context does most of the work', 'Exposure builds intuition']},
            {type: 'heading', id: '', text: 'Reference'},
            {type: 'reference', items: [{name: 'Cultural explanation resource', url: ''}, {name: 'Pronoun usage examples', url: ''}, {name: 'Natural conversation samples', url: ''},]},
        ],
        posterUrl: `${POSTER_BASE_URL}/${articleId}.png`,
    }),    
    createArticle({
        name: 'How Japanese Learners Naturally Build Listening Skills',
        overview: 'Listening is often seen as the hardest skill in Japanese. This article explains how listening ability actually develops, why struggling is normal, and how learners can make steady progress without burnout.',
        timeToRead: 11,
        tags: ['Grammar', 'Culture'],
        content: [
            { type: 'heading', id: '', text: 'Why Listening Feels So Difficult',},
            { type: 'paragraph', text: 'Many Japanese learners feel confident while reading but completely lost when listening. Words seem to disappear, sentences feel too fast, and even familiar grammar becomes hard to recognize in real time.',},
            { type: 'paragraph', text: 'This gap between reading and listening is extremely common. It does not mean that your Japanese is weak. It usually means that your brain has not yet had enough exposure to spoken Japanese.', },
            { type: 'note', text: 'Difficulty with listening is not a sign of failure. It is a normal stage of language acquisition.', },
            { type: 'heading', id: '', text: 'Spoken Japanese Is Not Written Japanese', },
            { type: 'paragraph', text: 'One reason listening feels so hard is that spoken Japanese behaves differently from written Japanese. Sounds blend together, particles are reduced, and sentences are often incomplete.', },
            { type: 'paragraph', text: 'Native speakers rely heavily on context, shared knowledge, and expectation. Learners who expect spoken Japanese to match textbook examples often feel overwhelmed.', },
            { type: 'list', items: [ 'Sounds merge and shorten in natural speech', 'Sentences are often unfinished', 'Context carries more meaning than words alone', ], },
            { type: 'important', text: 'Trying to hear every word clearly can actually slow down listening progress.', },
            { type: 'heading', id: '', text: 'Why More Listening Is the Only Real Solution', },
            { type: 'paragraph', text: 'Listening ability improves through repeated exposure to understandable spoken language. There is no shortcut and no technique that replaces time spent listening.', },
            { type: 'paragraph', text: 'Over time, your brain starts to recognize common sound patterns, grammar structures, and rhythm. This happens naturally, even if you do not consciously notice progress.', },
            { type: 'note', text: 'Progress in listening often feels invisible until one day things suddenly seem clearer.', },
            { type: 'heading', id: '', text: 'What Kind of Content Actually Helps', },
            { type: 'paragraph', text: 'The best listening material is content you mostly understand but still find slightly challenging. Completely incomprehensible audio rarely leads to improvement.', },
            { type: 'paragraph', text: 'Enjoyment also matters. When content is interesting, learners naturally listen longer and more often, which leads to better results.', },
            { type: 'list', items: [ 'Content slightly above your current level', 'Topics you genuinely enjoy', 'Audio with natural but clear speech', ], },            
            { type: 'heading', id: '', text: 'Building a Sustainable Listening Habit', },
            { type: 'paragraph', text: 'Consistency matters more than intensity. Short, frequent listening sessions are usually more effective than long, exhausting ones.', },
            { type: 'paragraph', text: 'Many successful learners integrate listening into daily life by pairing it with activities like walking, commuting, or relaxing.', },
            { type: 'important', text: 'Listening should feel manageable. If it feels constantly stressful, the level may be too high.', },
            { type: 'heading', id: '', text: 'Key Takeaways', },
            { type: 'list', items: [ 'Listening difficulty is normal', 'Spoken Japanese relies heavily on context', 'Understanding grows through exposure, not effort', 'Enjoyable input leads to long-term progress', ], },
            {type: 'heading', id: '', text: 'Reference'},
            { type: 'reference', items: [ { name: 'Listening development overview', url: '' }, { name: 'Comprehensible input explanation', url: '' }, { name: 'Japanese listening examples', url: '' }, ], },
        ],
        posterUrl: `${POSTER_BASE_URL}/${articleId}.png`,
    }),
    createArticle({
        name: 'Why Vocabulary Memorization Alone Stops Working',
        overview: 'Many Japanese learners reach a point where memorizing more words no longer leads to better comprehension. This article explains why that happens and what actually helps vocabulary become usable.',
        timeToRead: 10,
        tags: ['Vocabulary', 'Grammar'],
        content: [
            { type: 'heading', id: '', text: 'When Memorizing Words Feels Pointless' },
            { type: 'paragraph', text: 'At the beginning of learning Japanese, memorizing vocabulary often leads to fast progress. New words feel useful immediately, and reading or listening becomes easier with each list learned.' },
            { type: 'paragraph', text: 'However, many learners eventually reach a stage where they know thousands of words but still struggle to understand real Japanese. This can feel frustrating and confusing.' },
            { type: 'note', text: 'Feeling stuck after learning many words is a common and temporary stage.' },
            { type: 'heading', id: '', text: 'Knowing a Word vs Recognizing It Naturally' },
            { type: 'paragraph', text: 'Memorized vocabulary often exists only as isolated information. Learners may know a word’s meaning but fail to recognize it quickly when it appears in a sentence.' },
            { type: 'paragraph', text: 'Real comprehension requires instant recognition. This ability develops through repeated exposure in meaningful contexts, not through word lists alone.' },
            { type: 'important', text: 'If you have to mentally translate a word, it is not fully acquired yet.' },
            { type: 'heading', id: '', text: 'Why Context Matters More Than Definitions' },
            { type: 'paragraph', text: 'Words in Japanese change nuance depending on situation, speaker, and surrounding language. A dictionary definition rarely captures how a word is actually used.' },
            { type: 'paragraph', text: 'Seeing the same word across different contexts allows your brain to build a flexible, intuitive understanding of its meaning.' },
            { type: 'list', items: ['Context reveals nuance', 'Usage patterns matter more than translations', 'Repetition across situations builds intuition'] },
            { type: 'heading', id: '', text: 'How Vocabulary Becomes Usable' },
            { type: 'paragraph', text: 'Usable vocabulary emerges when words are encountered naturally in reading and listening. Over time, recognition becomes automatic and effortless.' },
            { type: 'paragraph', text: 'This process is gradual and often invisible. Learners usually notice progress only when comprehension suddenly feels easier.' },            
            { type: 'note', text: 'Forgetting words temporarily does not mean they are lost.' },
            { type: 'heading', id: '', text: 'A More Effective Way to Learn Words' },
            { type: 'paragraph', text: 'Rather than focusing on memorization, successful learners prioritize understanding messages. Vocabulary is acquired as a side effect of comprehension.' },
            { type: 'paragraph', text: 'Reading stories, watching shows, and listening to content you enjoy allows words to repeat naturally without deliberate effort.' },
            { type: 'important', text: 'Enjoyment increases exposure, and exposure drives acquisition.' },
            { type: 'heading', id: '', text: 'Key Takeaways' },
            { type: 'list', items: ['Memorization has limits', 'Recognition matters more than recall', 'Context builds real understanding', 'Input leads to acquisition'] },
            {type: 'heading', id: '', text: 'Reference'},
            { type: 'reference', items: [{ name: 'Vocabulary acquisition overview', url: '' }, { name: 'Context-based learning explanation', url: '' }, { name: 'Input-focused learning examples', url: '' }] },
        ],
        posterUrl: `${POSTER_BASE_URL}/${articleId}.jpg`,
    }),
    createArticle({
        name: 'How Japanese Learners Can Master Polite Speech',
        overview: 'Polite language in Japanese can feel overwhelming, but understanding its structure and usage makes it manageable. This article explains keigo and practical ways to acquire polite speech naturally.',
        timeToRead: 12,
        tags: ['Grammar', 'Culture'],
        content: [
            { type: 'heading', id: '', text: 'Why Polite Speech Feels Complicated' },
            { type: 'paragraph', text: 'Japanese has multiple levels of politeness, which can make learners feel unsure about what to say in different situations.' },
            { type: 'paragraph', text: 'Misusing polite forms can sound awkward or even rude, adding pressure for learners to memorize rules instead of speaking naturally.' },
            { type: 'note', text: 'Struggling with keigo is completely normal and part of the learning process.' },
            { type: 'heading', id: '', text: 'The Three Levels of Politeness' },
            { type: 'paragraph', text: 'Basic Japanese has casual, polite, and honorific forms, each used depending on social context and the relationship between speakers.' },
            { type: 'paragraph', text: 'Casual speech is used with friends and family, polite (です／ます) with most strangers or coworkers, and honorific/humble forms for clients or elders.' },
            { type: 'list', items: ['Casual: used with close friends', 'Polite: standard polite form', 'Honorific/Humble: shows respect in formal situations'] },
            { type: 'important', text: 'Focus first on mastering polite (です／ます) before attempting more complex keigo.' },
            { type: 'heading', id: '', text: 'Why Memorizing Rules Alone Doesn’t Work' },
            { type: 'paragraph', text: 'Keigo rules can be complicated and sometimes contradictory. Memorizing forms without context rarely leads to natural usage.' },
            { type: 'paragraph', text: 'Native speakers rarely consciously follow rules—they rely on patterns they have internalized through experience.' },
            { type: 'note', text: 'Acquisition comes from repeated exposure to real conversations, not rulebooks.' },
            { type: 'heading', id: '', text: 'Practical Ways to Acquire Polite Speech' },
            { type: 'paragraph', text: 'Engage with content you enjoy, like dramas, podcasts, or anime with natural speech, and pay attention to when polite forms are used.' },
            { type: 'paragraph', text: 'Practice speaking regularly, even in simple conversations or shadowing exercises, so that patterns become intuitive.' },
            { type: 'list', items: ['Listen to natural speech', 'Repeat phrases in context', 'Shadow native speakers aloud', 'Use polite forms daily'] },            
            { type: 'heading', id: '', text: 'Avoiding Common Pitfalls' },
            { type: 'paragraph', text: 'Overthinking rules can lead to hesitation or unnatural speech. Trust patterns learned through exposure and practice.' },
            { type: 'paragraph', text: 'Mixing casual and polite forms randomly is common at first, and it is okay—accuracy improves with experience.' },
            { type: 'important', text: 'Fluency comes from familiarity, not perfection.' },
            { type: 'heading', id: '', text: 'Key Takeaways' },
            { type: 'list', items: ['Polite forms are essential for social interactions', 'Start with です／ます forms', 'Exposure to natural speech builds intuition', 'Practice regularly to internalize patterns'] },
            {type: 'heading', id: '', text: 'Reference'},
            { type: 'reference', items: [{ name: 'Polite speech guide', url: '' }, { name: 'Keigo usage examples', url: '' }, { name: 'Shadowing exercises', url: '' }] },
        ],
        posterUrl: `${POSTER_BASE_URL}/${articleId}.jpg`,
    }),
    createArticle({
        name: 'How to Effectively Learn Japanese Through Reading',
        overview: 'Reading is one of the most effective ways to acquire Japanese naturally. This article explains why reading works, what types of material help most, and how to turn reading into a language learning habit.',
        timeToRead: 11,
        tags: ['Vocabulary', 'Culture'],
        content: [
            { type: 'heading', id: '', text: 'Why Reading Boosts Language Acquisition' },
            { type: 'paragraph', text: 'Reading exposes you to grammar, vocabulary, and sentence patterns repeatedly in meaningful contexts.' },
            { type: 'paragraph', text: 'Unlike memorization, reading allows your brain to absorb language naturally, building intuition for how Japanese works.' },
            { type: 'note', text: 'Even if you do not understand every word, exposure still helps your brain internalize structures.' },
            { type: 'heading', id: '', text: 'Choosing the Right Material' },
            { type: 'paragraph', text: 'The most effective reading material is interesting, slightly challenging, and understandable with context clues.' },
            { type: 'paragraph', text: 'Children’s books, manga, or adapted readers are often perfect for beginners, while news articles or novels are good for advanced learners.' },
            { type: 'list', items: ['Slightly above current level', 'Engaging content you enjoy', 'Content with clear context for comprehension'] },
            { type: 'important', text: 'Interest and comprehension are more important than level or vocabulary lists.' },
            { type: 'heading', id: '', text: 'How to Turn Reading Into a Habit' },
            { type: 'paragraph', text: 'Consistency matters more than volume. Short daily reading sessions are better than occasional long sessions.' },
            { type: 'paragraph', text: 'Set a realistic goal, like 10–15 minutes daily, and gradually increase as it becomes part of your routine.' },
            { type: 'paragraph', text: 'Combine reading with listening or shadowing for maximum effect.' },
            { type: 'heading', id: '', text: 'Tips for Maximizing Comprehension' },
            { type: 'paragraph', text: 'Focus on understanding the gist rather than every word. Use context to infer meaning.' },
            { type: 'paragraph', text: 'Note down new words and patterns, but avoid over-stopping; fluency develops from repeated exposure.' },
            { type: 'list', items: ['Infer meaning from context', 'Highlight key phrases', 'Review patterns rather than every single word'] },            
            { type: 'heading', id: '', text: 'Common Mistakes to Avoid' },
            { type: 'paragraph', text: 'Relying on dictionaries too much slows acquisition. Skipping material that feels “hard” prevents growth.' },
            { type: 'paragraph', text: 'Perfectionism can be counterproductive; focus on comprehension and exposure.' },
            { type: 'important', text: 'Language acquisition is gradual, and effort without immediate understanding still counts.' },
            { type: 'heading', id: '', text: 'Key Takeaways' },
            { type: 'list', items: ['Reading builds intuition for grammar and vocabulary', 'Choose interesting, slightly challenging material', 'Daily short sessions work best', 'Focus on meaning, not perfection'] },
            {type: 'heading', id: '', text: 'Reference'},
            { type: 'reference', items: [{ name: 'Comprehensible input reading', url: '' }, { name: 'Japanese reading strategies', url: '' }, { name: 'Shadowing and reading combo', url: '' }] },
        ],
        posterUrl: `${POSTER_BASE_URL}/${articleId}.jpg`,
    }),
    createArticle({
        name: 'Understanding Japanese Counters: A Practical Guide',
        overview: 'Counters in Japanese can be confusing for learners, but mastering them is crucial for counting objects, people, and events naturally. This article explains the main types and offers practical strategies for acquisition.',
        timeToRead: 12,
        tags: ['Grammar', 'Vocabulary'],
        content: [
            { type: 'heading', id: '', text: 'Why Counters Are Important' },
            { type: 'paragraph', text: 'Japanese uses counters for almost every type of object, and using the wrong counter can make a sentence sound unnatural or even confusing.' },
            { type: 'paragraph', text: 'Learning counters is not just memorization; it is about recognizing patterns and context in real language use.' },
            { type: 'note', text: 'It is normal to make mistakes with counters even at intermediate levels.' },
            { type: 'heading', id: '', text: 'The Most Common Counter Categories' },
            { type: 'paragraph', text: 'There are general counters, object-specific counters, and special counters for people, animals, and flat objects.' },
            { type: 'paragraph', text: 'Some of the most frequently used counters include つ (general), 人 (people), 枚 (flat objects), and 本 (long cylindrical objects).' },
            { type: 'list', items: ['General: つ', 'People: 人', 'Flat objects: 枚', 'Long objects: 本'] },
            { type: 'important', text: 'Focus on the most common counters first; the rest will become intuitive through exposure.' },
            { type: 'heading', id: '', text: 'How Counters Are Used in Context' },
            { type: 'paragraph', text: 'Counters are always combined with numbers and often with nouns, e.g., りんごを三つ (three apples).' },
            { type: 'paragraph', text: 'Listening to natural Japanese helps learners hear which counters are used with which nouns.' },
            { type: 'note', text: 'Patterns become intuitive over time; don’t worry about memorizing every exception immediately.' },
            { type: 'heading', id: '', text: 'Tips for Learning Counters Effectively' },
            { type: 'paragraph', text: 'Integrate counters into sentences rather than memorizing them in isolation.' },
            { type: 'paragraph', text: 'Practice counting objects around you and say the phrases aloud to reinforce natural usage.' },
            { type: 'list', items: ['Practice in context', 'Use real objects when possible', 'Listen to counters in natural speech', 'Repeat aloud to internalize patterns'] },            
            { type: 'heading', id: '', text: 'Common Pitfalls' },
            { type: 'paragraph', text: 'Trying to memorize every counter at once leads to confusion and frustration.' },
            { type: 'paragraph', text: 'Using the wrong counter occasionally is natural; focus on comprehension and exposure rather than perfection.' },
            { type: 'important', text: 'Acquisition comes from repeated exposure, not rule memorization.' },
            { type: 'heading', id: '', text: 'Key Takeaways' },
            { type: 'list', items: ['Start with the most common counters', 'Use them in context, not isolation', 'Exposure in real language builds intuition', 'Practice speaking to reinforce memory'] },
            {type: 'heading', id: '', text: 'Reference'},
            { type: 'reference', items: [{ name: 'Japanese counters overview', url: '' }, { name: 'Counter usage examples', url: '' }, { name: 'Counting practice exercises', url: '' }] },
        ],
        posterUrl: `${POSTER_BASE_URL}/${articleId}.jpg`,
    }),
    createArticle({
        name: 'The Role of Particles in Japanese Sentence Meaning',
        overview: 'Particles are small words in Japanese that carry huge meaning. This article explains their function, how they change nuance, and strategies for acquiring an intuitive understanding.',
        timeToRead: 11,
        tags: ['Grammar', 'JLPT'],
        content: [
            { type: 'heading', id: '', text: 'Why Particles Are Essential' },
            { type: 'paragraph', text: 'Particles mark the function of words in a sentence and clarify relationships between subjects, objects, and actions.' },
            { type: 'paragraph', text: 'Incorrect particle usage can make a sentence confusing or change its meaning entirely.' },
            { type: 'note', text: 'Even advanced learners make small mistakes with particles; this is normal.' },
            { type: 'heading', id: '', text: 'Commonly Confusing Particles' },
            { type: 'paragraph', text: 'は and が are perhaps the most famous source of confusion, as they can both mark the subject but serve different functions.' },
            { type: 'paragraph', text: 'Other particles like に, で, を, and へ also carry specific nuances and are best learned through context.' },
            { type: 'list', items: ['は vs が: topic vs subject', 'に: direction or indirect object', 'で: location of action', 'を: direct object'] },
            { type: 'important', text: 'Focus on patterns and context rather than memorizing every particle definition at first.' },
            { type: 'heading', id: '', text: 'How Particles Work in Context' },
            { type: 'paragraph', text: 'The same particle can have slightly different nuance depending on the verb, sentence, or formality level.' },
            { type: 'paragraph', text: 'Exposure to many sentences helps learners internalize natural usage without consciously thinking about rules.' },
            { type: 'note', text: 'Patterns will become intuitive after repeated encounters in reading and listening.' },
            { type: 'heading', id: '', text: 'Practical Strategies for Mastering Particles' },
            { type: 'paragraph', text: 'Read and listen to natural Japanese as much as possible, noticing how particles are used.' },
            { type: 'paragraph', text: 'Practice producing sentences using common particles, focusing on meaning and natural flow.' },
            { type: 'list', items: ['Notice particles in context', 'Repeat sentences aloud', 'Shadow native speakers', 'Use particles actively in writing and speaking'] },            
            { type: 'heading', id: '', text: 'Common Mistakes to Avoid' },
            { type: 'paragraph', text: 'Trying to memorize rules in isolation often leads to confusion and slow progress.' },
            { type: 'paragraph', text: 'Mixing particles randomly is natural at first; accuracy improves with consistent exposure.' },
            { type: 'important', text: 'Intuitive understanding develops through meaningful input, not drills alone.' },
            { type: 'heading', id: '', text: 'Key Takeaways' },
            { type: 'list', items: ['Particles define sentence meaning', 'Learn through context, not isolated rules', 'Repeated exposure builds intuition', 'Active practice reinforces learning'] },
            {type: 'heading', id: '', text: 'Reference'},
            { type: 'reference', items: [{ name: 'Particle usage guide', url: '' }, { name: 'JLPT particle exercises', url: '' }, { name: 'Context-based particle learning', url: '' }] },
        ],
        posterUrl: `${POSTER_BASE_URL}/${articleId}.jpg`,
    }),
]};