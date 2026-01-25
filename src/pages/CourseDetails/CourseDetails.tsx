import { useState, type JSX } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

import CtaButton from '../../shared/CtaButton';
import Accordion from '../../shared/Accordion';
import Slider from '../../shared/Slider';
import { useLoaderData } from 'react-router';
import { useCourseDetails } from '../../features/courseDetails/hooks/useCourseDetails';
import { useCreateUserCourse } from '../../features/userCourses/hooks/useUserCourse';
import { useActiveUser } from '../../context/ActiveUserContext';
import { useNotification } from '../../context/NotificationContext';

const featureIcons: Record<string, JSX.Element> = {
  audio: (
    <svg className="fill-gray-700 dark:fill-neutral-400" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M753.846-481q0-82.497-44.209-150.582T591.076-733.461q-11.538-5.462-16.999-16.308-5.462-10.846-1.336-22.123 4.951-12.03 17.182-16.722 12.23-4.692 24.768.769 90.461 41.077 144.807 123.6 54.346 82.524 54.346 183.23 0 100.707-54.346 183.245-54.346 82.538-144.807 123.615-12.538 5.461-24.768.769-12.231-4.692-17.182-16.722-4.126-11.277 1.336-22.123 5.461-10.846 16.999-16.308 74.352-33.794 118.561-101.879Q753.846-398.503 753.846-481Zm-459.23 100.999H182.309q-15.365 0-25.759-10.395-10.394-10.394-10.394-25.759v-127.69q0-15.365 10.394-25.759 10.394-10.395 25.759-10.395h112.307L414.308-699.69q14.384-14.384 33.114-6.493 18.731 7.892 18.731 28.185v395.996q0 20.293-18.731 28.185-18.73 7.891-33.114-6.493L294.616-380.001Zm351.537-99.955q0 37.427-15.538 70.845-15.539 33.418-41.885 56.187-8.499 5.692-17.845 1.154-9.346-4.539-9.346-15v-228.46q0-10.461 9.346-15 9.346-4.538 17.845 1.09 26.346 23.449 41.885 57.602 15.538 34.154 15.538 71.582ZM406.154-606l-86 86h-114v80h114l86 86v-252Zm-100 126Z"/></svg>
  ),
  video: (
    <svg className="fill-gray-700 dark:fill-neutral-400" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m460-380 280-180-280-180v360ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/></svg>
  ),
  quiz: (
    <svg className="fill-gray-700 dark:fill-neutral-400" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M549.999-369.231q14.692 0 25.654-10.962 10.961-10.961 10.961-25.653 0-14.693-10.961-25.654-10.962-10.961-25.654-10.961T524.346-431.5q-10.962 10.961-10.962 25.654 0 14.692 10.962 25.653 10.961 10.962 25.653 10.962Zm0-120.308q9.077 0 16.462-6.461 7.384-6.461 8.999-16.384 2-13.923 8.885-24.308t25.808-28.539q27.692-26.538 37.692-44.846 10-18.307 10-42.538 0-42.692-30.154-70.423t-77.692-27.731q-30.692 0-56.153 14.231-25.462 14.231-40.692 40.692-4.847 8.077-1 16.962Q456-670 465.307-666.154q8.692 3.846 17.461.808 8.769-3.039 14.231-11.115 9.769-14.539 22.923-21.808 13.154-7.27 30.077-7.27 26.308 0 43.231 15.231 16.924 15.231 16.924 40.154 0 15.154-8.577 28.424-8.577 13.269-29.731 32.654-25.923 22.307-34.308 36.769-8.384 14.461-10.384 38.923-1 9.307 5.769 16.576t17.076 7.269ZM322.308-260.001q-30.308 0-51.307-21-21-21-21-51.308v-455.382q0-30.308 21-51.308 20.999-21 51.307-21h455.383q30.307 0 51.307 21 21 21 21 51.308v455.382q0 30.308-21 51.308t-51.307 21H322.308Zm0-59.999h455.383q4.615 0 8.462-3.846 3.846-3.847 3.846-8.463v-455.382q0-4.616-3.846-8.463-3.847-3.846-8.462-3.846H322.308q-4.616 0-8.462 3.846-3.847 3.847-3.847 8.463v455.382q0 4.616 3.847 8.463 3.846 3.846 8.462 3.846ZM182.309-120.003q-30.307 0-51.307-21-21-21-21-51.307v-485.382q0-12.769 8.615-21.384 8.616-8.615 21.384-8.615 12.769 0 21.385 8.615 8.615 8.615 8.615 21.384v485.382q0 4.616 3.846 8.462 3.847 3.847 8.462 3.847h485.382q12.769 0 21.385 8.615 8.615 8.615 8.615 21.384t-8.615 21.384q-8.616 8.615-21.385 8.615H182.309ZM309.999-800v480-480Z"/></svg>
  ),
  flashcard: (
    <svg className="fill-gray-700 dark:fill-neutral-400" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M228.385-457.385H337.77l19 52.616q2 5.23 6.23 8.153 4.231 2.923 10.077 2.923 9.462 0 14.808-7.653 5.346-7.654 2.115-16.5l-81.231-214.846q-2-5.615-7.115-9.231-5.115-3.615-11.346-3.615h-14.462q-6.23 0-11.346 3.615-5.115 3.616-7.115 9.231l-81.231 215.231q-3.23 8.461 2.116 16.115 5.346 7.653 14.807 7.653 5.846 0 10.385-2.923 4.538-2.923 6.538-8.769l18.385-52Zm12.23-33.153 41.462-114.693h2l41.462 114.693h-84.924ZM260-319.231q49.693 0 96.693 11.27 47 11.269 93.308 35.346v-393.231q-42.154-27.461-91.231-41.192-49.077-13.731-98.77-13.731-36 0-67.269 5.653-31.269 5.654-64.269 18.5-4.616 1.539-6.539 4.424-1.923 2.885-1.923 6.346v378.307q0 5.385 3.846 7.885 3.847 2.5 8.463.577 28.461-9.692 60.076-14.923Q224-319.231 260-319.231Zm249.999 46.616q46.308-24.077 93.308-35.346 47-11.27 96.693-11.27 36 0 67.615 5.231 31.615 5.231 60.076 14.923 4.616 1.923 8.463-.577 3.846-2.5 3.846-7.885v-378.307q0-3.461-1.923-6.154t-6.539-4.616q-33-12.846-64.269-18.5Q736-720.769 700-720.769q-49.693 0-98.77 13.731t-91.231 41.192v393.231ZM285-496.692Zm195 295.306q-11.692 0-21.884-2.923t-19.269-7.769q-41.308-23.385-86.424-35.27-45.115-11.884-92.423-11.884-36.615 0-71.922 8.115-35.308 8.115-68.077 23.884-21.384 9.846-40.692-3.115-19.307-12.962-19.307-36.731v-434.305q0-12.923 6.653-24.269 6.654-11.346 19.193-16.346 40.615-19.769 84.653-29.269 44.038-9.5 89.499-9.5 58.385 0 114.077 15.962Q429.769-748.845 480-717.691q50.231-31.154 105.923-47.115Q641.615-780.768 700-780.768q45.461 0 89.499 9.5t84.653 29.269q12.539 5 19.193 16.346 6.654 11.346 6.654 24.269v434.305q0 23.769-20.077 36.346-20.077 12.577-42.231 2.731-32.385-15.384-67.115-23.307-34.73-7.923-70.576-7.923-47.308 0-92.423 11.884-45.116 11.885-86.424 35.27-9.077 4.846-19.269 7.769-10.192 2.923-21.884 2.923Zm77.692-404.152q0-6.692 4.769-13.692t10.846-9.615q29.769-11.924 61.27-18.077 31.5-6.154 65.423-6.154 19.615 0 37.961 2.307 18.346 2.308 36.962 6.308 7.077 1.615 12.23 7.692 5.154 6.077 5.154 14.154 0 13.538-8.5 19.807-8.5 6.269-22.038 3.038-14.384-3-29.884-4.307-15.5-1.308-31.885-1.308-29.077 0-56.962 5.577t-53.193 15.115q-14.153 5.462-23.153-.615-9-6.077-9-20.23Zm0 218.461q0-6.692 4.769-13.884t10.846-9.808q29-11.923 61.27-17.884 32.269-5.962 65.423-5.962 19.615 0 37.961 2.308Q756.307-430 774.923-426q7.077 1.616 12.23 7.693 5.154 6.076 5.154 14.153 0 13.538-8.5 19.807-8.5 6.269-22.038 3.039-14.384-3-29.884-4.308-15.5-1.308-31.885-1.308-28.693 0-56.385 5.462-27.693 5.462-53 15.385-14.154 5.846-23.538-.308-9.385-6.154-9.385-20.692Zm0-108.846q0-6.692 4.769-13.692t10.846-9.615q29.769-11.923 61.27-18.077 31.5-6.154 65.423-6.154 19.615 0 37.961 2.308 18.346 2.307 36.962 6.307 7.077 1.616 12.23 7.692 5.154 6.077 5.154 14.154 0 13.538-8.5 19.807-8.5 6.269-22.038 3.039-14.384-3-29.884-4.308-15.5-1.308-31.885-1.308-29.077 0-56.962 5.577t-53.193 15.116q-14.153 5.461-23.153-.616-9-6.076-9-20.23Z"/></svg>
  ),
  assignment: (
    <svg className="fill-gray-700 dark:fill-neutral-400" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm80-80h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm200-190q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM200-200v-560 560Z"/></svg>
  ),
  downloadable: (
    <svg className="fill-gray-700 dark:fill-neutral-400" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
  ),
};

