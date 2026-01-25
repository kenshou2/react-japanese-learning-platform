import { useEffect, useState } from "react";
import useDeviceType from "../../../hooks/useDeviceType"
import CtaButton from "../../../shared/CtaButton";
import { useActiveUser } from "../../../context/ActiveUserContext";
import { type PaymentMethod } from "../../../types/UserSubscription";

import Tooltip from "../../../shared/Tooltip";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import PopupForm, { type FormState } from "../../../shared/PopupForm";
import { detectCardType } from "../../../shared/PopupForm";
import { useUpdateUserAccount, useUser } from "../../../features/users/hooks/useUser";
import { Link } from "react-router";
import Popup from "../../../shared/Popup";

export default function PaymentMethod() {
    const deviceType = useDeviceType();
    const {activeUserId: uid} = useActiveUser();
    const { data: user, isLoading, isError } = useUser(uid);
    const updateAccount = useUpdateUserAccount();
    const paymentMethods = user?.account.paymentMethods;
    const [selectMode, setSelectMode] = useState(false);
    const [selectedCards, setSelectedCards] = useState<Set<number>>(new Set());
    const [addCardOpen, setAddCardOpen] = useState(false);
    const [newCard, setNewCard] = useState<FormState | null>(null);

    function handleCardSelect(id: number) {
        if (!selectMode)
            return;
        setSelectedCards(prev => {
            const newSet = new Set(prev);
            prev.has(id) ? newSet.delete(id) : newSet.add(id);
            return newSet;
        });
    }

    function removeCards() {
        if (selectedCards.size === 0)
            return;        
        const newPaymentMethods = user?.account.paymentMethods.filter(p => !selectedCards.has(p.id));
        updateAccount.mutate({id: uid, updates: {paymentMethods: newPaymentMethods}});
        setSelectedCards(new Set());
    }

    useEffect(() => {
        if (!newCard || !paymentMethods) return;
        const newCreatedCard = {
            id: paymentMethods[paymentMethods.length-1].id + 1,
            cardNumber: `**** **** **** ${newCard['card-number'].slice(newCard['card-number'].length-5, newCard['card-number'].length)}`,
            provider: detectCardType(newCard['card-number']),
            isDefault: false,
            cardColor: newCard['color'],
        }
        updateAccount.mutate({id: uid, updates: { paymentMethods: [...user.account.paymentMethods, newCreatedCard] }})        
    }, [newCard]);

    if (isError)
        return <div className="font-semibold">Couln't load your payment methods, please try again later. <Link to='/' className="font-bold underline text-neutral-400">Contact support</Link></div>
    
    return (
        <div>
            <div className="flex flex-col gap-5">
                <Popup isOpen={addCardOpen} onClose={() => setAddCardOpen(false)} customStyles="absolute">
                    <PopupForm
                        name="Card details"
                        fields={[
                            { type: 'card-number', width: 'full', name: "card-number", label: 'Card number', placeholder: "1234 1234 1234 1234", },
                            { type: 'text', width: 'full', name: "cardholder-name", label: 'Cardholder name', placeholder: "John Doe", },
                            { type: 'cvv', width: 'half', name: "cvv", label: 'CVV/CVC', placeholder: "123", },
                            { type: 'expiry-date', width: 'half', name: "expiry-date", label: 'Expiration date', placeholder: "MM / YY", },
                            { type: 'color', width: 'half', name: "color", label: 'Preferred color', },
                        ]}
                        setForm={setNewCard}
                        setIsOpen={setAddCardOpen}
                        buttonLabel="Add"
                        >
                    </PopupForm>
                </Popup>                
                <div className="flex gap-3">
                    <CtaButton onClick={() => setAddCardOpen(!addCardOpen)} borderRadius="5" fontSize='12' padX='6' padY='3' customStyle="min-w-[70px]">Add</CtaButton>
                    <CtaButton onClick={() => {
                        setSelectMode(!selectMode);
                        setSelectedCards(new Set());
                    }} borderRadius="5" fontSize='12' padX='6' padY='3' customStyle="min-w-[70px] bg-transparent border-2 border-sakura text-txt-primary">{selectMode ? 'Cancel' : 'Select'}</CtaButton>
                    {selectMode && 
                        <button 
                            onClick={() => removeCards()}
                            className="sm:ml-auto cursor-pointer">
                            <svg className="fill-txt-primary h-full" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                        </button>
                    }
                </div>
                {deviceType === 'mouse'
                    ? <ComputerLayout                         
                        paymentMethods={paymentMethods ?? []} 
                        selectMode={selectMode}
                        selectedCards={selectedCards}
                        handleCardSelect={handleCardSelect}
                        isLoading={isLoading}                        
                    />
                    : <TouchscreenLayout 
                        paymentMethods={paymentMethods ?? []} 
                        selectMode={selectMode}
                        selectedCards={selectedCards}
                        handleCardSelect={handleCardSelect}
                        isLoading={isLoading}                        
                    />
                }            
            </div>
        </div>
    )
}

