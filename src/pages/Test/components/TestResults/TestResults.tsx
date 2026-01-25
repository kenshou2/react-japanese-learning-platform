import { useState } from "react";
import type { TestResults, TestSuggestion } from "../../Test";
import { useActiveUser } from "../../../../context/ActiveUserContext";
import { useUser } from "../../../../features/users/hooks/useUser";
import ScoreSection from "./components/ScoreSection";
import ProgressSection from "./components/ProgressSection";
import AchievementsSection from "./components/AchievementsSection";
import SuggestionsSection from "./components/SuggestionsSection";

const resultSections = ['Score evaluation', 'Progress', 'Achievements', 'Suggestions'] as const;
export type ResultSection = typeof resultSections[number];
const openSections: ResultSection[] = ['Score evaluation', 'Achievements', 'Progress'];

export default function TestResults({results, suggestions}: {results: TestResults, suggestions: TestSuggestion[]}) {    
    const {activeUserId: uid} = useActiveUser();
    const {data: user, isLoading, isError} = useUser(uid);
    
    const [sectionAnimationStage, setSectionAnimationStage] = useState<ResultSection>('Score evaluation');
    const [gainedXpSum, setGainedXpSum] = useState<number>();

    if (isError)
        return (
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="font-semibold text-2xl text-center">
                    <h1>Couldn't load the results, please try again later.</h1>                    
                </div>
            </div>
        )
    
    if (isLoading)
        return (
            <div className="p-[5%] min-h-[calc(100vh-80px)] w-full flex justify-center items-center">
                <div className="flex flex-col items-center gap-10 px-5 w-full min-h-[70vh] sm:min-h-[50vh] max-w-[500px]">
                    <h1 className="text-2xl sm:text-6xl font-bold">Test results</h1>
                    <div className="flex w-full flex-col gap-4">
                        {[...Array(5)].map((_, i) =>
                            <div key={i} className="loading w-full h-8 rounded-md"></div>
                        )}
                    </div>
                </div>
            </div>
        )

    return (
        <div className="p-[10%] sm:p-[5%] min-h-[calc(100vh-80px)] w-full flex justify-center items-center">
            <div className="flex flex-col items-center gap-10 px-5 w-full min-h-[70vh] sm:min-h-[50vh] max-w-[500px]">
                <h1 className="text-2xl sm:text-6xl font-bold">Test results</h1>                
                <ul className="flex-1 w-full flex flex-col gap-10">
                    {resultSections.map((section, i) => {
                        let sectionRender = null;
                        if (section === 'Score evaluation')
                            sectionRender = 
                            <ScoreSection 
                                key={i} 
                                section={section} 
                                openSections={openSections} 
                                results={results}
                                uid={uid}
                                user={user}
                                setSectionAnimationStage={setSectionAnimationStage}
                                setGainedXpSum={setGainedXpSum}
                            />
                        else if (section === 'Progress')
                            sectionRender = 
                            <ProgressSection 
                                key={i}
                                section={section} 
                                openSections={openSections}
                                user={user}
                                sectionAnimationStage={sectionAnimationStage}
                                setSectionAnimationStage={setSectionAnimationStage}
                                gainedXpSum={gainedXpSum!}
                            />
                        else if (section === 'Achievements')
                            sectionRender =
                            <AchievementsSection 
                                section={section}
                                openSections={openSections}
                                user={user}
                                sectionAnimationStage={sectionAnimationStage}
                            />
                        else if (section === 'Suggestions')
                            sectionRender =
                            <SuggestionsSection 
                                key={i}
                                section={section} 
                                openSections={openSections}
                                suggestions={suggestions}
                            />
                        return sectionRender;
                    })}                    
                </ul>
            </div>
        </div>
    )
}
