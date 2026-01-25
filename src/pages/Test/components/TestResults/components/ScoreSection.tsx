import { useState } from "react";
import type { ResultSection } from "../TestResults";
import Section from "./Section";
import { useUpdateUserProgress } from "../../../../../features/users/hooks/useUser";
import type { User } from "../../../../../types/User";
import type { TestResults, Time } from "../../../Test";

export interface ResultEntry {label: string, value: string, xp: number};

interface ScoreSectionProps {
    section: ResultSection;        
    openSections: ResultSection[];
    uid: number;
    user: User;
    results: TestResults;
    setSectionAnimationStage: React.Dispatch<React.SetStateAction<ResultSection>>;
    setGainedXpSum: React.Dispatch<React.SetStateAction<number | undefined>>;
}
export default function ScoreSection({
        section,                  
        openSections,  
        uid,
        user,
        results,
        setSectionAnimationStage,
        setGainedXpSum,
    }: ScoreSectionProps) {
    const [resultAnimationStage, setResultAnimationStage] = useState(0);    
    const updateProgress = useUpdateUserProgress();

    const [gainedXp, gainedXpSum] = calcXp(results);
    const resultEntries: ResultEntry[] = [
        { label: "Accuracy", value: `${results?.accuracyPercentage}%`, xp: gainedXp.accuracyPercentage},
        { label: "Time limit", value: results?.timeLimit ? "On" : "Off", xp: gainedXp.timeLimit},
        { label: "Remaining time", value: formatTime(results?.remainingTime), xp: gainedXp.remainingTime},
        { label: "Hard mode", value: results?.hardMode ? "On" : "Off", xp: gainedXp.hardMode},
    ];

    function calcXp(results: TestResults): [Record<keyof TestResults, number>, number] {
        const accuracyXp = Math.ceil(results.accuracyPercentage / 2);
        const timeLimitXp = results.timeLimit ? 20 : 0;
        let remainingTimeXp = 0;
        if (results.remainingTime)
            remainingTimeXp = Math.ceil(((results.remainingTime.mm * 60 + results.remainingTime.ss) / 1800) * 100 / 1.5);
            // total remaining time(sec) / max time(sec) in % divided by 1.5 (the scaler)
        const hardModeXp = results.hardMode ? 30 : 0;
        
        const xpSum = accuracyXp + timeLimitXp + remainingTimeXp + hardModeXp;
        setGainedXpSum(xpSum);
        return [
            {
                accuracyPercentage: accuracyXp,
                timeLimit: timeLimitXp,
                remainingTime: remainingTimeXp,
                hardMode: hardModeXp,
            },
            xpSum,
        ]
    }

    function formatTime(time: Time | null | undefined) {
        if (!time)
            return '';
        const {mm, ss} = time;
        const mmStr = mm < 10 ? `0${mm}` : String(mm);
        const ssStr = ss < 10 ? `0${ss}` : String(ss);
        return `${mmStr}:${ssStr}`;
    }

    return (
        <Section section={section} isOpen={openSections.includes(section)}>
            <ul className="flex flex-col gap-2 text-xl">
                {resultEntries.map(({label, value, xp}, i) => {
                    const isActive = i === resultAnimationStage
                    const isDone = i < resultAnimationStage
                    
                    return (
                    <div 
                        key={i}
                        style={{
                            gridTemplateRows: isDone ? '1fr' : '0fr',
                            animation: isActive
                            ? 'openSection .5s ease-out forwards'
                            : 'none',                                                
                        }}                        
                        className="grid">
                        <div className="overflow-hidden">
                            <li className="flex justify-between p-3 border-b-2 border-neutral-500">
                                <span>{label}</span>
                                <div className="flex gap-3">
                                    <span>{value}</span>
                                    <span
                                        onAnimationEnd={() => {
                                            if (isActive && i < resultEntries.length - 1) {
                                                setResultAnimationStage(i + 1);
                                            }
                                        }} 
                                        key={isActive ? `xp-${i}` : `xp-idle-${i}`}
                                        style={{
                                            opacity: isDone ? '1' : '0',                                                                
                                            animation: isActive
                                            ? 'xpFadeIn 0.4s ease-out forwards'
                                            : 'none',
                                            animationDelay: '1000ms',
                                        }}
                                        className="text-yellow-500 font-bold"
                                        >
                                        +{xp} XP
                                    </span>
                                </div>
                            </li>
                        </div>
                    </div>
                    )
                })}                                
                <div
                    style={{gridTemplateRows: resultAnimationStage === resultEntries.length - 1? '1fr' : '0fr'}}
                    onTransitionEnd={() => {
                        updateProgress.mutate({
                            id: uid, 
                            updates: {
                                ...user?.progress,
                                currentXp: user.progress.currentXp + gainedXpSum,
                            },
                        });
                        setTimeout(() => setSectionAnimationStage('Progress'), 1000);
                    }}
                    className="self-end my-2 grid transition-[grid-template-rows] delay-1800 duration-500 ease-out">
                        <div className="overflow-hidden">
                            <span className="my-2 self-end text-3xl font-bold">
                                Total XP points:
                                <span className="text-yellow-500"> +{gainedXpSum} XP</span>
                            </span>
                        </div>
                </div>
            </ul>                                   
        </Section>
    )
}