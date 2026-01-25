import { useState } from "react";
import DonutProgress from "../../../../../shared/DonutProgress";
import CtaButton from "../../../../../shared/CtaButton";
import useEditUserField from "../../../../../hooks/useEditUserField";

export default function LearningGoals({inEditMode}: {inEditMode: boolean}) {    
    const {
        value: learningGoals,
        setValue: setLearningGoals,
        userQuery: { isLoading, isError },
    } = useEditUserField('profile', 'learningGoals', inEditMode);
    const [addGoalInput, setAddGoalInput] = useState<string>('');

    function createGoal() {
        if (addGoalInput) {
            setLearningGoals(prev => {
                const next = {
                    id: prev?.length ? prev[prev.length-1].id + 1 : 1,
                    description: addGoalInput.trim(),
                    completion: 0,
                };
                if (Array.isArray(prev))                    
                    return [...prev, next];
                else
                    return [next];
            });
        }
        setAddGoalInput('');
    }
    function deleteGoal(id: number) {
        setLearningGoals(prev => {
            if (Array.isArray(prev))
                return prev.filter(goal => goal.id !== id);            
        });
    }
    function updateGoalsDescription(id: number, newDescription: string) {
        setLearningGoals(prev => {
            if (!Array.isArray(prev))
                return;
            let next = [...prev];
            if (newDescription)
                next = prev.map(((goal) => goal.id === id ? {...goal, description: newDescription} : goal));
            return next;
        });
    }
    function updateGoalsCompletion(id: number, newCompletion: number) {
        setLearningGoals(prev => {
            if (!Array.isArray(prev))
                return;                       
            let next = [...prev];
            if (newCompletion >= 0 && newCompletion <= 100)
                next = prev.map(((goal) => goal.id === id ? {...goal, completion: newCompletion} : goal));            
            return next;
        });
    }

    if (isError)
        return (
            <div className="flex flex-col gap-5">
                <h2 className='text-2xl font-semibold'>Learning goals</h2>
                <div className="border-1 border-neutral-400 dark:border-neutral-600 rounded-xl px-4 py-3 text-neutral-300 dark:text-neutral-500">
                    Couldn't load you learning goals.
                </div>
            </div>
        )
    else if (isLoading)
        return (
            <div className="flex flex-col gap-5">
                <h2 className='text-2xl font-semibold'>Learning goals</h2>
                <div className="border-1 border-neutral-400 dark:border-neutral-600 flex flex-col gap-3 rounded-xl px-4 py-3">
                    {[...Array(3)].map((_, i) => 
                        <div key={i} className="loading w-full h-5 rounded-md"></div>
                    )}
                </div>
            </div>
        )

    return (
        <div className="flex flex-col gap-5">
            <h2 className='text-2xl font-semibold'>Learning goals</h2>
            <div className={`${inEditMode ? 'outline-2 outline-sakura border-none' : ''} flex flex-col gap-3 max-h-[200px] overflow-auto px-4 py-3 border-1 border-neutral-400 dark:border-neutral-600 rounded-xl`}>
                {inEditMode &&
                <div className="flex justify-between items-center gap-2">
                    <div className="w-full flex gap-2 items-center text-sm">
                        <DonutProgress percentage={0} size={30} strokeWidth={4} fontSize="7"/>
                        <input
                            type="text"
                            value={addGoalInput}
                            onChange={e => setAddGoalInput(e.target.value)}
                            onKeyDown={(e) => {if (e.key === 'Enter') createGoal()}}
                            placeholder="Add a new goal"
                            disabled={!inEditMode}
                            className={`${inEditMode ? 'focus:outline focus:outline-sakura focus: p-1' : ''} w-full text-sm text-ellipsis overflow-x-auto text-2xl py-1 text-txt-primary rounded-sm`}
                        />
                    </div>                    
                    <CtaButton onClick={() => createGoal()} borderRadius="6" padX="11" padY="4" fontSize="12">Add</CtaButton>
                </div>
                }
                {!learningGoals?.length
                ? <span className="text-lg text-neutral-500 dark:text-neutral-400">You don't have any goals. Click 'Edit' to add new.</span>
                : <>
                    {learningGoals.map(({id, description, completion}) =>
                        <div key={id} className="flex justify-between items-center gap-2">
                            <div className="w-full flex gap-2 items-center text-sm">
                                <DonutProgress percentage={completion} size={30} strokeWidth={4} fontSize="7"/>
                                <input 
                                    type="text"
                                    value={description} 
                                    onChange={e => updateGoalsDescription(id, e.target.value)}
                                    disabled={!inEditMode}
                                    className={`${inEditMode ? 'focus:outline focus:outline-sakura focus:no-underline focus: p-1 underline decoration-sakura' : 'no-underline'} w-full text-sm text-ellipsis overflow-x-auto text-2xl py-1 text-txt-primary rounded-sm`}
                                />
                            </div>
                            {inEditMode &&
                            <div className="flex gap-3 items-center">
                                <div className="flex flex-col items-center text-[10px]">
                                    <button 
                                        onClick={() => updateGoalsCompletion(id, completion+5)}
                                        className="cursor-pointer"
                                        aria-label='Increase progress percentage.'>
                                        <svg className="-mb-[4px] size-3 rotate-90 fill-txt-primary" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m367.384-480 301.308 301.308q11.923 11.923 11.615 28.077-.308 16.153-12.231 28.076-11.922 11.923-28.076 11.923t-28.076-11.923L305.078-428.77q-10.847-10.846-16.077-24.307-5.231-13.462-5.231-26.923 0-13.461 5.231-26.923 5.23-13.461 16.077-24.307l306.846-306.846q11.922-11.923 28.384-11.616 16.461.308 28.384 12.231 11.923 11.923 11.923 28.076 0 16.154-11.923 28.077L367.384-480Z"/></svg>
                                    </button>
                                    <span>%</span>
                                    <button 
                                        onClick={() => updateGoalsCompletion(id, completion-5)}
                                        className="cursor-pointer"
                                        aria-label='Decrease progress percentage.'>
                                        <svg className="-mt-[4px] size-3 rotate-270 fill-txt-primary" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m367.384-480 301.308 301.308q11.923 11.923 11.615 28.077-.308 16.153-12.231 28.076-11.922 11.923-28.076 11.923t-28.076-11.923L305.078-428.77q-10.847-10.846-16.077-24.307-5.231-13.462-5.231-26.923 0-13.461 5.231-26.923 5.23-13.461 16.077-24.307l306.846-306.846q11.922-11.923 28.384-11.616 16.461.308 28.384 12.231 11.923 11.923 11.923 28.076 0 16.154-11.923 28.077L367.384-480Z"/></svg>
                                    </button>
                                </div>
                                <button 
                                    onClick={() => deleteGoal(id)}
                                    className="cursor-pointer"
                                    aria-label="Delete goal.">
                                    <svg className="fill-txt-primary size-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                                </button>
                            </div>
                            }
                        </div>
                    )}
                </> 
                }                
            </div>
        </div>        
    )
}