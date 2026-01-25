import CtaButton from '../../../shared/CtaButton';

export default function Hero() {
    return (    
        <section className='relative w-full overflow-y-scroll h-screen pb-10 mt-[-80px] pt-[80px] px-[5%]'>
            <div style={{ backgroundImage: "url('/static/homePage/images/wallpaper.png')" }} className='absolute z-[-1] inset-0 bg-cover bg-center dark:brightness-30'></div>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce">
                <svg className="-rotate-90 size-17 fill-btn-primary dark:fill-sakura" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m367.384-480 301.308 301.308q11.923 11.923 11.615 28.077-.308 16.153-12.231 28.076-11.922 11.923-28.076 11.923t-28.076-11.923L305.078-428.77q-10.847-10.846-16.077-24.307-5.231-13.462-5.231-26.923 0-13.461 5.231-26.923 5.23-13.461 16.077-24.307l306.846-306.846q11.922-11.923 28.384-11.616 16.461.308 28.384 12.231 11.923 11.923 11.923 28.076 0 16.154-11.923 28.077L367.384-480Z"/></svg>
            </div>
            <div className='min-h-[50%] overflow-hidden flex justify-center items-center'>
                <div className='flex flex-col gap-3 items-center text-center'>
                    <h1 className='xl:max-w-[80%] text-4xl md:text-5xl lg:text-6xl font-bold'><span className='text-sakura'>JP-Input: </span>Your Gateway to Japanese Fluency</h1>
                    <p className='sm:max-w-[70%] text-lg lg:text-xl'>Experience a tailored journey through the Japanese language, blending culture, conversation, and comprehension for true fluency.</p>
                    <CtaButton url="/library" padX='28' padY='8' fontSize='18' borderRadius='7'>Get started</CtaButton>
                    <span className='text-blue-600 dark:text-blue-400 text-xs'>2,136 users already enrolled</span>
                </div>
            </div>
        </section>
    )
}