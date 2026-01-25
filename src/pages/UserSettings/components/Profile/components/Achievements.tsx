import { type JSX } from 'react';
import { useActiveUser } from "../../../../../context/ActiveUserContext";
import { useUser } from '../../../../../features/users/hooks/useUser';

export default function Achievements({achievementsMap}: {achievementsMap: Record<string, JSX.Element>}) {
    const {activeUserId: uid} = useActiveUser();
    const { data: user, isLoading, isError } = useUser(uid);
    
    return (
        <section className='flex flex-col gap-5'>
            <h2 className='text-2xl font-semibold'>Achievements</h2>
            { isError
             ? <div className="text-neutral-300 dark:text-neutral-400">Couldn't load your achievements.</div>
             : <div className="flex flex-wrap gap-3">
                { isLoading
                 ? [...Array(4)].map((_, i) => <span key={i} className="loading size-15 sm:size-25 rounded-[50%]"></span>)                 
                 : user?.profile.achievements && user?.profile.achievements.map(({id}) =>
                        <span key={id} className="flex items-center justify-center size-15 sm:size-25 p-3 border-golden border-3 rounded-[50%]">{achievementsMap[id]}</span>
                    )                   
                }
             </div>                             
            }
        </section>
    )
}