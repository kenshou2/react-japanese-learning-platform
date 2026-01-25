import { useState, useEffect, useCallback, useRef } from "react";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import type { CourseDetail } from "../../../types/CourseDetail";

interface Filter {
  label: string;
  options: string[];
  type: "radio" | "checkbox";
  expanded: boolean;
}

const FILTERS_DATA: Filter[] = [
  {
    label: "JLPT level",
    options: ["JLPT N5", "JLPT N4", "JLPT N3", "JLPT N2", "JLPT N1"],
    type: "radio",
    expanded: true,
  },
  {
    label: "Learning goals",
    options: ["Reading", "Listening", "Writing", "Speaking", "Exam prep"],
    type: "checkbox",
    expanded: true,
  },
  {
    label: "Topic",
    options: ["Travel", "Business / Work", "Cooking", "Casual conversation", "Health"],
    type: "checkbox",
    expanded: false,
  },      
];
interface FilterProps {
  setSearchResults: (result: any[]) => void;
  isLoading: boolean;
  data: any[];
  filterOpen?: boolean;
  handleOpen?: (open: boolean) => void;
}
export default function Filter({filterOpen, data, setSearchResults, handleOpen}: FilterProps) {
    const [totalRange] = useState({min: 0, max: 100});
    const [currentRange, setCurrentRange] = useState({
      min: totalRange.min + (totalRange.max - totalRange.min) * 0.05,
      max: totalRange.max - (totalRange.max - totalRange.min) * 0.05,
    });    
    const [filters, setFilters] = useState(FILTERS_DATA);
    const [isOpen] = useState(filterOpen);
    const isLargeScreen = useMediaQuery("(min-width: 1025px)");
    
    const mobileStyle = "fixed mx-auto inset-[15%] z-40 bg-bg-primary max-w-[500px] overflow-y-scroll";

    function handleExpand(index: number) {
      setFilters(prev => prev.map((filter, i) => i === index ? {...filter, expanded: !filter.expanded} : filter));
    }
    
    function applyFilters(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const entries = Array.from(formData.entries()).reduce((acc, [key, value]) => {
        if (!acc[key]) acc[key] = [];
        acc[key].push(value as string);
        return acc;
    }, {} as Record<string, string[]>);

    let filtered = data as CourseDetail[];

    // Filter by JLPT level
    if (entries['JLPT level-option']?.length) {
        filtered = filtered.filter(course => {
            return entries['JLPT level-option'].some(val => {
                const normalized = val.toLowerCase().replace(/^jlpt\s*/, '');
                return course.jlptLevel === normalized;
            });
        });
    }    

    // Filter by Learning goals
    if (entries['Learning goals-option']?.length) {
        filtered = filtered.filter(course => {
            return entries['Learning goals-option'].some(val => {
                const normalized = val.toLowerCase().replace(/\s+/g, '');
                return course.goals.map(g => g.toLowerCase()).includes(normalized as any);
            });
        });
    }    

    // Filter by Topic
    if (entries['Topic-option']?.length) {
        filtered = filtered.filter(course => {
            return entries['Topic-option'].some(val => {
                const normalized = val.toLowerCase().replace(/\s+|\/+/g, '');
                const courseTopic = course.topic.toLowerCase().replace(/\s+|\/+/g, '');
                return normalized === courseTopic;
            });
        });
    }

    // Filter by course duration
    filtered = filtered.filter(course =>
        course.duration >= currentRange.min && course.duration <= currentRange.max
    );
        
    setSearchResults([...filtered]);
    handleOpen?.(false); // close filter if needed
}


    function resetCustomFilters() {
      setCurrentRange({
        min: totalRange.min + (totalRange.max - totalRange.min) * 0.05,
        max: totalRange.max - (totalRange.max - totalRange.min) * 0.05
      });
    }
    
    return (                      
        <aside className={`${!isLargeScreen ? mobileStyle : ''}`}>          
          <form onSubmit={applyFilters} aria-label="search result filters" className={`${!isLargeScreen ? mobileStyle : ''} h-auto px-1 pb-3 border-2 rounded-md border-neutral-300 dark:border-neutral-600 *:border-b-2 *:border-neutral-300 *:py-3 *:px-2`}>
            <div className="flex items-center justify-between sticky top-0 bg-bg-primary z-20">
              <h2 className="font-bold text-lg">Filters</h2>
              {filterOpen &&
                <button onClick={() => handleOpen ? handleOpen(false) : null} type="button" aria-label='Clear current query' className="p-2">
                  <svg xmlns="http://www.w3.org/2000/svg"
                  className='bg-sakura rounded-md fill-txt-primary size-7 cursor-pointer' height="24" viewBox="0 -960 960 960" width="24"><path d="M480-392 300-212q-18 18-44 18t-44-18q-18-18-18-44t18-44l180-180-180-180q-18-18-18-44t18-44q18-18 44-18t44 18l180 180 180-180q18-18 44-18t44 18q18 18 18 44t-18 44L568-480l180 180q18 18 18 44t-18 44q-18 18-44 18t-44-18L480-392Z"/></svg>
                </button>
              }
            </div>
            {filters.map(({label, options, type, expanded}, i) => 
              <div className="flex flex-col">
                <div onClick={() => handleExpand(i)} aria-label="Filter section" className="flex justify-between items-center cursor-pointer">
                  <h3 className="font-bold text-sm">{label}</h3>
                  <svg className="-rotate-90 fill-blue-600 dark:fill-blue-400 size-5" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m367.384-480 301.308 301.308q11.923 11.923 11.615 28.077-.308 16.153-12.231 28.076-11.922 11.923-28.076 11.923t-28.076-11.923L305.078-428.77q-10.847-10.846-16.077-24.307-5.231-13.462-5.231-26.923 0-13.461 5.231-26.923 5.23-13.461 16.077-24.307l306.846-306.846q11.922-11.923 28.384-11.616 16.461.308 28.384 12.231 11.923 11.923 11.923 28.076 0 16.154-11.923 28.077L367.384-480Z"/></svg>
                </div>
                <div className={`grid ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} transition-all duration-300`}>
                  <div className="overflow-hidden">
                    <div className="mt-3 grid grid-cols-2 gap-2 items-start text-sm">
                      {options.map((option, i) =>
                        <label className="items-start">
                          <input type={`${type}`} name={`${label}-option`} value={option} id={`${label}-option-${i}`} />
                          {option}
                        </label>                                         
                      )}
                    </div>
                  </div>
                </div>
              </div>            
            )}
            <div className="flex flex-col">
              <div aria-label="Filter section" className="flex">
                <h3 className="font-bold text-sm">Course duration</h3>                
              </div>
              <div className="mt-4 text-sm">
                <div className="flex justify-between">                  
                  <div className="flex gap-1 items-center w-[40%] h-10 border-2 px-1 py-1 border-neutral-400 rounded-md font-bold">
                    <svg className="fill-neutral-400" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M520-496v-144q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640v159q0 8 3 15.5t9 13.5l132 132q11 11 28 11t28-11q11-11 11-28t-11-28L520-496ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
                    <span>{currentRange.min}</span>
                  </div>                                                                                                                                      
                  <div className="flex gap-1 items-center w-[40%] h-10 border-2 px-1 py-1 border-neutral-400 rounded-md font-bold">
                    <svg className="fill-neutral-400" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M520-496v-144q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640v159q0 8 3 15.5t9 13.5l132 132q11 11 28 11t28-11q11-11 11-28t-11-28L520-496ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
                    <span>{currentRange.max}</span>
                  </div>                                                                                                                                                                                                  
                </div>
                <div className="mt-6 mb-4">
                  <DoubleRangeSlider min={totalRange.min} max={totalRange.max} value={currentRange} onChange={setCurrentRange} />
                </div>
              </div>
            </div>            
            <div className="flex justify-between gap-2 border-none p-0">
              <button type='reset' onClick={() => resetCustomFilters()} className="flex-1 px-2 py-[6px] border-2 border-sakura text-sakura rounded-sm cursor-pointer">Reset</button>
              {isOpen && <button type='button' onClick={() => handleOpen ? handleOpen(false) : null} className="flex-1 px-2 py-[6px] border-2 border-sakura text-sakura rounded-sm cursor-pointer">Close</button>}
              <button type='submit' className="flex-1 px-2 py-[6px] bg-btn-primary text-[#F4F4F4] rounded-sm cursor-pointer">Apply</button>
            </div>
          </form>
        </aside>
    )
}

