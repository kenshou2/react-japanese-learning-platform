import { useMediaQuery } from "../../../hooks/useMediaQuery";

interface Progression {
    heading: string,
    text: string,
}

export default function Benefits() {
    const isLargeScreen = useMediaQuery('(min-width: 640px)');
    
    const progressions: Progression[] = [
        {
            heading: 'Build a Strong Foundation',
            text: "Start your Japanese journey by enrolling in structured courses designed to develop your core skills. From beginner grammar and essential vocabulary to pronunciation exercises, each lesson is carefully sequenced to ensure you master the fundamentals. With interactive exercises, quizzes, and progress tracking, you'll gain confidence as you build a solid understanding of the language's building blocks.",
        },
        {
            heading: 'Expand Your Vocabulary and Practice',
            text: "Once the basics are secure, dive into targeted vocabulary decks and practice exercises to strengthen your reading, listening, and writing skills. Our platform's dictionary tool lets you quickly explore new words and see them in context, making it easy to retain knowledge. Regular practice with these tools gradually increases your fluency, preparing you for more advanced topics and real-world application.",
        },
        {
            heading: 'Apply and Reinforce Your Skills',
            text: "The final step focuses on consolidating what you’ve learned. Take advanced courses, complete challenging exercises, and test your abilities through regular assessments. By actively applying your knowledge, tracking progress, and revisiting weak areas, you solidify your understanding and steadily move toward fluency. Each step builds on the last, giving you a clear, structured path from beginner to confident Japanese speaker.",
        },
    ];

    return (
        <section className="relative w-full min-h-[100vh] flex justify-center bg-bg-primary py-25 px-10 bg-radial from-bg-primary from-70% to-neutral-300/80 dark:to-neutral-700/30">
            <div className={`absolute ${isLargeScreen ? "left-1/2 top-0 -translate-x-1/2" : "top-0 right-[35px]"} w-[10px] h-full bg-neutral-300 dark:bg-neutral-600`}></div>
            <div className={`grid ${isLargeScreen ? "grid-cols-[1fr_auto_1fr]" : "grid-cols-[1fr_auto]"} gap-y-25 max-w-[1000px]`}>
                {progressions.map(({ heading, text }, i) => {
                    const paragraph = (
                        <div className={`${!isLargeScreen ? "pr-17 text-right" : i % 2 === 0 ? "text-right pr-[calc(10%+32px)]" : "pl-[calc(10%+32px)]"}`}>                                                        
                            <p className={`${!isLargeScreen || i % 2 === 0 ? "emergeLeft" : "emergeRight"} flex flex-col`}>
                                <h2 className="text-2xl font-bold mb-3">{heading}</h2>
                                <span className="max-h-[150px] overflow-y-auto dark:text-neutral-400">{text}</span>
                            </p>                            
                        </div>)
                    const timeline = (
                        <div className="relative flex justify-center">
                            <div className={`highlight-step-light dark:highlight-step-dark absolute top-1/2 -translate-y-1/2 bg-bg-primary size-14 flex items-center justify-center font-bold text-3xl border-6 rounded-[50%]`}>
                                {i + 1}
                            </div>
                        </div>
                    )
                    if (isLargeScreen)
                        return (
                            <>
                                {i % 2 === 0 ? paragraph : <div></div>}
                                {timeline}
                                {i % 2 !== 0 ? paragraph : <div></div>}
                            </>
                    )
                    else return (
                        <>
                            {paragraph}
                            {timeline}
                        </>
                    )
                }
                )}
            </div>
        </section>
    )
}