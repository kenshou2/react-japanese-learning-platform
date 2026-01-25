import type {JSX} from 'react';
import type { User } from "../../../../../types/User";
import type { ResultSection } from "../TestResults";
import Section from "./Section";

const achievementsMap: Record<string, JSX.Element> = {
    1: <svg className="fill-neutral-600 dark:fill-neutral-300 size-full" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M660-400h40v-60h60v-40h-60v-60h-40v60h-60v40h60v60Zm-240 40h60v-90l70 90h73l-93-120 93-120h-73l-70 90v-90h-60v240Zm-120 0h60v-240H240v60h60v180ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>,
    2: <svg className="fill-neutral-600 dark:fill-neutral-300 size-full" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-200h160v-320H160v320Zm240 0h160v-560H400v560Zm240 0h160v-240H640v240ZM80-120v-480h240v-240h320v320h240v400H80Z"/></svg>,
    3: <svg className="fill-neutral-600 dark:fill-neutral-300 size-full" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120v-80h160v-124q-49-11-87.5-41.5T296-442q-75-9-125.5-65.5T120-640v-40q0-33 23.5-56.5T200-760h80v-80h400v80h80q33 0 56.5 23.5T840-680v40q0 76-50.5 132.5T664-442q-18 46-56.5 76.5T520-324v124h160v80H280Zm0-408v-152h-80v40q0 38 22 68.5t58 43.5Zm200 128q50 0 85-35t35-85v-240H360v240q0 50 35 85t85 35Zm200-128q36-13 58-43.5t22-68.5v-40h-80v152Zm-200-52Z"/></svg>,
    4: <svg className="fill-neutral-600 dark:fill-neutral-300 size-full" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-160v-80h560v80H200Zm0-140-51-321q-2 0-4.5.5t-4.5.5q-25 0-42.5-17.5T80-680q0-25 17.5-42.5T140-740q25 0 42.5 17.5T200-680q0 7-1.5 13t-3.5 11l125 56 125-171q-11-8-18-21t-7-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820q0 15-7 28t-18 21l125 171 125-56q-2-5-3.5-11t-1.5-13q0-25 17.5-42.5T820-740q25 0 42.5 17.5T880-680q0 25-17.5 42.5T820-620q-2 0-4.5-.5t-4.5-.5l-51 321H200Zm68-80h424l26-167-105 46-133-183-133 183-105-46 26 167Zm212 0Z"/></svg>,
    5: <svg className="fill-neutral-600 dark:fill-neutral-300 size-full" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m223-120-89-481q-37 7-65.5-17T40-680q0-33 23.5-56.5T120-760q33 0 56.5 23.5T200-680q0 14-4 26t-12 22q22 13 44.5 21.5T276-602q44 0 81.5-22t58.5-60l25-46q-19-11-30-29t-11-41q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800q0 23-11 41t-30 29l25 46q21 38 58.5 60t81.5 22q25 0 47.5-8t44.5-21q-8-10-12-22.5t-4-26.5q0-33 23.5-56.5T840-760q33 0 56.5 23.5T920-680q0 38-28.5 62T826-601l-89 481H223Zm67-80h380l60-326q-11 2-23 3.5t-23 1.5q-63 0-117-30t-87-84q-33 54-87 84t-117 30q-11 0-23-1.5t-23-3.5l60 326Zm190 0Z"/></svg>,
    6: <svg className="fill-neutral-600 dark:fill-neutral-300 size-full" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-360h60v-240H200v60h40v180Zm140 0h100q17 0 28.5-11.5T520-400v-160q0-17-11.5-28.5T480-600H380q-17 0-28.5 11.5T340-560v160q0 17 11.5 28.5T380-360Zm20-60v-120h60v120h-60Zm157 60h60v-90l70 90h73l-93-120 93-120h-73l-70 90v-90h-60v240ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>,
    7: <svg className="fill-neutral-600 dark:fill-neutral-300 size-full" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m363-310 117-71 117 71-31-133 104-90-137-11-53-126-53 126-137 11 104 90-31 133ZM480-28 346-160H160v-186L28-480l132-134v-186h186l134-132 134 132h186v186l132 134-132 134v186H614L480-28Zm0-112 100-100h140v-140l100-100-100-100v-140H580L480-820 380-720H240v140L140-480l100 100v140h140l100 100Zm0-340Z"/></svg>,
    8: <svg className="fill-neutral-600 dark:fill-neutral-300 size-full" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120 80-600l120-240h560l120 240-400 480Zm-95-520h190l-60-120h-70l-60 120Zm55 347v-267H218l222 267Zm80 0 222-267H520v267Zm144-347h106l-60-120H604l60 120Zm-474 0h106l60-120H250l-60 120Z"/></svg>,
};

interface AchievementsSectionProps {
    section: ResultSection;        
    openSections: ResultSection[];
    user: User;
    sectionAnimationStage: ResultSection;
}
export default function AchievementsSection({
        section,
        openSections,
        user,
        sectionAnimationStage,
    }: AchievementsSectionProps) {

    return (
        <Section section={section} isOpen={openSections.includes(section)}>
            {sectionAnimationStage === 'Achievements' && <div className="flex flex-wrap gap-3">                
                {user?.profile.achievements && user?.profile.achievements.slice(0, 2).map(({id}, i) =>
                    <span 
                        key={id} 
                        style={{           
                            opacity: 0,                 
                            animation: "achievementFadeIn 800ms ease-out forwards",
                            animationDelay: `${i*800}ms`
                        }}
                        className="flex items-center justify-center size-20 sm:size-25 p-3 border-golden border-3 rounded-[50%]">
                        {achievementsMap[id]}
                    </span>
                )}
             </div>}
        </Section>
    )
}