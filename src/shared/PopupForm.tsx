import { useState, useEffect, type JSX } from "react";

import CtaButton from "./CtaButton";

const iconMap: Record<string, JSX.Element> = {
    'email': <svg className="size-5 fill-txt-primary" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M162.87-151.869q-37.783 0-64.392-26.609Q71.87-205.087 71.87-242.87v-474.26q0-37.783 26.61-64.392 26.608-26.609 64.391-26.609h634.26q37.783 0 64.392 26.609 26.609 26.609 26.609 64.392v474.26q0 37.783-26.609 64.392-26.609 26.609-64.392 26.609H162.87Zm634.26-477.848L504.109-444.869q-5.673 3.478-11.913 5.217-6.239 1.739-12.196 1.739t-12.196-1.739q-6.24-1.739-11.913-5.217L162.87-629.717v386.847h634.26v-386.847ZM480-517.13l317.13-200H162.87l317.13 200ZM162.87-629.717v10.956-63.934 1.111-35.546 35.587-.859 63.641-10.956 386.847-386.847Z"/></svg>,
    'password': <svg className="size-5 fill-txt-primary" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M720-240q25 0 42.5-17.5T780-300q0-25-17.5-42.5T720-360q-25 0-42.5 17.5T660-300q0 25 17.5 42.5T720-240Zm0 120q30 0 56-14t43-39q-23-14-48-20.5t-51-6.5q-26 0-51 6.5T621-173q17 25 43 39t56 14ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM490-80H240q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v52q-18-6-37.5-9t-42.5-3v-40H240v400h212q8 24 16 41.5T490-80Zm230 40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40ZM240-560v400-400Z"/></svg>,
    'card-number': <svg className="size-5 fill-txt-primary" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720Zm-720 80h640v-80H160v80Zm0 160v240h640v-240H160Zm0 240v-480 480Z"/></svg>,    
};

export type InputFieldType = 
    | 'text'
    | 'email' 
    | 'password' 
    | 'number' 
    | 'color'
    | 'date'
    | 'card-number' 
    | 'expiry-date'
    | 'cvv'


interface InputField {
    type: InputFieldType;
    width: 'half' | 'full';
    label: string;
    name: string;
    placeholder?: string;    
}
export type FormState = Record<InputFieldType, string> | null;
interface CustomFormProps {
    name: string;
    fields: InputField[];
    setForm: React.Dispatch<React.SetStateAction<FormState>>;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    buttonLabel?: string;
    children?: React.ReactNode;    
}
export default function CustomForm({name, fields, setForm, setIsOpen, buttonLabel="Submit", children}: CustomFormProps) {

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());        
        setForm((data as React.SetStateAction<FormState>));        
        setIsOpen(prev => !prev);
    }

    return (
        <form onSubmit={handleSubmit} className="fixed flex flex-col gap-3 p-5 z-20 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[clamp(300px,40vw,500px)] min-h-[200px] bg-[#f0f0f0] dark:bg-neutral-800 border border-neutral-500 rounded-lg">
            <h2 className="text-3xl font-semibold">{name}</h2>
            <div className="grid grid-cols-2 gap-3">
                {fields.map(({type, width, name, label, placeholder}, i) => 
                    <label key={i} className={`${width === 'half' ? 'col-span-1' : 'col-span-2'}`}>
                        <span className="text-neutral-600 dark:text-neutral-300">{label}</span>
                        <div className="relative w-full">
                            {iconMap[type] && 
                                <span className="absolute top-1/2 left-2 -translate-y-1/2 w-7 object-contain object-center">
                                    {iconMap[type]}
                                </span>
                            }
                            {['card-number', 'expiry-date', 'cvv'].includes(type)
                                ? <CustomInput type={type} width={width} name={name} label={label} placeholder={placeholder} />
                                : <input
                                    type={type}
                                    name={`${name}`}
                                    placeholder={placeholder}
                                    className={`${iconMap[type] && 'pl-8'} ${type === 'color' ? '' : 'px-2 py-1 bg-neutral-300 dark:bg-neutral-700'} w-full my-1 placeholder-neutral-400 rounded-md`}
                                />
                            }
                        </div>
                    </label>
                )}
            </div>
            {children}
            <CtaButton type='submit' customStyle={'mt-2'}>{buttonLabel}</CtaButton>
            <button onClick={() => setIsOpen(prev => !prev)} className="absolute top-5 right-5 size-8 rounded-[50%] flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-600 cursor-pointer">
                <svg className="fill-sakura" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-392 300-212q-18 18-44 18t-44-18q-18-18-18-44t18-44l180-180-180-180q-18-18-18-44t18-44q18-18 44-18t44 18l180 180 180-180q18-18 44-18t44 18q18 18 18 44t-18 44L568-480l180 180q18 18 18 44t-18 44q-18 18-44 18t-44-18L480-392Z"/></svg>
            </button>
        </form>
    )
}

export const detectCardType = (number: string): 'visa' | 'mastercard' | null => {    
    const cleaned = number.replace(/\D/g, "");
        if (/^4/.test(cleaned))
            return "visa";
        if (/^(5[1-5]|2[2-7])/.test(cleaned))
            return "mastercard";
        return null;
};

function CustomInput({type, name, placeholder}: InputField) {    
    const [cardNumber, setCardNumber] = useState<string>('');
    const [cardProvider, setCardProvider] = useState<'visa' | 'mastercard' | null>(null);

    useEffect(() => {
        setCardProvider(detectCardType(cardNumber));
    }, [cardNumber]);

    if (type === 'card-number')
        return (
        <>
            <input
                type="text"
                name={name}
                placeholder={placeholder}
                maxLength={19} // 16 digits + 3 spaces
                onChange={(e) => {
                    // 1. Remove all non-digits
                    const value = e.target.value.replace(/\D/g, '');

                    // 2. Limit to 16 digits
                    const limited = value.slice(0, 16);

                    // 3. Insert spaces every 4 digits
                    const formatted = limited.replace(/(\d{4})(?=\d)/g, '$1 ');

                    // 4. Update input value
                    e.target.value = formatted;
                    setCardNumber(e.target.value);
                }}
                className={`${iconMap[type] && 'pl-8'} w-full px-2 py-1 my-1 placeholder-neutral-400 bg-neutral-300 dark:bg-neutral-700 rounded-md`}
            />
            {cardProvider && <img src={cardProvider === 'visa' ? '/static/profilePage/images/VisaLogo.png' : '/static/profilePage/images/MastercardLogo.png'} className="absolute top-1/2 right-3 -translate-y-1/2 w-7 object-contain object-center" aria-hidden='true' alt={`Logo of ${cardProvider} provider`} />}
        </>
        )
    else if (type === 'expiry-date')
        return (
            <input
                type='text'
                name={`${name}`}
                maxLength={5}
                onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 4) {
                        const formatted = value.replace(/(\d{2})(\d{0,2})/, (_, m, y) => (y ? `${m}/${y}` : m));
                        e.target.value = formatted;
                    }
                }}
                placeholder={placeholder}
                className={`${iconMap[type] && 'pl-8'} w-full px-2 py-1 my-1 placeholder-neutral-400 bg-neutral-300 dark:bg-neutral-700 rounded-md`}
            />
        )
    else if (type === 'cvv')
        return (
            <input
                type="text"
                name={name}                
                onChange={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
                }}
                placeholder={placeholder}
                className={`${iconMap[type] && 'pl-8'} w-full px-2 py-1 my-1 placeholder-neutral-400 bg-neutral-300 dark:bg-neutral-700 rounded-md`}
            />
        )
    else return null;
}