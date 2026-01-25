import { useEffect, useRef, useState } from "react";

import Profile from "./components/Profile/Profile";
import Account from "./components/Account";
import LanguageAndInterface from "./components/LanguageAndInterface";
import CurrentPlan from "./components/CurrentPlan";
import PaymentMethod from "./components/PaymentMethods";
import BillingDetails from "./components/BillingDetails";
import CancelSubscription from "./components/CancelSubscription";
import PasswordAndLogin from "./components/PasswordAndLogin";
import ActiveSessions from "./components/ActiveSessions";
import DataPrivacy from "./components/DataPrivacy";
import DeleteAccount from "./components/DeleteAccount";
import FAQ from "./components/FAQ";
import ContactSupport from "./components/ContactSupport";
import { FadeSwap } from "./components/FadeSwap";
import useDeviceType from "../../hooks/useDeviceType";
import AgreementPopup from "../../shared/AgreementPopup";
import Popup from "../../shared/Popup";

let tabId = 0;

interface Setting {
    sectionName: string;
    tabs: Tab[];
};

type IconKey = keyof typeof iconMap;
interface Tab<P = any> {
    id: number;
    name: string;
    icon?: IconKey;
    component: React.ComponentType<P>;
}

const iconMap = {
    "profile": <svg className="size-[14px] fill-txt-primary shrink-0" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>,
    "account": <svg className="size-[14px] fill-txt-primary shrink-0" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18h14q6 0 12 2-8 18-13.5 37.5T404-360h-4q-71 0-127.5 18T180-306q-9 5-14.5 14t-5.5 20v32h252q6 21 16 41.5t22 38.5H80Zm560 40-12-60q-12-5-22.5-10.5T584-204l-58 18-40-68 46-40q-2-14-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T628-460l12-60h80l12 60q12 5 22.5 11t21.5 15l58-20 40 70-46 40q2 12 2 25t-2 25l46 40-40 68-58-18q-11 8-21.5 13.5T732-180l-12 60h-80Zm40-120q33 0 56.5-23.5T760-320q0-33-23.5-56.5T680-400q-33 0-56.5 23.5T600-320q0 33 23.5 56.5T680-240ZM400-560q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Zm12 400Z"/></svg>,
    "language-interface": <svg className="size-[14px] fill-txt-primary shrink-0" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z"/></svg>,
    "current-plan": <svg className="size-[14px] fill-txt-primary shrink-0" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm40-40h400L400-680H200v400Zm320-320h240v-80H520v80ZM160-240v-480 480Z"/></svg>,
    "payment-methods": <svg className="size-[14px] fill-txt-primary shrink-0" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-240v-320 13-173 480Zm0-400h640v-80H160v80Zm303 480H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v213q-35-25-76.5-39T716-560q-57 0-107.5 21.5T520-480H160v240h279q3 21 9 41t15 39Zm213 80-12-60q-12-5-22.5-10.5T620-164l-58 18-40-68 46-40q-2-13-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T664-420l12-60h80l12 60q12 5 22.5 10.5T812-396l58-18 40 68-46 40q2 13 2 26t-2 26l46 40-40 68-58-18q-11 8-21.5 13.5T768-140l-12 60h-80Zm40-120q33 0 56.5-23.5T796-280q0-33-23.5-56.5T716-360q-33 0-56.5 23.5T636-280q0 33 23.5 56.5T716-200Z"/></svg>,
    "billing-details": <svg className="size-[14px] fill-txt-primary shrink-0" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-507h560v-133H200v133Zm0 214h560v-134H200v134Zm0 213h560v-133H200v133Zm40-454v-80h80v80h-80Zm0 214v-80h80v80h-80Zm0 214v-80h80v80h-80Z"/></svg>,
    "cancel-subscription": <svg className="size-[14px] fill-txt-primary shrink-0" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q54 0 104-17.5t92-50.5L228-676q-33 42-50.5 92T160-480q0 134 93 227t227 93Zm252-124q33-42 50.5-92T800-480q0-134-93-227t-227-93q-54 0-104 17.5T284-732l448 448ZM480-480Z"/></svg>,
    "password-login": <svg className="size-[14px] fill-txt-primary shrink-0" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M720-240q25 0 42.5-17.5T780-300q0-25-17.5-42.5T720-360q-25 0-42.5 17.5T660-300q0 25 17.5 42.5T720-240Zm0 120q30 0 56-14t43-39q-23-14-48-20.5t-51-6.5q-26 0-51 6.5T621-173q17 25 43 39t56 14ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM490-80H240q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v52q-18-6-37.5-9t-42.5-3v-40H240v400h212q8 24 16 41.5T490-80Zm230 40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40ZM240-560v400-400Z"/></svg>,
    "active-sessions": <svg className="size-[14px] fill-txt-primary shrink-0" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-540ZM80-160v-80h400v80H80Zm120-120q-33 0-56.5-23.5T120-360v-360q0-33 23.5-56.5T200-800h560q33 0 56.5 23.5T840-720H200v360h280v80H200Zm600 40v-320H640v320h160Zm-180 80q-25 0-42.5-17.5T560-220v-360q0-25 17.5-42.5T620-640h200q25 0 42.5 17.5T880-580v360q0 25-17.5 42.5T820-160H620Zm100-300q13 0 21.5-9t8.5-21q0-13-8.5-21.5T720-520q-12 0-21 8.5t-9 21.5q0 12 9 21t21 9Zm0 60Z"/></svg>,
    "data-privacy": <svg className="size-[14px] fill-txt-primary shrink-0" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M680-280q25 0 42.5-17.5T740-340q0-25-17.5-42.5T680-400q-25 0-42.5 17.5T620-340q0 25 17.5 42.5T680-280Zm0 120q31 0 57-14.5t42-38.5q-22-13-47-20t-52-7q-27 0-52 7t-47 20q16 24 42 38.5t57 14.5ZM480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v227q-19-8-39-14.5t-41-9.5v-147l-240-90-240 90v188q0 47 12.5 94t35 89.5Q310-290 342-254t71 60q11 32 29 61t41 52q-1 0-1.5.5t-1.5.5Zm200 0q-83 0-141.5-58.5T480-280q0-83 58.5-141.5T680-480q83 0 141.5 58.5T880-280q0 83-58.5 141.5T680-80ZM480-494Z"/></svg>,
    "delete-account": <svg className="size-[14px] fill-txt-primary shrink-0" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m696-440-56-56 83-84-83-83 56-57 84 84 83-84 57 57-84 83 84 84-57 56-83-83-84 83Zm-336-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/></svg>,
    "faq": <svg className="size-[14px] fill-txt-primary shrink-0" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-40q-112 0-206-51T120-227v107H40v-240h240v80h-99q48 72 126.5 116T480-120q75 0 140.5-28.5t114-77q48.5-48.5 77-114T840-480h80q0 91-34.5 171T791-169q-60 60-140 94.5T480-40ZM40-480q0-91 34.5-171T169-791q60-60 140-94.5T480-920q112 0 206 51t154 136v-107h80v240H680v-80h99q-48-72-126.5-116T480-840q-75 0-140.5 28.5t-114 77q-48.5 48.5-77 114T120-480H40Zm440 240q21 0 35.5-14.5T530-290q0-21-14.5-36T480-341q-21 0-35.5 14.5T430-291q0 21 14.5 36t35.5 15Zm-36-152h73q0-36 8.5-54t34.5-44q35-35 46.5-56.5T618-598q0-56-40-89t-98-33q-50 0-86 26t-52 74l66 28q7-26 26.5-43t45.5-17q27 0 45.5 15.5T544-595q0 17-8 34t-34 40q-33 29-45.5 56.5T444-392Z"/></svg>,
    "contact-support": <svg className="size-[14px] fill-txt-primary shrink-0" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m480-80-10-120h-10q-142 0-241-99t-99-241q0-142 99-241t241-99q71 0 132.5 26.5t108 73q46.5 46.5 73 108T800-540q0 75-24.5 144t-67 128q-42.5 59-101 107T480-80Zm80-146q71-60 115.5-140.5T720-540q0-109-75.5-184.5T460-800q-109 0-184.5 75.5T200-540q0 109 75.5 184.5T460-280h100v54Zm-101-95q17 0 29-12t12-29q0-17-12-29t-29-12q-17 0-29 12t-12 29q0 17 12 29t29 12Zm-29-127h60q0-30 6-42t38-44q18-18 30-39t12-45q0-51-34.5-76.5T460-720q-44 0-74 24.5T344-636l56 22q5-17 19-33.5t41-16.5q27 0 40.5 15t13.5 33q0 17-10 30.5T480-558q-35 30-42.5 47.5T430-448Zm30-65Z"/></svg>,
    "log-out": <svg className="size-[14px] fill-txt-primary shrink-0" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M509.615-140.001q-12.769 0-21.384-8.616-8.616-8.615-8.616-21.384t8.616-21.384Q496.846-200 509.615-200h238.076q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463v-535.382q0-4.616-3.846-8.463-3.847-3.846-8.463-3.846H509.615q-12.769 0-21.384-8.615-8.616-8.615-8.616-21.384t8.616-21.384q8.615-8.616 21.384-8.616h238.076q30.308 0 51.308 21t21 51.308v535.382q0 30.308-21 51.308t-51.308 21H509.615Zm-28.382-310H170.001q-12.769 0-21.384-8.615-8.616-8.615-8.616-21.384t8.616-21.384q8.615-8.615 21.384-8.615h311.232l-76.923-76.923q-8.307-8.308-8.5-20.269-.192-11.961 8.5-21.269 8.692-9.307 21.076-9.615 12.385-.308 21.692 9l123.768 123.768q10.846 10.846 10.846 25.307 0 14.461-10.846 25.307L447.078-330.925q-8.923 8.923-21.192 8.808-12.268-.116-21.576-9.423-8.692-9.308-8.384-21.384.307-12.077 8.999-20.769l76.308-76.308Z"/></svg>,
} as const;

