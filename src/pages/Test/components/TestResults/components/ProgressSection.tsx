import { useEffect, useRef, useState } from "react";
import type { ResultSection } from "../TestResults";
import type { User } from "../../../../../types/User";
import Section from "./Section";

interface ScoreSectionProps {
    section: ResultSection;        
    openSections: ResultSection[];    
    user: User;
    sectionAnimationStage: ResultSection;
    setSectionAnimationStage: React.Dispatch<React.SetStateAction<ResultSection>>
    gainedXpSum: number;
}
export default function ProgressSection({
        section,
        openSections,
        user,
        sectionAnimationStage,
        setSectionAnimationStage,
        gainedXpSum,
    }: ScoreSectionProps) {
    const xpSnapshotRef = useRef<number | null>(null);

    useEffect(() => {
        if (!user) return;
        if (xpSnapshotRef.current === null) {
            xpSnapshotRef.current = user.progress.currentXp;
        }
    }, [user]);

    return (
        <Section section={section} isOpen={openSections.includes(section)}>
            <div className="my-5 flex items-center gap-3 ">
                <span className="text-xl font-bold">B1</span>
                <div className="relative flex-1 h-2 rounded-xl bg-neutral-300 dark:bg-neutral-700">
                    <div
                        style={{
                            width: `${(user.progress.currentXp / user.progress.nextLanguageLevelXp) * 100}%`,
                        }}
                        onTransitionEnd={() => setSectionAnimationStage('Achievements')}
                        className={`absolute h-2 rounded-xl bg-btn-primary dark:bg-sakura transition-[width] duration-500 ease-out`}></div>
                    <div
                        className="absolute left-1/2 -translate-x-1/2 top-full w-full text-center mt-2 text-neutral-500 dark:text-neutral-400 text-xl font-semibold">
                        {sectionAnimationStage === 'Progress'
                            ? <AnimatedNumber from={xpSnapshotRef.current!} to={xpSnapshotRef.current! + gainedXpSum!} duration={500} />
                            : user.progress.currentXp
                        }
                        XP / {user.progress.nextLanguageLevelXp} XP
                    </div>
                </div>
                <span className="text-xl font-bold">B2</span>
            </div>
        </Section>
    )
}

function AnimatedNumber({from, to, duration}: {from: number, to: number, duration: number}) {
  const [value, setValue] = useState(from)
  const startTimeRef = useRef<number | null>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (from === to) return

    const animate = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time

      const elapsed = time - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutCubic(progress)

      const current = Math.round(from + (to - from) * eased)
      setValue(current)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    function easeOutCubic(t: number) {
        return 1 - Math.pow(1 - t, 3)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      startTimeRef.current = null
    }
  }, [from, to, duration])

  return <span>{value}</span>
}