interface DoubleRangeSliderProps {
  min: number;
  max: number;
  value: {min: number; max: number};
  onChange: (val: {min: number; max: number}) => void;
  trackColor?: string;
  rangeColor?: string;
  width?: string;
}

function DoubleRangeSlider({
  min,
  max,
  value,
  onChange,
  trackColor = "#F6C8D0",
  rangeColor = "#E97488",
  width = "100%"
}: DoubleRangeSliderProps) {
  const range = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (val: number) => Math.round(((val - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    if (!range.current) return;
    const minPercent = getPercent(value.min);
    const maxPercent = getPercent(value.max);
    range.current.style.left = `${minPercent}%`;
    range.current.style.width = `${maxPercent - minPercent}%`;
  }, [value, getPercent]);

  return (
    <div className="w-full flex flex-col justify-center items-center">    
      <div className="price-range-slider relative" style={{width}}>
        <input
          type="range"
          min={min}
          max={max}
          value={value.min}
          onChange={(e) =>
            onChange({
              min: Math.min(Number(e.target.value), value.max - 1),
              max: value.max
            })
          }
          className="thumb thumb-left absolute w-full z-30"
        />

        <input
          type="range"
          min={min}
          max={max}
          value={value.max}
          onChange={(e) =>
            onChange({
              min: value.min,
              max: Math.max(Number(e.target.value), value.min + 1)
            })
          }
          className="thumb thumb-right absolute w-full z-20"
        />

        <div className="slider relative h-[6px] rounded">
          <div
            className="track absolute w-full h-[6px] rounded z-10"
            style={{backgroundColor: trackColor}}
          />
          <div
            ref={range}
            className="range absolute h-[6px] rounded z-20"
            style={{backgroundColor: rangeColor}}
          />
        </div>
      </div>
    </div>
  );
}