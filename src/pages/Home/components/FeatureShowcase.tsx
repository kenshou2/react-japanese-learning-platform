import { useEffect, useRef, useState } from 'react';
import { useSwipe } from '../../../hooks/useSwipe';
import useDeviceType from '../../../hooks/useDeviceType';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

const BASE_VIDEO_PATH = '/static/homePage/videos';
const BASE_THUMBNAIL_PATH = '/static/homePage/images';

interface Card {
    id: number;
    video: string;
    thumbnail: string;
    label: {
        highlight: string;
        text: string;
    };
    position: 'left' | 'middle' | 'right';
}

export default function FeatureShowcase() {
    const [currentClicked, setCurrentClicked] = useState<number | null>(null);    
    const [cardShift, setCardShift] = useState(1);
    const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | null>(null);
    let cards: Card[];

    if (currentTheme === 'light')
        cards = [
            {id: 0, video: `${BASE_VIDEO_PATH}/showcase2-dark.mov`, thumbnail: `${BASE_THUMBNAIL_PATH}/showcase2-dark.png`, position: 'left', label: {highlight: 'Engaging tests', text: ' with XP points and achievements.'},},
            {id: 1, video: `${BASE_VIDEO_PATH}/showcase1-dark.mov`, thumbnail: `${BASE_THUMBNAIL_PATH}/showcase1-dark.png`, position: 'middle', label: {highlight: 'Extensive library of courses', text: ' for fast progress.',},},
            {id: 2, video: `${BASE_VIDEO_PATH}/showcase3-dark.mov`, thumbnail: `${BASE_THUMBNAIL_PATH}/showcase3-dark.png`, position: 'right', label: {highlight: 'Hundreds of articles', text: ' covering all tastes.',},}
        ];
    else
        cards = [
            {id: 0, video: `${BASE_VIDEO_PATH}/showcase2-light.mov`, thumbnail: `${BASE_THUMBNAIL_PATH}/showcase2-light.png`, position: 'left', label: {highlight: 'Engaging tests', text: ' with XP points and achievements.'},},
            {id: 1, video: `${BASE_VIDEO_PATH}/showcase1-light.mov`, thumbnail: `${BASE_THUMBNAIL_PATH}/showcase1-light.png`, position: 'middle', label: {highlight: 'Extensive library of courses', text: ' for fast progress.',},},
            {id: 2, video: `${BASE_VIDEO_PATH}/showcase3-light.mov`, thumbnail: `${BASE_THUMBNAIL_PATH}/showcase3-light.png`, position: 'right', label: {highlight: 'Hundreds of articles', text: ' covering all tastes.',},}
        ];    
    const { onTouchStart, onTouchEnd } = useSwipe({
        onSwipe: (dir) => {            
            if (dir === 'left')
                setCardShift(prev => prev < cards.length - 1 ? prev + 1 : prev);
            else if (dir === 'right')
                setCardShift(prev => prev > 0 ? prev - 1 : prev);
        },
        threshold: 50,
    });

    useEffect(() => {
        const root = document.documentElement;

        const observer = new MutationObserver(() => {
            setCurrentTheme(root.classList.contains('dark') ? 'dark' : 'light');
        });

        observer.observe(root, { attributes: true, attributeFilter: ['class'] });        
        setCurrentTheme(root.classList.contains('dark') ? 'dark' : 'light');

        return () => observer.disconnect();
    }, []);

    const isMobile = useDeviceType() === 'touch';
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    
    return (
        <section
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="relative overflow-hidden w-screen h-screen bg-radial from-bg-primary from-70% to-neutral-300/80 dark:to-neutral-700/30">
            <div 
                style={{
                    transform: (isMobile && isSmallScreen)
                        ? `translateX(${-(cardShift*100)+50}%) translateY(-50%) perspective(1000px)`
                        : 'translateX(-50%) translateY(-50%) perspective(1000px)',   
                    transformStyle: 'preserve-3d',                 
                }}                
                className={`                        
                        absolute top-1/2 left-1/2 
                        transition-transform duration-150 ease-out
                        ${isSmallScreen ? 'w-[65vw] h-[80vh]' : 'h-[65vh] w-[28vw] max-w-[220px] max-h-[600px]'}
                        `}>
                {cards.map(({id, video, thumbnail, position, label}) =>
                    <AnimatedCard
                        key={id} 
                        id={id}
                        videoPath={video} 
                        thumbnailPath={thumbnail}
                        position={position}
                        label={label}
                        currentClicked={currentClicked}                       
                        setCurrentClicked={setCurrentClicked} 
                        isMobile={isMobile}
                        isSmallScreen={isSmallScreen}                        
                        />
                )}
            </div>
        </section>
    )
}

