import { useState } from 'react';

const colorMap = {
    verb: 'text-blue-500',
    noun: 'text-orange-400',
    adjective: 'text-teal-500',
    adverb: 'text-purple-400',
    pronoun: 'text-pink-400',
    preposition: 'text-yellow-600',
    conjunction: 'text-green-400',
    interjection: 'text-red-400',
    other: 'text-neutral-500',
} as const;

// MOCK DATA. IN ACTUAL IMPLEMENTATION WOULD MAKE A BACK-END REQUEST
const SENTENCE_ANALYSIS_RESULT = [
    { type: 'noun', text: 'Japan' },
    { type: 'verb', text: 'is' },
    { type: 'other', text: 'a' },
    { type: 'adjective', text: 'beautiful' },
    { type: 'noun', text: 'country' },
    { type: 'preposition', text: 'with' },
    { type: 'adjective', text: 'amazing' },
    { type: 'noun', text: 'culture' },
    { type: 'other', text: ',' },
    { type: 'adjective', text: 'delicious' },
    { type: 'noun', text: 'food' },
    { type: 'other', text: ',' },
    { type: 'adjective', text: 'historic' },
    { type: 'noun', text: 'temples' },
    { type: 'other', text: ',' },
    { type: 'conjunction', text: 'and' },
    { type: 'adjective', text: 'friendly' },
    { type: 'noun', text: 'people' },
    { type: 'pronoun', text: 'who' },
    { type: 'verb', text: 'welcome' },
    { type: 'noun', text: 'visitors' },
    { type: 'preposition', text: 'from' },
    { type: 'adjective', text: 'all' },
    { type: 'preposition', text: 'over' },
    { type: 'other', text: 'the' },
    { type: 'noun', text: 'world' },
    { type: 'other', text: '.' },
];

interface SentenceAnalysisResult {
    type: keyof typeof colorMap;
    text: string;
}

export default function SentenceAnalysis() {
    const [analysisResults, setAnalysisResults] = useState<SentenceAnalysisResult[] | null>(null);
    const [analysisInput, setAnalysisInput] = useState('');

    function handleAnalysis() {
        setAnalysisResults(SENTENCE_ANALYSIS_RESULT as SentenceAnalysisResult[]);
    }
        
    return (
        <div className="absolute z-40 left-[calc(100%+20px)] top-0 min-w-[250px] sm:min-w-[400px] max-h-[50vh] sm:max-h-[30vh] flex flex-col gap-3 px-3 py-2 text-base bg-bg-primary dark:bg-neutral-800 shadow-lg/30 dark:shadow-none dark:border-2 dark:border-neutral-600 rounded-lg">
            <div className="relative w-full bg-bg-secondary rounded-full">
                <button onClick={() => handleAnalysis()} type="button" aria-label='Analyze the sentence'>
                    <svg className='absolute z-20 top-1/2 left-2 -translate-y-1/2 fill-txt-primary size-6 cursor-pointer' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M378.087-314.5q-111.152 0-188.326-77.174Q112.587-468.848 112.587-580q0-111.152 77.174-188.326Q266.935-845.5 378.087-845.5q111.152 0 188.326 77.174Q643.587-691.152 643.587-580q0 44.478-13.522 83.12-13.521 38.641-36.565 68.163l222.087 222.326q12.674 12.913 12.674 31.945 0 19.033-12.913 31.707-12.674 12.674-31.826 12.674t-31.826-12.674L529.848-364.587q-29.761 23.044-68.642 36.565-38.88 13.522-83.119 13.522Zm0-91q72.848 0 123.674-50.826Q552.587-507.152 552.587-580q0-72.848-50.826-123.674Q450.935-754.5 378.087-754.5q-72.848 0-123.674 50.826Q203.587-652.848 203.587-580q0 72.848 50.826 123.674Q305.239-405.5 378.087-405.5Z"/></svg>
                </button>
                <input                    
                    onChange={(e) => setAnalysisInput(e.target.value)}                
                    onKeyDown={(e) => { if (e.key === 'Enter') handleAnalysis()}}
                    value={analysisInput}
                    type="search"
                    name="search"
                    id="search-input"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    className="relative z-20 w-full h-full pl-10 py-2 focus:outline-neutral-400 dark:focus:outline-neutral-600 focus:outline-2 rounded-full" 
                    placeholder='Enter a sentence'
                    aria-label="Analyze a sentence" />
                {analysisInput !== '' &&
                    <button onClick={() => setAnalysisInput('')} type="button" aria-label='Clear current query' className="absolute z-20 top-1/2 right-4 -translate-y-1/2 fill-txt-primary cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg"
                        className='size-5' height="24" viewBox="0 -960 960 960" width="24"><path d="M480-392 300-212q-18 18-44 18t-44-18q-18-18-18-44t18-44l180-180-180-180q-18-18-18-44t18-44q18-18 44-18t44 18l180 180 180-180q18-18 44-18t44 18q18 18 18 44t-18 44L568-480l180 180q18 18 18 44t-18 44q-18 18-44 18t-44-18L480-392Z"/></svg>
                    </button>
                }                
            </div>
            <div className="overflow-y-auto">
                {analysisResults 
                ? <div className='border-2 border-neutral-400 dark:border-neutral-600 p-2 rounded-xl'>
                    {analysisResults.map((partOfSpeech, i) =>
                        <span key={i} className={`${colorMap[partOfSpeech.type]}`}>
                            {partOfSpeech.text}{' '}
                        </span>)
                    }
                </div>
                : <h2 className='text-lg p-2 text-center text-neutral-400 dark:text-neutral-700'>
                    Enter a sentence for analysis.
                </h2>        
                }
            </div>
        </div>
    )
}