interface LayoutProps {
    paymentMethods: PaymentMethod[];
    selectMode: boolean;
    selectedCards: Set<number>;    
    handleCardSelect: (id: number) => void;
    isLoading: boolean;    
}
function ComputerLayout({paymentMethods, selectMode, selectedCards, handleCardSelect, isLoading}: LayoutProps) {    
    return (
        <div className="flex flex-col gap-5">            
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] min-[970px]:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
                { isLoading
                 ? [...Array(4)].map((_, i) => <div key={i} className="loading aspect-[2/1.2] rounded-lg"></div>)                 
                 : paymentMethods.map(({id, cardNumber, provider, isDefault, cardColor}) =>
                        <div className="flex flex-col gap-2 aspect-[2/1.2]">
                            <div
                                key={id}
                                onClick={() => {!isDefault && handleCardSelect(id)}}    
                                style={{backgroundColor: cardColor ?? 'var(--bg-secondary)'}}
                                className={`
                                    relative group flex flex-col justify-between h-full
                                    ${!isDefault && selectMode ? 'cursor-pointer' : ''} 
                                    ${selectedCards.has(id) && !isDefault && selectMode ? 'outline-2 outline-btn-primary dark:outline-sakura outline-offset-5' : ''}                                
                                    p-3 rounded-[9px] dark:border dark:border-neutral-500`}>
                                <span className="text-2xl font-bold text-white">{cardNumber}</span>
                                {provider && 
                                    <img 
                                        className="self-end w-[clamp(40px,5vw,50px)]" 
                                        src={provider === 'visa' ? '/static/profilePage/images/VisaLogo.png' : '/static/profilePage/images/MastercardLogo.png'} 
                                        alt={provider === 'visa' ? 'visa logo' : 'mastercard logo'} />
                                }
                                {(selectMode && isDefault) && <Tooltip>You cannot remove the default payment method</Tooltip>}
                                <div className="-z-1 absolute inset-[-1.5px_-0.8px_0px_-1.5px] bg-[#b5b5b5] rounded-lg"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/30 to-transparent mix-blend-overlay pointer-events-none rounded-[9px]" />
                            </div>
                            {isDefault && <div className="text-center text-xl font-semibold text-neutral-600 dark:text-neutral-400">Default</div>}
                        </div>
                    )
                }
            </div>            
        </div>
    )
}

function TouchscreenLayout({paymentMethods, selectMode, selectedCards, handleCardSelect, isLoading}: LayoutProps) {
    const isLargeTouchScreen = useMediaQuery("(min-width: 430px)");
    const width = isLargeTouchScreen ? 300 : 250;
    const height = isLargeTouchScreen ? 200 : 166;
    
    return (
        <div style={{width: `${width}px`, height: `${height+50}px`}} className={`overflow-y-scroll overflow-x-hidden p-2`}>
            <div style={{height: `${(paymentMethods.length)*(height+12+10)}px`}} className="flex flex-col gap-3"> {/* formula: height = n_items * (item_height + flex_gap + top_position_offset) */}
                { isLoading
                 ? [...Array(4)].map((_, i) => 
                    <div 
                        key={i} 
                        style={{top: `${i*10}px`, transform: `translateX(${i*2}px)`, height: `${height}px`}} 
                        className="sticky flex flex-col gap-2 loading rounded-[9px] outline outline-txt-primary">                        
                    </div>)                 
                 : paymentMethods.map(({id, cardNumber, provider, isDefault, cardColor}, i) =>
                        <div 
                            style={{top: `${i*10}px`, transform: `translateX(${i*2}px)`, height: `${height}px`}} 
                            className="sticky flex flex-col gap-2">
                            <div
                                key={id}
                                onClick={() => {!isDefault && handleCardSelect(id)}}
                                style={{backgroundColor: cardColor ?? 'var(--bg-secondary)'}}
                                className={`
                                    relative group flex flex-col justify-between h-full
                                    ${!isDefault && selectMode ? 'cursor-pointer' : ''}
                                    ${selectedCards.has(id) && !isDefault && selectMode ? 'outline-2 outline-btn-primary dark:outline-sakura outline-offset-5' : ''}
                                    p-3 rounded-[9px] dark:border dark:border-neutral-500`}>
                                <span className="text-2xl font-bold text-white">{cardNumber}</span>
                                <div className="flex justify-between">
                                    {isDefault ? <div className="font-semibold text-lg text-btn-primary">Default</div> : <div></div>}
                                    <img 
                                        className="w-[clamp(40px,5vw,50px)] object-contain object-center" 
                                        src={provider === 'visa' ? '/static/profilePage/images/VisaLogo.png' : '/static/profilePage/images/MastercardLogo.png'}
                                        alt={provider === 'visa' ? 'visa logo' : 'mastercard logo'} />
                                </div>
                                <div className="-z-1 absolute inset-[-1.5px_-0.8px_0px_-1.5px] bg-[#b5b5b5] rounded-lg"></div>
                                {(selectMode && isDefault) && <Tooltip>You cannot remove the default payment method</Tooltip>}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/30 to-transparent mix-blend-overlay pointer-events-none rounded-[9px]" />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}