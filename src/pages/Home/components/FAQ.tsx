import Accordion from "../../../shared/Accordion";

const faqs = [
    {
        id: 0,
        heading: 'How is this platform different from traditional Japanese courses?',
        text: 'Instead of isolated grammar drills, the platform focuses on understanding real Japanese through meaningful content like conversations, everyday situations, and topics you actually care about. You learn naturally by listening and reading first, building intuition before worrying about perfection.',
        expanded: false,
    },
    {
        id: 1,
        heading: 'Do I need to study grammar and memorize vocabulary separately?',
        text: 'No. Grammar and vocabulary are introduced naturally through context. You will see and hear them repeatedly in realistic situations, which helps you remember and understand how they are used without heavy memorization.',
        expanded: false,
    },
    {
        id: 2,
        heading: 'Is this platform suitable if I feel my listening is weak?',
        text: 'Yes. The courses are designed specifically to improve listening comprehension step by step. You are guided to focus on meaning, context, and key information rather than trying to catch every word, which reduces frustration and builds confidence.',
        expanded: false,
    },
    {
        id: 3,
        heading: 'How will this help me use Japanese in real life?',
        text: [
            'You practice understanding Japanese as it is actually spoken.',
            'Lessons reflect real situations like travel, work, health, and daily life.',
            'You build the ability to follow conversations, announcements, and explanations naturally.',
        ],
        expanded: false,
    },
];

export default function FAQ() {
    return (
        <div className="bg-bg-primary flex justify-center px-[10%] py-[7%]">
            <div className="flex flex-col gap-8 max-w-[800px]">
                <h1 className="font-bold text-4xl text-center">FAQ</h1>
                <Accordion items={faqs} fontScale="large" />
            </div>
        </div>
    )
}