import { useEffect, useState } from "react";
import SelectForm from "../../../shared/SelectForm";

export default function LanguageAndInterface() {
    const fontSizeOptions = ['16px', '18px', '22px', '24px'];
    const themeOptions = ['dark', 'light'];
    const [currentFontSize, setCurrentFontSize] = useState<string | null>(fontSizeOptions[0]);
    const [currentTheme, setCurrentTheme] = useState<string | null>(document.documentElement.classList.contains('light') ? 'light' : 'dark');
    
    useEffect(() => {
        if (currentFontSize)
            document.body.style.fontSize = currentFontSize;
    }, [currentFontSize]);

    useEffect(() => {
        if (currentTheme === 'dark') {
            setCurrentTheme('dark');
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
        } else if (currentTheme === 'light') {
            setCurrentTheme('light');
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        }        
    }, [currentTheme])
    

    return (
        <div className='flex flex-col gap-5'>            
            <div className="flex flex-col gap-5">
                <h2 className='text-2xl font-semibold'>Base font size</h2>
                <div className="flex flex-col sm:flex-row gap-5 *:flex-1">
                    <div className="max-w-[150px]">
                        <SelectForm
                            selectOptions={fontSizeOptions}
                            current={currentFontSize}
                            setCurrent={setCurrentFontSize}
                            >
                        </SelectForm>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-3 text-neutral-500 dark:neutral-400">Preview</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, alias magnam expedita nihil in tempora impedit doloremque corrupti illo optio aliquid dignissimos delectus nobis minima debitis. Soluta quidem beatae nam!</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <h2 className='text-2xl font-semibold'>Website theme</h2>                
                <div className="max-w-[150px]">
                    <SelectForm
                        selectOptions={themeOptions}
                        current={currentTheme}
                        setCurrent={setCurrentTheme}
                        >
                    </SelectForm>
                </div>                
            </div>
        </div>
    )
}