export default function CourseDetails() {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const isMiddleScreen = useMediaQuery("(min-width: 768px)");
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const addCourse = useCreateUserCourse();
  const notify = useNotification();

  const { courseDetailsId: courseDetailsIdStr } = useLoaderData() as { 
      courseDetailsId: string;        
  };  
  const courseDetailsId = Number(courseDetailsIdStr);
  if (isNaN(courseDetailsId)) {
      return <div>Invalid course details path</div>;
  }

  const { activeUserId: uid } = useActiveUser();
  const {data: courseDetails, isLoading, isError} = useCourseDetails(courseDetailsId);

  if (isError)
    return (
        <div className="absolute inset-0 flex justify-center items-center">
            <h1 className="text-1xl font-semibold text-neutral-500 text-center">There was an error during loading of the page, please try again later.</h1>
        </div>
    )
  
  return (
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-10 md:gap-20 sm:gap-[20%] p-[5%]">
          <article className="flex-2 flex flex-col gap-4 min-w-0 max-w-[600px]">
              <section className='flex flex-col gap-5'>
                <h2 className='text-4xl font-semibold'>About the course</h2>
                <div className="px-4 py-3 border-1 border-neutral-400 dark:border-neutral-600 rounded-xl">
                  {isLoading
                   ? [...Array(3)].map((_, i) => <div key={i} className='loading w-full h-4 rounded-md my-2'></div>)
                   : <p className={`${descriptionOpen ? 'h-auto' : 'max-h-[150px]'} overflow-hidden`}>{courseDetails?.description}</p>
                  }                  
                  <button
                    onClick={() => setDescriptionOpen(!descriptionOpen)}
                    className='p-1 text-blue-600 dark:text-blue-400 cursor-pointer self-start'>
                    Show {descriptionOpen ? "less" : "more"}
                  </button>
                </div>
              </section>
              <section className='flex flex-col gap-5'>
                <h2 className='text-4xl font-semibold'>What you will learn</h2>
                <ul className="px-4 py-3 border-1 border-neutral-400 dark:border-neutral-600 rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {courseDetails?.achievements.map(({highlight, text}, i) =>
                    isLoading
                      ? <li key={i} className='loading w-full h-3 rounded-md'></li>
                      : <li key={i} className='flex gap-3 items-center justify-center'>
                          <svg className="fill-neutral-500 flex-shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m382-388 321-321q19-19 45-19t45 19q19 19 19 45t-19 45L427-253q-19 19-45 19t-45-19L167-423q-19-19-19-45t19-45q19-19 45-19t45 19l125 125Z"/></svg>
                          {highlight
                            ? <span>
                                <span className='text-sakura'>{highlight}</span> {text}
                              </span>
                            : <span>
                                <span>{highlight}</span> {text}
                              </span>
                          }                             
                        </li>                    
                  )
                  }
                </ul>
              </section>
              <section className='flex flex-col gap-3'>
                <h2 className='text-4xl font-semibold'>Course features</h2>
                <ul className="px-6 py-4 grid grid-cols-2 gap-3 text-sm">
                  {courseDetails?.features.map(({ type, text }, i) => (
                    isLoading
                     ? <li key={i} className='loading w-full h-3 rounded-md'></li>
                     : <li key={i} className="flex gap-3 items-center">
                          <span className='shrink-0'>{featureIcons[type]}</span>
                          <span>{text}</span>
                        </li>                    
                  ))}
                </ul>
              </section>
              <section className='flex flex-col gap-5'>
                <h2 className='text-4xl font-semibold'>About the course</h2>
                <div className="px-4 py-3 border-1 border-neutral-400 dark:border-neutral-600 rounded-xl">
                  <Accordion items={courseDetails?.curriculum ?? []} fontScale='small'/>
                </div>
              </section>
              <section className='flex flex-col gap-5'>
                <h2 className='text-4xl font-semibold'>Prerequesites</h2>
                <div className="px-4 py-3 border-1 border-neutral-400 dark:border-neutral-600 rounded-xl">
                  <ul className='px-3 list-disc'>
                    {courseDetails?.prerequesites.map((prerequesite, i) =>
                      <li key={i} className='py-1'>{prerequesite}</li>
                    )}
                  </ul>
                </div>
              </section>                
              <section className='flex flex-col gap-5 min-w-0'>
                <h2 className='text-4xl font-semibold'>Testimonials</h2>
                <div>                    
                  {courseDetails && 
                    <Slider isLoading={false} itemsPerSlide={isLargeScreen ? 2 : 1} gap={isLargeScreen ? 10 : 5} offset={'middle'}>
                      {courseDetails.testimonials.map(({username, rating, text, pfpUrl}, i) =>
                        <div key={i} className={`outline-1 outline-offset-[-1px] h-full outline-neutral-400 dark:outline-neutral-600 rounded-lg`}>
                          <div className='grid grid-cols-[1fr_3fr] gap-[6px] p-3 place-items-center'>
                            {pfpUrl && <img src={pfpUrl} alt="User profile picture" className='rounded-full size-10' />}
                            <span className='justify-self-start font-semibold text-gray-500 dark:text-neutral-400'>{username}</span>                            
                            <div className='self-start flex items-center text-xs'>
                              <span>{rating}/5</span>
                              <svg className="size-5" key={i} xmlns="http://www.w3.org/2000/svg" fill="#F3C63F" height="24" viewBox="0 -960 960 960" width="24"><path d="m480-292.463-155.615 93.845q-8.692 5.077-17.422 4.27-8.731-.808-15.808-5.885-7.076-5.077-10.922-13.269-3.847-8.192-1.231-18.115l41.307-176.691-137.384-118.923q-7.692-6.692-9.807-15.499-2.115-8.808 1.115-17.115 3.231-8.308 9.308-13.577t16.615-6.884l181.307-15.846 70.384-166.846q3.846-9.307 11.653-13.769 7.808-4.461 16.5-4.461t16.5 4.461q7.807 4.462 11.653 13.769l70.384 166.846 181.307 15.846q10.538 1.615 16.615 6.884 6.077 5.269 9.308 13.577 3.23 8.307 1.115 17.115-2.115 8.807-9.807 15.499L639.691-408.308l41.307 176.691q2.616 9.923-1.231 18.115-3.846 8.192-10.922 13.269-7.077 5.077-15.808 5.885-8.73.807-17.422-4.27L480-292.463Z"/></svg>
                            </div>
                            <p className='max-h-[100px] overflow-y-auto text-sm md:text-base'>
                              {text}
                            </p>                            
                          </div>
                        </div>
                      )}
                    </Slider>
                  }
                </div>
              </section>
              <section className='flex flex-col gap-5'>
                <h2 className='text-4xl font-semibold'>About the course author</h2>
                <div className="flex flex-col sm:flex-row gap-4 px-4 py-3 border-1 border-neutral-400 dark:border-neutral-600 rounded-xl">
                    <div className='flex flex-col items-center gap-2'>
                      {courseDetails?.author.pfpUrl && <img src={courseDetails.author.pfpUrl} alt="Course author profile picture." className='rounded-xl max-w-[150px]' />}
                      <span className='text-center font-bold'>{courseDetails?.author.name}</span>
                      <span className='sm:text-sm text-gray-500 dark:text-neutral-400'>
                        <div>Number of courses: {courseDetails?.author.nCourses}</div>                        
                        <div>Average rating: {courseDetails?.author.avgRating}</div>                        
                      </span>
                    </div>
                    <p className='flex-1 max-h-[200px] overflow-y-auto'>
                      {courseDetails?.author.about}
                    </p>
                </div>
              </section>
          </article>                        
          <aside className="flex-1 max-w-[300px] self-center sm:self-stretch">                                                         
            <div className='sticky top-30 flex flex-col lg:min-h-[40vh] shadow-lg/20 dark:shadow-lg/40 dark:shadow-neutral-500 rounded-lg dark:outline dark:outline-neutral-600'>
              <div className='relative flex h-[150px] md:h-[100px] lg:h-[150px] flex-shrink-0 flex-col px-4 py-3 rounded-t-lg'>
                {courseDetails?.posterUrl && <img src={courseDetails.posterUrl} alt="course background image" className='absolute inset-0 w-full h-full object-cover object-center brightness-50 z-[-1] rounded-t-lg' />}
                <h3 className='font-bold text-xl text-[#F4F4F4]'>{courseDetails?.name}</h3>
              </div>
              <div className='flex flex-1 flex-col justify-between p-[10px_20px_20px] bg-[#F4F4F4] text-[#171A1F] rounded-b-lg'>
                {(isLargeScreen || isMiddleScreen) &&
                  <ul className='h-[100px] overflow-y-auto'>
                    {courseDetails?.courseValues.map(({label, value}, i) => 
                      <li key={i} className='flex items-center justify-between space-b-2 py-2 border-b-2 border-gray-300'>
                        <span className='text-neutral-500'>{label}</span>
                        <span className='font-bold'>{value}</span>
                      </li>
                    )}
                  </ul>
                }
                <div className={`${(isLargeScreen) ? 'mt-10' : isMiddleScreen ? 'mt-5' : ''} flex flex-col gap-2`}>
                  {isLargeScreen && <span className='font-medium'>Rating</span>}
                  <div className='flex'>
                      {courseDetails && [...Array(5)].map((_, i) => 
                          i < courseDetails.rating                                                
                              ? <svg key={i} className="size-8" xmlns="http://www.w3.org/2000/svg" fill="#F3C63F" height="24" viewBox="0 -960 960 960" width="24"><path d="m480-292.463-155.615 93.845q-8.692 5.077-17.422 4.27-8.731-.808-15.808-5.885-7.076-5.077-10.922-13.269-3.847-8.192-1.231-18.115l41.307-176.691-137.384-118.923q-7.692-6.692-9.807-15.499-2.115-8.808 1.115-17.115 3.231-8.308 9.308-13.577t16.615-6.884l181.307-15.846 70.384-166.846q3.846-9.307 11.653-13.769 7.808-4.461 16.5-4.461t16.5 4.461q7.807 4.462 11.653 13.769l70.384 166.846 181.307 15.846q10.538 1.615 16.615 6.884 6.077 5.269 9.308 13.577 3.23 8.307 1.115 17.115-2.115 8.807-9.807 15.499L639.691-408.308l41.307 176.691q2.616 9.923-1.231 18.115-3.846 8.192-10.922 13.269-7.077 5.077-15.808 5.885-8.73.807-17.422-4.27L480-292.463Z"/></svg>
                              : <svg key={i} className="size-8" xmlns="http://www.w3.org/2000/svg" fill="#F3C63F" height="24" viewBox="0 -960 960 960" width="24"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143Zm126-5.463-155.615 93.845q-8.692 5.077-17.422 4.27-8.731-.808-15.808-5.885-7.076-5.077-10.922-13.269-3.847-8.192-1.231-18.115l41.307-176.691-137.384-118.923q-7.692-6.692-9.807-15.499-2.115-8.808 1.115-17.115 3.231-8.308 9.308-13.577t16.615-6.884l181.307-15.846 70.384-166.846q3.846-9.307 11.653-13.769 7.808-4.461 16.5-4.461t16.5 4.461q7.807 4.462 11.653 13.769l70.384 166.846 181.307 15.846q10.538 1.615 16.615 6.884 6.077 5.269 9.308 13.577 3.23 8.307 1.115 17.115-2.115 8.807-9.807 15.499L639.691-408.308l41.307 176.691q2.616 9.923-1.231 18.115-3.846 8.192-10.922 13.269-7.077 5.077-15.808 5.885-8.73.807-17.422-4.27L480-292.463ZM480-470Z"/></svg>                                            
                      )}
                  </div>
                  <span className='self-stretch'>
                    <CtaButton 
                      onClick={() => {
                        if (courseDetails) {
                          addCourse.mutate({userId: uid, courseId: courseDetails.courseId});
                          notify('Added to your library');
                        }
                      }}
                      padY='8' borderRadius='6' fullSpace>
                      Add to library
                    </CtaButton>
                  </span>
                </div>
              </div>
            </div>
          </aside>
      </div>
  )
}