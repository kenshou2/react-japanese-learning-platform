import { useState, Children } from 'react';

type SliderProps = {
    children: React.ReactNode;        
    gap?: number;
    itemsPerSlide?: number;
    offset?: number | 'middle';
    peek?: number;
    isLoading: boolean;
}

export default function Slider({
        children,         
        gap=10, 
        itemsPerSlide=1, 
        offset='middle', 
        peek=0,
        isLoading,
    }: SliderProps) {
    if (isLoading)
        return <SliderPlaceholder peek={peek} itemsPerSlide={itemsPerSlide} />

    const nItems = Children.toArray(children).length;
    let offsetVal = 0;
    let peekPercent = peek * 100;
    let itemBasis = peek
        ? 100 / itemsPerSlide * (1 - peek)
        : 100 / itemsPerSlide;
    if (offset === "middle") {        
        offsetVal = Math.floor(nItems / 2);
    } else if (typeof offset === "number" && offset >= 0 && offset < nItems) {
        offsetVal = offset;
    }    

    const [currentItem, setCurrentItem] = useState(offsetVal);
    const maxIndex = Math.max(0, nItems - itemsPerSlide);    

    function shift(direction: "left" | "right") {
        setCurrentItem(prev => {
            if (direction === "left" && prev > 0) {
                return prev - 1;
            } else if (direction === "right" && prev < maxIndex) {
                return prev + 1;
            } else return prev;
        });
    }    
    
    return (
        <div className='flex w-full'>
            <button onClick={() => shift('left')} className='shrink-0 mr-6 lg:mr-12 cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" className={`${currentItem === 0 ? 'fill-neutral-300 dark:fill-neutral-600' : 'fill-txt-primary'} size-8 lg:size-10`} width="48"><path d="m367.384-480 301.308 301.308q11.923 11.923 11.615 28.077-.308 16.153-12.231 28.076-11.922 11.923-28.076 11.923t-28.076-11.923L305.078-428.77q-10.847-10.846-16.077-24.307-5.231-13.462-5.231-26.923 0-13.461 5.231-26.923 5.23-13.461 16.077-24.307l306.846-306.846q11.922-11.923 28.384-11.616 16.461.308 28.384 12.231 11.923 11.923 11.923 28.076 0 16.154-11.923 28.077L367.384-480Z"/></svg>
            </button>
            <div className='flex-1 overflow-hidden relative'>
                <div 
                    style={{
                        transform: `translateX(${-(currentItem * ((100 - peekPercent) / itemsPerSlide) - peekPercent / 2)}%)`, 
                        gap: gap,
                        marginLeft: peek ? `${gap}px` : 0,
                    }}
                    className={`flex transition-transform duration-500 ease-out`}>
                    {Children.toArray(children).map((child, i) => 
                        <div 
                            key={i}
                            style={{
                                flexBasis: `calc(${itemBasis}% - ${gap}px)`,
                            }}
                            className={`shrink-0`}>
                            {child}
                        </div>
                    )}
                </div>
                {peek > 0 && <div className='absolute inset-0 slider-peek-gradient pointer-events-none'></div>}
            </div>
            <button onClick={() => shift('right')} className='shrink-0 ml-6 lg:ml-12 cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" className={`${currentItem === maxIndex ? 'fill-neutral-300 dark:fill-neutral-600' : 'fill-txt-primary'} size-8 lg:size-10 rotate-180`} width="48"><path d="m367.384-480 301.308 301.308q11.923 11.923 11.615 28.077-.308 16.153-12.231 28.076-11.922 11.923-28.076 11.923t-28.076-11.923L305.078-428.77q-10.847-10.846-16.077-24.307-5.231-13.462-5.231-26.923 0-13.461 5.231-26.923 5.23-13.461 16.077-24.307l306.846-306.846q11.922-11.923 28.384-11.616 16.461.308 28.384 12.231 11.923 11.923 11.923 28.076 0 16.154-11.923 28.077L367.384-480Z"/></svg>
            </button>
        </div>
    )
}

function SliderPlaceholder({peek, itemsPerSlide}: {peek: number, itemsPerSlide: number}) {
    let peekPercent = peek * 100;
    let itemBasis = peek
        ? 100 / itemsPerSlide * (1 - peek)
        : 100 / itemsPerSlide;

    const [currentItem] = useState(Math.floor(9 / 2));

    return (
        <div className='flex w-full'>
            <button className='shrink-0 mr-6 lg:mr-12 cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" className='size-8 lg:size-10 fill-txt-primary' width="48"><path d="m367.384-480 301.308 301.308q11.923 11.923 11.615 28.077-.308 16.153-12.231 28.076-11.922 11.923-28.076 11.923t-28.076-11.923L305.078-428.77q-10.847-10.846-16.077-24.307-5.231-13.462-5.231-26.923 0-13.461 5.231-26.923 5.23-13.461 16.077-24.307l306.846-306.846q11.922-11.923 28.384-11.616 16.461.308 28.384 12.231 11.923 11.923 11.923 28.076 0 16.154-11.923 28.077L367.384-480Z"/></svg>
            </button>
            <div className='flex-1 overflow-hidden relative'>
                <div 
                    style={{
                        transform: `translateX(${-(currentItem * ((100 - peekPercent) / itemsPerSlide) - peekPercent / 2)}%)`, 
                        gap: '10px',
                        marginLeft: peek ? `${10}px` : 0,
                    }}
                    className={`flex transition-transform duration-500 ease-out`}>
                    {[...Array(9)].map((_, i) => 
                        <div key={i} style={{flexBasis: `calc(${itemBasis}% - ${10}px)`,}} className="loading h-[170px] shrink-0 rounded-xl"></div>
                    )}
                </div>
                {peek > 0 && <div className='absolute inset-0 slider-peek-gradient pointer-events-none'></div>}
            </div>
            <button className='shrink-0 ml-6 lg:ml-12 cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" className='size-8 lg:size-10 fill-txt-primary rotate-180' width="48"><path d="m367.384-480 301.308 301.308q11.923 11.923 11.615 28.077-.308 16.153-12.231 28.076-11.922 11.923-28.076 11.923t-28.076-11.923L305.078-428.77q-10.847-10.846-16.077-24.307-5.231-13.462-5.231-26.923 0-13.461 5.231-26.923 5.23-13.461 16.077-24.307l306.846-306.846q11.922-11.923 28.384-11.616 16.461.308 28.384 12.231 11.923 11.923 11.923 28.076 0 16.154-11.923 28.077L367.384-480Z"/></svg>
            </button>
        </div>
    )
}