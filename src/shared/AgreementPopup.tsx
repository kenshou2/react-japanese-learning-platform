import CtaButton from "./CtaButton";

interface AgreementPopup {
    query: string;
    description?: string;
    setAgreed: React.Dispatch<React.SetStateAction<boolean | null>>
}
export default function AgreementPopup({query, description, setAgreed}: AgreementPopup) {
    return (
        <div className="fixed flex flex-col gap-8 p-5 z-20 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[clamp(300px,40vw,500px)] bg-[#f0f0f0] dark:bg-neutral-800 border border-neutral-500 rounded-lg">
            <div>
                <h2 className="text-xl font-semibold">{query}</h2>
                {description &&
                    <p className="dark:text-neutral-400 mt-3">{description}</p>
                }
            </div>
            <div className="flex gap-3">
                <CtaButton onClick={() => setAgreed(true)} customStyle={"flex-1"} outlined>Yes</CtaButton>
                <CtaButton onClick={() => setAgreed(false)} customStyle={"flex-1"}>No</CtaButton>
            </div>
        </div>
    )
}