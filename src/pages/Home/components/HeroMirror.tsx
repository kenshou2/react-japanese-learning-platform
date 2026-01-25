import CtaButton from "../../../shared/CtaButton";

export default function HeroMirror() {
    return (
        <section className="min-h-[400px] px-[5%]">
            <div className="px-[20%] py-[10%] flex justify-center items-center border-t-2 border-t-bg-secondary">
                <div className="flex flex-col gap-7 items-center">
                    <h2 className="text-4xl font-bold text-center">Ready to Begin Your Japanese Language Adventure?</h2>
                    <p className="text-neutral-500 dark:text-neutral-400">Every journey starts with a single step—and your path to Japanese fluency is just one click away. Join the thousands of learners who have opened new doors of opportunity and embraced the beauty of Japanese culture through our platform. It’s your turn now. </p>
                    <CtaButton url="/library" padX='28' padY='8' fontSize='18' borderRadius='7'>Get started</CtaButton>
                </div>
            </div>
        </section>
    )
}