const SETTINGS: Setting[] = [
    {
        sectionName: "General",
        tabs: [
            {
                id: tabId++,
                name: "Profile",
                icon: "profile",
                component: Profile,
            },
        ],
    },
    {
        sectionName: "Settings",
        tabs: [
            {
                id: tabId++,
                name: "Account",
                icon: "account",
                component: Account,
            },
            {
                id: tabId++,
                name: "Language & Interface",
                icon: "language-interface",
                component: LanguageAndInterface,
            },            
        ],
    },
    {
        sectionName: "Subscription / Billing",
        tabs: [
            {
                id: tabId++,
                name: "Current plan",
                icon: "current-plan",
                component: CurrentPlan,
            },
            {
                id: tabId++,
                name: "Payment methods",
                icon: "payment-methods",
                component: PaymentMethod,
            },
            {
                id: tabId++,
                name: "Billing details",
                icon: "billing-details",
                component: BillingDetails,
            },
            {
                id: tabId++,
                name: "Cancel subscription",
                icon: "cancel-subscription",
                component: CancelSubscription,
            },
        ],
    },
    {
        sectionName: "Privacy & Security",
        tabs: [
            {
                id: tabId++,
                name: "Password & Login",
                icon: "password-login",
                component: PasswordAndLogin,
            },
            {
                id: tabId++,
                name: "Active sessions",
                icon: "active-sessions",
                component: ActiveSessions,
            },
            {
                id: tabId++,
                name: "Data privacy",
                icon: "data-privacy",
                component: DataPrivacy,
            },
            {
                id: tabId++,
                name: "Delete account",
                icon: "delete-account",
                component: DeleteAccount,
            },
        ],
    },
    {
        sectionName: "Help",
        tabs: [
            {
                id: tabId++,
                name: "FAQ",
                icon: "faq",
                component: FAQ,
            },
            {
                id: tabId++,
                name: "Contact support",
                icon: "contact-support",
                component: ContactSupport,
            },
        ],
    },
];