interface AnimatedCardProps {
    id: number;
    videoPath: string;
    thumbnailPath: string;
    position: 'left' | 'middle' | 'right';  
    label: Card['label'];
    currentClicked: number | null;
    setCurrentClicked: React.Dispatch<React.SetStateAction<number | null>>;
    isMobile: boolean;
    isSmallScreen: boolean;    
}
function AnimatedCard({ 
        id, 
        videoPath, 
        thumbnailPath, 
        position, 
        label,
        currentClicked, 
        setCurrentClicked, 
        isMobile, 
        isSmallScreen,         
    }: AnimatedCardProps) {          
    const [videoPlays, setVideoPlays] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (!videoRef.current)
            return;
        videoRef.current.currentTime = 0;
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    }, [videoPlays]);
    
    useEffect(() => {
        if (!videoRef.current)
            return;
        if (currentClicked !== id) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, [currentClicked]);    
    
    const delay = `${Math.random() * 2}s`;
    const duration = `${6 + Math.random() * 2}s`;


    let positionClass: string;  
    let clickedTransformation: string;
    if (position === 'left') {
        if (isMobile && isSmallScreen) {
            clickedTransformation = '-translate-x-[85%] inset-[-10%] z-10';
            positionClass = `-translate-x-[110%]`;
        } else {
            clickedTransformation = 'translate-z-50 translate-x-0 inset-[-10%_-75%_-10%_-75%]';
            positionClass = '-translate-x-[clamp(15vw,35vw,400px)] -translate-z-15';
        }        
    }
    else if (position === 'middle') {
        if (isMobile && isSmallScreen) {
            clickedTransformation = 'translate-x-[0] inset-[-10%] z-10';
            positionClass = `translate-x-[0]`;
        } else {
            clickedTransformation = 'translate-z-55 inset-[-10%_-75%_-10%_-75%]';
            positionClass = 'translate-z-40';
        }
    }
    else {
        if (isMobile && isSmallScreen) {
            clickedTransformation = 'translate-x-[85%] inset-[-10%] z-10';
            positionClass = `translate-x-[110%]`;
        } else {
            clickedTransformation = 'translate-z-50 translate-x-0 inset-[-10%_-75%_-10%_-75%]';
            positionClass = 'translate-x-[clamp(15vw,35vw,400px)] -translate-z-15';
        }
    }

    return (
    <div        
        onClick={() => {
            setCurrentClicked(id === currentClicked ? null : id);
            setVideoPlays(prev => !prev);
        }}
        className={`
            group absolute inset-0 
            ${id === currentClicked ? clickedTransformation : positionClass} 
            transition-translate duration-300 flex flex-col gap-5 items-center transform-3d 
            transform-[perspective(1000px)] cursor-pointer`}>
        <h2 className='font-bold text-center'><span className='text-btn-primary dark:text-sakura'>{label.highlight}</span>{label.text}</h2>
                
        <video
            ref={videoRef}
            poster={thumbnailPath}
            src={videoPath}
            disablePictureInPicture
            muted            
            loop
            className={`
            ${id === currentClicked ? 'object-contain bg-[#1e1e1e] dark:bg-[#f0f0f0] animate-float-small' : 'object-cover animate-float'}             
            w-full h-full rounded-2xl object-center
            shadow-[0px_0px_5px_3px]
            shadow-neutral-400/30 dark:shadow-neutral-300/40 group-hover:shadow-sakura`}
            style={{
                animationDelay: delay,
                animationDuration: duration,
            }}
        ></video>                
        
        <div
            style={{
                animationDelay: delay,
                animationDuration: duration,
            }}
            className={`
                ${id === currentClicked ? 'animate-float-small' : 'animate-float'} 
                relative w-full h-1/2 mt-5 rounded-2xl overflow-hidden blur-xs transform-3d transform-[perspective(1000px)] [transform:scaleY(-1)]`}>
            <div className='rotate-180'>
                <img 
                    src={thumbnailPath} 
                    alt="website feature showcase image"
                    className='w-full h-full object-cover object-center scale-150 origin-bottom' />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary shadow-xl shadow-neutral-300/70 to-transparent" />
        </div>
    </div>
    );
};
