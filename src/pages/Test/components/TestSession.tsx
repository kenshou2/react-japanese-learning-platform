import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import CtaButton from "../../../shared/CtaButton";
import type { Question, Test } from "../../../types/Test";
import { Link } from "react-router";

import type { TestResults, TestSuggestion, Time } from "../Test";

interface UserAnswer {
    selectedOptionIds: number[];
    isCorrect: boolean;
    confirmed: boolean;
}

interface TestSessionProps {
    test: Test;
    timeLimit: boolean;
    hardMode: boolean;
    setTestStatus: Dispatch<SetStateAction<"over" | "started" | "not-started">>;
    onFinish: (results: TestResults) => void;
    setTestSuggestions: React.Dispatch<React.SetStateAction<TestSuggestion[]>>
}
export default function TestSession({
        test, 
        timeLimit, 
        hardMode, 
        setTestStatus, 
        onFinish,
        setTestSuggestions,
    }: TestSessionProps) {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, UserAnswer>>({});
    const [timer, setTimer] = useState<Time | null>(timeLimit ? {mm: 30, ss: 0} : null);
    const currentQuestion = test.questions[questionIndex];
    const currentAnswer = answers[currentQuestion.id];
    const isAnswered = !!currentAnswer?.confirmed;
    const answer = answers[currentQuestion.id];
    const lastQuestionAnswered = questionIndex === test.questions.length - 1;

    useEffect(() => {
        if (!timer) return;

        const interval = setInterval(() => {
            setTimer(prev => {
                if (!prev) return null;

                const { mm, ss } = prev;

                if (mm === 0 && ss === 0) {                    
                    return prev;
                }

                if (ss === 0) {
                    return { mm: mm - 1, ss: 59 };
                }

                return { mm, ss: ss - 1 };
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timer !== null]);

    useEffect(() => {
        if (!timer) return;

        if (timer.mm === 0 && timer.ss === 0) {
            setTestStatus('over');
        }
    }, [timer, setTestStatus]);


    const handleSelect = (optionId: number) => {
        setAnswers(prev => {
            const existing = prev[currentQuestion.id];

            const selectedOptionIds =
            currentQuestion.type === 'single-choice'
                ? [optionId]
                : existing?.selectedOptionIds.includes(optionId)
                ? existing.selectedOptionIds.filter(id => id !== optionId)
                : [...(existing?.selectedOptionIds ?? []), optionId];

            return {
                ...prev,
                [currentQuestion.id]: {
                    selectedOptionIds,
                    isCorrect: false,
                    confirmed: false
                }
            };
        });
    };

    const handleConfirm = () => {
        const selected = answers[currentQuestion.id]?.selectedOptionIds ?? [];
        const isCorrect = isAnswerCorrect(currentQuestion, selected);

        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: {
                selectedOptionIds: selected,
                isCorrect,
                confirmed: true
            }
        }));

        if (!isCorrect) {
            const selectedWrongOptions = currentQuestion.options.filter(
                option =>
                    selected.includes(option.id) &&
                    !option.isCorrect &&
                    option.explanation
            );

            if (selectedWrongOptions.length) {
                setTestSuggestions(prev => {                    

                    const newSuggestions: TestSuggestion[] =
                        selectedWrongOptions                            
                            .map(opt => ({
                                text: opt.explanation!,
                                links: opt.supportingLinks?.map(link => ({
                                    description: link.description,
                                    url: link.url,
                                })),
                            }));

                    return [...prev, ...newSuggestions];
                });
            }
        }
    };

    const handleFinish = () => {
        const results = buildTestResults(answers);
        onFinish(results);
        setTestStatus('over');
    };

    const handleNext = () => {
        setQuestionIndex(i => Math.min(i + 1, test.questions.length - 1));
    };

    const buildTestResults = (
        answers: Record<number, UserAnswer>
    ): TestResults => {
        const answersArr = Object.values(answers);

        const correctCount = answersArr.filter(a => a.isCorrect).length;

        return {
            accuracyPercentage:
                answersArr.length === 0
                    ? 0
                    : Math.round((correctCount / answersArr.length) * 100),
            timeLimit,
            remainingTime: timer,
            hardMode,
        };
    };

    function isAnswerCorrect(
        question: Question,
        selectedOptionIds: number[],
    ): boolean {
        if (question.type === 'single-choice') {
            const correctIds = question.options
                .filter(o => o.isCorrect)
                .map(o => o.id);

            return (
                selectedOptionIds.length === correctIds.length &&
                selectedOptionIds.every(id => correctIds.includes(id))
            );
        }

        // multiple-choice logic
        let correctSelected = 0;
        let incorrectSelected = 0;

        for (const option of question.options) {
            if (!selectedOptionIds.includes(option.id)) continue;

            if (option.isCorrect) {
                correctSelected++;
            } else {
                incorrectSelected++;
            }
        }

        return correctSelected >= incorrectSelected;
    }

    const progress = Object.values(answers).filter(a => a.confirmed).length / test.questions.length;
    
    return (
        <div className="p-[5%] min-h-[calc(100vh-80px)] w-full flex justify-center items-center">
            <div className="flex flex-col gap-4 w-full h-[70vh] sm:h-[50vh] max-w-[700px]">
                {timer && <span className="self-end font-semibold mr-3 text-xl text-neutral-500 dark:text-neutral-400">{timer.mm < 10 ? `0${timer.mm}` : timer.mm}:{timer.ss < 10 ? `0${timer.ss}` : timer.ss}</span>}
                <div className="flex-1 flex flex-col gap-3 overflow-y-scroll p-5 border-2 border-neutral-500 rounded-xl">
                    <h2 className="text-2xl font-semibold pb-2 border-b-2 border-b-neutral-500">{currentQuestion.text}</h2>
                    {currentQuestion.paragraph && <p className="max-h-[100px] shrink-0 overflow-y-scroll p-2 rounded-md bg-neutral-200 dark:bg-neutral-700">{currentQuestion.paragraph}</p>}
                    {currentQuestion.imgUrl && <img src={currentQuestion.imgUrl} className="self-center object-cover size-1/2 rounded-lg" />}
                    <ul className="flex flex-col gap-2">
                        {currentQuestion.options.map(({id, text, isCorrect, explanation, supportingLinks}) =>
                            <li key={id}>
                                <div 
                                    className={`flex flex-col p-2 
                                    ${answers[currentQuestion.id]?.selectedOptionIds.includes(id) ? 'outline-2' : ''} 
                                    ${answer?.confirmed && answer.selectedOptionIds.includes(id) && isCorrect ? 'outline-green-500' : 'outline-neutral-400 dark:outline-neutral-600'}
                                    rounded-md text-lg`}>                                    
                                    <label className="flex gap-3 items-center cursor-pointer">
                                        <input
                                            type={currentQuestion.type === 'single-choice' ? 'radio' : 'checkbox'}
                                            checked={answers[currentQuestion.id]?.selectedOptionIds.includes(id) ?? false}
                                            disabled={isAnswered}
                                            onChange={() => handleSelect(id)}
                                            name={`question-${currentQuestion.id}`}
                                            value={id}
                                        />
                                        <span>{text}</span>
                                    </label>                                                                            
                                    <div
                                        className={`grid ${answer?.confirmed && answer.selectedOptionIds.includes(id) && !isCorrect ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} transition-[grid-template-rows] duration-300 ease-out`}>
                                        <div className="overflow-hidden text-sm text-neutral-800 font-semibold">
                                            <div className="mt-3 p-3 bg-red-300 rounded-md">
                                                <span>{explanation}</span>
                                                <ul className="flex flex-col gap-1 ml-5 mt-1 list-disc">
                                                    {supportingLinks?.map(({description, url}, i) =>
                                                        <li key={i}><Link to={url} className="underline decoration-2 underline-offset-3">{description}</Link></li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>                                
                            </li>
                        )}
                    </ul>
                </div>
                <div className="flex justify-between gap-5 sm:gap-10 items-center">                    
                    <CtaButton
                        onClick={() => setQuestionIndex(i => Math.max(i - 1, 0))}
                        disabled={questionIndex === 0}
                        padX='6' padY='6' customStyle={"min-w-[100px] font-normal"}
                        >
                        Previous
                    </CtaButton>
                    <div className="relative flex-1 h-2 rounded-xl bg-neutral-300 dark:bg-neutral-700">
                        <div 
                            style={{
                                width: `${progress * 100}%`,
                            }}
                            className={`absolute h-2 rounded-xl bg-btn-primary dark:bg-sakura transition-[width] duration-500 ease-out`}></div>
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 text-neutral-500 dark:text-neutral-400 text-xl font-semibold">{`${Math.round(progress * 100)}%`}</div>
                    </div>                    
                    <CtaButton
                        onClick={() => {
                            if (!isAnswered) {
                                handleConfirm();
                            } else if (lastQuestionAnswered) {
                                handleFinish();
                            } else {
                                handleNext();
                            }
                        }}
                        disabled={!answers[currentQuestion.id]?.selectedOptionIds.length}
                        padX='6' padY='6' customStyle={"min-w-[100px] font-normal"}
                        >
                        {
                        !isAnswered
                            ? 'Confirm'
                            : lastQuestionAnswered
                            ? 'Finish'
                            : 'Next'
                        }
                    </CtaButton>
                </div>
            </div>
        </div>
    )
}