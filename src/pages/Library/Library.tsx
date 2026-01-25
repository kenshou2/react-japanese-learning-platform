import CtaButton from '../../shared/CtaButton';
import DonutProgress from '../../shared/DonutProgress';

import { Link } from 'react-router';
import { useGetUserProgress } from '../../features/users/hooks/useUser';
import { useActiveUser } from '../../context/ActiveUserContext';
import { useGetUserCourses } from '../../features/userCourses/hooks/useUserCourse';
import { useGetUserDecks } from '../../features/userDecks/hooks/useUserDecks';

export default function Library() {
    const {activeUserId: uid} = useActiveUser();
    const {data: progress, isError: isProgressError} = useGetUserProgress(uid);
    const {data: userCourses, isLoading: isUserCoursesLoading, isError: isUserCoursesError} = useGetUserCourses(uid);    
    const {data: userDecks, isLoading: isUserDecksLoading, isError: isUserDecksError} = useGetUserDecks(uid);    
    const courseProgress = progress?.courseProgress;

    if (isUserCoursesError || isProgressError || isUserDecksError)
        return (
            <div className="absolute inset-0 flex justify-center items-center">
                <h1 className="text-1xl font-semibold text-neutral-500 text-center">There was an error during loading of the page, please try again later.</h1>
            </div>
        )
    
    return (
        <div className='px-[10%] py-[5%]'>
            <div className='w-full flex flex-col gap-10'>
                <div className="flex flex-col gap-5">
                    <h1 className='text-4xl font-bold'>Your courses</h1>
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-5 text-[#F4F4F4]">
                        {isUserCoursesLoading
                         ? [...Array(4)].map((_, i) => <div key={i} className='loading h-[200px] rounded-xl'></div>)
                         : userCourses?.map(({id, courseId, name, posterUrl}) => 
                            <div key={id} className="relative px-6 py-4 flex flex-col h-[200px] rounded-xl overflow-hidden shadow-lg/20 dark:outline dark:outline-neutral-600">
                                <img src={posterUrl} alt="" className='absolute inset-0 w-full h-full object-cover object-center brightness-50 z-[-1]' />                            
                                <div>
                                    <h3 className='font-bold text-lg'>{name}</h3>
                                    <span className='text-neutral-300'>Current hours: {courseProgress && courseProgress.find(cP => cP.courseId === courseId)?.currentHours}</span>
                                </div>
                                <div className="mt-auto flex justify-between items-center">
                                    <div className='flex items-center justify-between'>
                                        <span><DonutProgress percentage={(courseProgress && courseProgress.find(cP => cP.courseId === courseId)?.currentProgress) ?? 0} size={40} fontSize='10' /></span>                                        
                                    </div>
                                    <CtaButton url={`/courses/${courseId}/modules/${courseProgress?.find(cP => cP.courseId === id)?.checkpoint.moduleId}/lessons/${courseProgress?.find(cP => cP.courseId === id)?.checkpoint.lessonId}`} borderRadius='8' padX='8' padY='6'>Proceed</CtaButton>
                                </div>
                            </div>
                        )}                        
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <h1 className='text-4xl font-bold'>Your vocabulary decks</h1>
                    <div>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5 text-[#F4F4F4]">
                            {isUserDecksLoading
                             ? [...Array(3)].map((_, i) => <div key={i} className='loading h-[200px] rounded-xl'></div>)
                             : userDecks?.map(({id, name, dueWords, newWords, posterUrl}) => 
                                <Link to={`/spaced-repetition/${id}`}>
                                    <div key={id} className="relative px-4 py-3 flex flex-col h-[200px] rounded-xl text-left overflow-hidden ratio-1/1 shadow-lg/20 dark:outline dark:outline-neutral-600 cursor-pointer">
                                        {posterUrl && <img src={posterUrl} alt="" className='absolute inset-0 w-full h-full object-cover object-center brightness-50 z-[-1]' />}
                                        <div>
                                            <h3 className='font-bold'>{name}</h3>
                                        </div>
                                        <div aria-label={`Go to deck ${name}`} className="absolute left-0 bottom-0 right-0 flex items-center py-1 px-2 text-sm text-left bg-[#F4F4F4] text-[#171A1F] h-[60px] overflow-y-scroll">
                                            <div>
                                                <div className='text-neutral-400'>Due words: <span className='text-blue-700'>{dueWords}</span></div>
                                                <div className='text-neutral-400'>New words: <span className='text-sakura'>{newWords}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}