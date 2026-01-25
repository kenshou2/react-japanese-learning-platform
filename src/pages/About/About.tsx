interface ParagraphBlock {
    type: 'paragraph',
    heading?: string,
    text: string,
}
interface ListBlock {
    type: 'list',
    heading?: string,
    blocks: string[],
}

const aboutContent: (ParagraphBlock | ListBlock)[] = [
    {
        type: 'paragraph',
        heading: 'Learn Japanese Naturally',
        text: 'Our platform is designed to help you learn Japanese in a natural and engaging way. Instead of memorizing isolated grammar rules, you experience the language as it is actually used through conversations, real-life situations, and meaningful content.'
    },
    {
        type: 'paragraph',
        heading: 'All-in-One Learning Experience',
        text: 'With a variety of tools at your fingertips, you can focus on listening, speaking, reading, and writing all in one place. Access structured courses, interactive SRS decks, tests, a comprehensive dictionary, and even a chatbot assistant to practice anytime.'
    },
    {
        type: 'list',
        heading: 'Key Features of the Platform',
        blocks: [
            'Structured Japanese courses from beginner to advanced (JLPT N5–N1)',
            'Spaced repetition (SRS) decks for vocabulary and kanji retention',
            'Interactive tests to track your progress and reinforce learning',
            'Articles on Japanese culture, language tips, and practical topics',
            'AI-powered chatbot for conversation practice and instant feedback',
            'Gamified elements: earn XP, maintain streaks, and level up your Japanese skills'
        ]
    },
    {
        type: 'paragraph',
        heading: 'Learn at Your Own Pace',
        text: 'Whether you are studying for the JLPT, preparing for travel, or just exploring Japanese for fun, our platform adapts to your pace and interests. You decide how much time to spend, what topics to focus on, and which tools help you the most.'
    },
    {
        type: 'paragraph',
        heading: 'Why It Works',
        text: 'By combining real-life content, gamification, and spaced repetition, we help you acquire Japanese naturally and retain it long-term. You are not just learning words or grammar—you are building the ability to understand and communicate effectively in everyday situations.'
    }
];

export default function About() {

    return (
        <div className="p-[10%] sm:p-[5%] flex items-center justify-center">
            <div className="flex flex-col gap-10 max-w-[800px]">
                <h1 className="text-5xl text-sakura text-center font-bold">What is JP-Input?</h1>
                <div className="flex flex-col gap-6">
                    {
                        aboutContent.map(block => {
                            let content = null;
                            if (block.type === 'paragraph')
                                content = 
                                <p>{block.text}</p>
                            else
                                content = 
                                <ul className="my-2 ml-8 list-disc">
                                    {block.blocks.map((text) => <li>{text}</li> )}
                                </ul>
                            return (
                                <div className="text-lg">
                                    {block.heading &&
                                        <h2 className="my-1 font-semibold text-2xl text-neutral-500 dark:text-neutral-400">{block.heading}</h2>
                                    }
                                    {content}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}