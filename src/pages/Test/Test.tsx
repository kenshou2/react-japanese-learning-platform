import { useState } from "react";
import { useCourseTest } from "../../features/tests/hooks/useTests"
import CtaButton from "../../shared/CtaButton";
import TestSession from "./components/TestSession";
import TestResults from "./components/TestResults/TestResults";
import type { SupportingLink } from "../../types/Test";
import { useLoaderData } from "react-router";

interface TestSettings {
    timeLimit: boolean;
    hardMode: boolean;
}
const defaultDifficultySettings = {
    timeLimit: false, 
    hardMode: false,
}

export interface TestSuggestion {
    text: string;
    links?: SupportingLink[];
}

export interface Time {
    mm: number;
    ss: number;
}
export interface TestResults {
    accuracyPercentage: number;
    timeLimit: boolean;
    remainingTime: Time | null;
    hardMode: boolean;
}

const settingsLabelMap: Record<keyof TestSettings, string> = {
    timeLimit: 'Time limit on',
    hardMode: 'Hard mode on',
}
export default function Test() {
    const { courseId: courseIdStr } = useLoaderData() as { 
        courseId: string;        
    };
    
    const courseId = Number(courseIdStr);
    if (isNaN(courseId)) {
        return <div>Invalid test path</div>;
    }
    const {data: test, isLoading, isError} = useCourseTest(courseId);
    const [testStatus, setTestStatus] = useState<'over' | 'started' | 'not-started'>('not-started');
    const [difficultySettings, setDifficultySettings] = useState<TestSettings>(defaultDifficultySettings);
    const [testResults, setTestResults] = useState<TestResults>();    
    const [testSuggestions, setTestSuggestions] = useState<TestSuggestion[]>([]);

    if (isError)
        return (
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="font-semibold text-2xl text-center">
                    <h1>Couldn't load the test, please try again later.</h1>                    
                </div>
            </div>
        )

    if (isLoading)
        return (
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="font-semibold text-2xl text-center">
                    <h1>Loading the test...</h1>                    
                </div>
            </div>
        )
    
    if (testStatus === 'started' && test) return (
        <TestSession 
            test={test} 
            timeLimit={difficultySettings.timeLimit} 
            hardMode={difficultySettings.hardMode}
            setTestStatus={setTestStatus} 
            onFinish={setTestResults}
            setTestSuggestions={setTestSuggestions}
        />
    );
    else if (testResults && testStatus === 'over') return (
        <TestResults results={testResults} suggestions={testSuggestions}/>
    );
    else return (
        <div className="py-[5%] px-[10%] sm:px-[5%] flex justify-center">
            <div className="flex flex-col gap-7 w-full max-w-[400px]">
                <h1 className="text-4xl text-center text-neutral-600 dark:text-neutral-300 font-semibold px-4">Test information</h1>                
                <div className="flex flex-col gap-2">
                    <span className="font-semibold">General</span>
                    {test && [
                        {field: 'Number of questions', value: test.questions.length },
                    ].map(({field, value}, i) =>                                                
                        <div key={i} className="flex w-full justify-between text-xl text-neutral-500 dark:text-neutral-400 px-2 pb-2 border-b-2">
                            <span>{field}</span>
                            <span>{value}</span>
                        </div>                       
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <span className="font-semibold">Difficulty settings</span>
                    {test && (Object.entries(difficultySettings) as [keyof TestSettings, boolean][]).map(([field, value], i) =>
                        <div >
                            <label 
                                key={i} 
                                className="flex w-full justify-between items-center text-xl text-neutral-500 dark:text-neutral-400 px-2 pb-2 border-b-2 cursor-pointer">
                                {settingsLabelMap[field]}                                
                                <input 
                                    type="checkbox"                                     
                                    name={`${field}`} 
                                    checked={value} 
                                    onClick={() => setDifficultySettings(prev => ({...prev, [field]: !prev[field]}))} 
                                    className="scale-120"
                                />
                            </label>
                        </div>
                    )}
                </div>
                <CtaButton onClick={() => setTestStatus('started')}>Start the test</CtaButton>                
            </div>
        </div>
    )
}