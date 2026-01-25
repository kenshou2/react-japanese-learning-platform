import { Link } from "react-router";
import type { TestSuggestion } from "../../../Test";
import type { ResultSection } from "../TestResults";
import Section from "./Section";

interface SuggestionsSectionProps {
    section: ResultSection;        
    openSections: ResultSection[];
    suggestions: TestSuggestion[];
}
export default function SuggestionsSection({
        section, 
        openSections, 
        suggestions
    }: SuggestionsSectionProps) {

    return (
        <Section section={section} isOpen={openSections.includes(section)}>
            <div className="flex flex-col gap-3">
                {suggestions.length === 0
                 ? <span className="m-2 font-semibold">Great job! You don't need any suggestions.</span>
                 : suggestions.map(({text, links}, i) =>
                    <div key={i} className="p-3 bg-blue-200 dark:bg-blue-300 text-neutral-800 h-[150px] overflow-y-scroll rounded-md">
                        {text}
                        {links && 
                            <ul className="flex flex-col gap-1 ml-5 mt-1 list-disc">
                                {links.map(({description, url}, i) =>
                                    <li key={i}><Link to={url} className="underline decoration-2 underline-offset-3">{description}</Link></li>
                                )}
                            </ul>
                        }
                    </div>
                )}
            </div>
        </Section>
    )
}