export default function UserSettings() {    
    const [currentTab, setCurrentTab] = useState<number>(SETTINGS[0].tabs[0].id);
    const [currentTabName, setCurrentTabName] = useState<string>(SETTINGS[0].tabs[0].name);
    const deviceType = useDeviceType();
    const [menuOpen, setMenuOpen] = useState(deviceType === 'mouse' ? true : false);
    const ActiveTab = SETTINGS.flatMap(s => s.tabs).find(t => t.id === currentTab)?.component;
    
    return (
        <div className="py-[5%] flex justify-center overflow-hidden">            
            <div className="w-[90vw] sm:w-[80vw] grid grid-cols-[max-content_1fr]">
                <div></div>
                <h2
                    key={currentTab}
                    style={{
                        opacity: 0,
                        animation: "fadeIn 120ms ease-in-out forwards",
                        animationDelay: '120ms',
                    }}
                    className="ml-10 sm:ml-20 text-xl sm:text-4xl font-bold mb-7 whitespace-nowrap">
                    {currentTabName}
                </h2>
                <SettingsMenu tabId={currentTab} isOpen={menuOpen} setIsOpen={setMenuOpen} setCurrentTab={setCurrentTab} setCurrentTabName={setCurrentTabName}/>
                <section className="ml-10 sm:ml-20 max-w-[800px]">
                    {ActiveTab ? (
                        <FadeSwap triggerKey={currentTab}>
                            <ActiveTab />
                        </FadeSwap>
                    ) : null}
                </section>
            </div>            
        </div>
    )
}


interface SettingsMenuProps {
    tabId: number;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
    setCurrentTabName: React.Dispatch<React.SetStateAction<string>>;
}
function SettingsMenu({tabId, isOpen, setIsOpen, setCurrentTab, setCurrentTabName}: SettingsMenuProps) {
    const deviceType = useDeviceType();
    const [logoutAgreed, setLogoutAgreed] = useState<boolean | null>(null);
    const [logoutPopupShown, setLogoutPopupShown] = useState(false);

    const logoutButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {        
        if (logoutAgreed === false) {            
            setLogoutPopupShown(false);
            setLogoutAgreed(null);
            return;
        }

        if (logoutAgreed) {            
            setLogoutPopupShown(false);
            setLogoutAgreed(null);
        }
    }, [logoutAgreed, logoutAgreed])

    return (
        <aside className="self-start flex flex-col gap-3 text-sm border-1 border-txt-primary p-2 sm:border-none sm:p-0 rounded-lg">
            {deviceType === 'touch' &&
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="self-end hover:bg-neutral-300 hover:dark:bg-neutral-600 p-1 rounded-md cursor-pointer">                                                
                    <svg className="size-[14px] fill-txt-primary shrink-0" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm120-80v-560H200v560h120Zm80 0h360v-560H400v560Zm-80 0H200h120Z"/></svg>
                </button>
            }
            {SETTINGS.map(({sectionName, tabs}, i) =>
                <div key={i} className="flex flex-col gap-1">
                    <div className={`${isOpen ? 'grid-cols-[1fr]' : 'grid-cols-[0fr]'} grid transition-[grid-template-columns] duration-300`}>                        
                        <h3 className="overflow-hidden whitespace-nowrap text-neutral-500 dark:text-[#8d8d8d]">{sectionName}</h3>
                    </div>
                    <div className="flex flex-col gap-[3px]">
                        {tabs.map(({id, name, icon}) =>
                            <button
                                onClick={() => {
                                    setCurrentTab(id);
                                    setCurrentTabName(name);
                                }}
                                key={id}
                                className={`${id === tabId ? 'bg-neutral-300 dark:bg-neutral-600' : ''} flex items-center rounded-md hover:bg-neutral-300 hover:dark:bg-neutral-600 p-1 cursor-pointer`}>
                                {icon && iconMap[icon]}
                                <div className={`${isOpen ? 'grid-cols-[1fr]' : 'grid-cols-[0fr]'} grid transition-[grid-template-columns] duration-300`}>
                                    <span className="overflow-hidden whitespace-nowrap"><span className="ml-2">{name}</span></span>
                                </div>
                            </button>
                        )}
                    </div>
                </div>
            )}
            <button
                ref={logoutButtonRef}
                onClick={() => setLogoutPopupShown(prev => !prev)}
                className="flex items-center hover:bg-sakura rounded-md p-1 cursor-pointer">
                {iconMap['log-out']}
                <div className={`${isOpen ? 'grid-cols-[1fr]' : 'grid-cols-[0fr]'} grid transition-[grid-template-columns] duration-300`}>
                    <span className="overflow-hidden whitespace-nowrap"><span className="ml-2">Log out</span></span>
                </div>
            </button>
            <Popup isOpen={logoutPopupShown} onClose={() => setLogoutPopupShown(false)} ignoreRef={logoutButtonRef}>
                <AgreementPopup query="Are you sure you want to log out?" setAgreed={setLogoutAgreed}/>
            </Popup>
        </aside>
    )
}