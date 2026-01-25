import { Link } from 'react-router';
import { useEffect, useState } from 'react';

import { useMediaQuery } from '../hooks/useMediaQuery';

import type { NavMenuSection } from '../types/NavMenuSection';
import DonutProgress from './DonutProgress';
import { useActiveUser } from '../context/ActiveUserContext';
import { useUser } from '../features/users/hooks/useUser';

export const navMenuSections: NavMenuSection[] = [
        {id: 1, heading: 'Home', links: [], url: "/home", expanded: false},
        {
            id: 2,
            heading: 'Library',
            links: [                        
                {name: 'Search', url: '/search'},
            ],
            url: "/library",
            expanded: false
        }, 
        {
            id: 3,
            heading: 'Articles',
            links: [                     
                {name: 'Dictionary', url: '/dictionary'},                        
                {name: 'Kana table', url: '/kana-table'},
            ],
            url: "/articles",
            expanded: false
        },
        {
            id: 4,
            heading: 'About',
            links: [], 
            url: "/about",
            expanded: false
        },
];

export default function Header() {
    const {activeUserId: uid} = useActiveUser();
    const {data: user, isLoading, isError} = useUser(uid);
    
    const [menuHover, setMenuHover] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);    
    const isLargeScreen = useMediaQuery('(min-width: 1025px)');    
    const [menuLinks] = useState(navMenuSections);
    const [theme, setTheme] = useState<'light' | 'dark'>(defaultTheme);
    const userXpPercentage = user ? Math.round(user?.progress.currentXp / user?.progress.nextLanguageLevelXp * 100) : 0;

    const rootElem = document.documentElement;
    function defaultTheme() { // TODO (optional) - store preference in localStorage or at least a global state via useContext
        const darkThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        return darkThemeQuery.matches ? 'dark' : 'light';
    };

    useEffect(() => {
        if (theme === 'dark') {
        rootElem.classList.remove('light');
        rootElem.classList.add('dark');
        } else {        
        rootElem.classList.remove('dark');
        rootElem.classList.add('light');
        }
    }, [theme]);
    
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };
        
    document.body.style.position = 'relative';
    if (mobileMenuOpen) { // If mobile menu is open, prevent scrolling
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }    

    if (isLargeScreen) {
        return (
            <header>
                <nav onMouseLeave={() => setMenuHover(false)} className='px-6 py-4 bg-bg-primary fixed w-full top-0 left-0 z-[100] shadow-md dark:shadow-neutral-700/30'>
                    <ul className='flex items-start justify-between lg:gap-6'>
                        <li className='min-h-12 flex-shrink-0'>
                            <Link to='/home' className='flex gap-1 items-center'>
                                <img src={'/static/navbar/images/jp-input-logo.png'} alt='A logo depicting sakura with a red sun in the background' className='h-full w-12'/>
                                <span className='hidden lg:inline-block text-sm font-bold'>JP-Input</span>
                            </Link>
                        </li>
                        <li>
                            <ul style={{gridTemplateColumns: `repeat(${menuLinks.length},1fr)`}} className={`grid text-sm`}>
                                {menuLinks.map(({id, heading, url}) =>
                                    <Link
                                        key={id}
                                        onMouseOver={() => setMenuHover(true)}
                                        onFocus={() => setMenuHover(true)}
                                        to={`${url}`}
                                        className='min-h-12 flex justify-center items-center'>
                                        <div className='group'>
                                            {heading}
                                            <span className='block w-full scale-x-0 group-hover:scale-x-100 origin-center duration-300 h-0.75 bg-accent'></span>
                                        </div>
                                    </Link>
                                )}
                                {menuLinks.map(({id, links}, i) =>
                                    <div key={id} className={`${menuHover ? 'grid-rows-[1fr] mt-3' : ''} ${i === menuLinks.length-1 ? 'border-0' : 'border-r-2'} grid grid-rows-[0fr] duration-300 transition-[grid-template-rows, margin] px-5 border-neutral-500`}>
                                        <div className='overflow-hidden flex flex-col items-center text-center gap-3'>
                                            {links.map((link, i) =>
                                                <Link key={i} to={`${link.url}`} className='group'>
                                                    {link.name}
                                                    <span className='block w-full scale-x-0 group-hover:scale-x-100 origin-center duration-300 h-0.75 bg-accent'></span>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </ul>
                        </li>
                        <li className='flex items-center min-h-12 flex-shrink-0'>
                            <ul className='flex h-full items-center gap-4'>
                                <li className='flex items-center'>
                                    {theme === 'dark'
                                    ? <button onClick={() => toggleTheme()} className='cursor-pointer' aria-label='Change color theme (light/dark).'><img src={'/static/navbar/images/light_mode.svg'} alt="An icon of the sun" /></button>
                                    : <button onClick={() => toggleTheme()} className='cursor-pointer' aria-label='Change color theme (light/dark).'><img src={'/static/navbar/images/dark_mode.svg'} alt="An icon of the moon" /></button>
                                    }
                                </li>
                                <li className='flex items-center'>
                                    {isError ? null : isLoading
                                     ? <div className='loading size-[40px] rounded-[100px]'></div>
                                     : <DonutProgress percentage={ userXpPercentage ?? 0} size={40} fontSize='10' textOverride={user.profile.languageProficiency} />
                                    }
                                </li>
                                <li className='flex items-center'>
                                    {isError ? null : isLoading
                                     ? <div className='loading size-[40px] rounded-[100px]'></div>
                                     : <Link to='/profile'><img src={user?.profile.userPfpUrl} alt="User profile picture" className='size-11 rounded-full'/></Link>
                                    }                                    
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    } else {
        return (
            <header>
                <nav>
                    <div className='flex justify-between items-center fixed w-full top-0 left-0 z-[100] shadow-md dark:shadow-neutral-700/30 px-6 py-4 text-lg text-txt-primary bg-bg-primary'>
                        <div>
                            <Link to='/home' className='flex items-center'>
                                <img src={'/static/navbar/images/jp-input-logo.png'} alt='JP-Input website logo' className='w-12 h-12 mr-3'/>
                                <span className='font-bold text-sm'>JP-Input</span>
                            </Link>
                        </div>
                        <div className='relative w-10'>
                            <svg onClick={() => setMobileMenuOpen(!mobileMenuOpen)} xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" className='absolute z-[100] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-black dark:fill-white cursor-pointer'><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
                        </div>
                        <div className={`${mobileMenuOpen ? 'block visible opacity-100 pointer-events-auto' : 'none invisible opacity-0 pointer-events-none'} flex flex-col px-8 py-7 duration-200 absolute inset-0 bg-bg-primary overflow-y-auto min-h-screen w-screen text-xl`}>
                            <div className='flex justify-between border-neutral-700 pb-8 border-b-3'>
                                <div className='flex flex-col gap-4'>
                                    <Link to='/profile' onClick={() => setMobileMenuOpen(false)}><img src={user?.profile.userPfpUrl} alt="User profile picture" className='size-18 rounded-full'/></Link>
                                    <span className='font-semibold text-3xl'>{user?.profile.displayName}</span>
                                </div>
                            </div>
                            <ul className="py-8 px-3 border-neutral-700 border-b-3 *:my-2">
                                {menuLinks.map(menuLink => (
                                    <>
                                        <li><Link to={`${menuLink.url}`} onClick={() => setMobileMenuOpen(false)}>{menuLink.heading}</Link></li>
                                        {menuLink.links.map((link, index) => (
                                            <li key={index}>
                                                <Link to={`${link.url}`} onClick={() => setMobileMenuOpen(false)}>{link.name}</Link>
                                            </li>
                                        ))}
                                    </>
                                ))}
                            </ul>
                            <ul className='py-8 px-3 *:mb-3 border-neutral-700 border-b-3'>
                                <li>
                                    <span className='cursor-pointer flex items-center gap-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32" className='fill-txt-primary'><path d="M435.693-100.001q-20.462 0-35.346-13.577-14.884-13.577-18.115-33.422l-9.769-74.847q-16.077-5.385-32.962-15.077-16.885-9.693-30.193-20.77L240-228.232q-18.846 8.307-37.884 1.615t-29.576-24.307l-45.077-78.154q-10.538-17.615-6.077-37.268 4.462-19.653 20.461-32.422l59.924-45.001q-1.385-8.923-1.962-17.923-.577-9-.577-17.923 0-8.539.577-17.347.577-8.808 1.962-19.269l-59.924-45.001q-15.999-12.769-20.269-32.614-4.269-19.846 6.27-37.461l44.692-77q10.538-17.23 29.576-24.115 19.038-6.884 37.884 1.423l68.923 29.078q14.462-11.462 30.885-20.962 16.424-9.501 32.27-15.27L382.232-813q3.231-19.845 18.115-33.422 14.884-13.577 35.346-13.577h88.614q20.462 0 35.346 13.577 14.884 13.577 18.115 33.422l9.769 75.232q18 6.538 32.578 15.269 14.577 8.731 29.423 20.578l70.847-29.078q18.846-8.307 37.884-1.423 19.038 6.885 29.576 24.115l44.692 77.385q10.538 17.615 6.077 37.268-4.462 19.653-20.461 32.422l-61.462 46.154q2.154 9.693 2.346 18.116.192 8.423.192 16.962 0 8.154-.384 16.577-.385 8.423-2.77 19.27l60.309 45.385q15.999 12.769 20.653 32.422 4.654 19.653-5.885 37.268l-45.307 77.769q-10.538 17.615-29.769 24.308-19.23 6.692-38.076-1.616l-68.462-29.462q-14.846 11.847-30.308 20.962-15.462 9.116-31.693 14.885L577.768-147q-3.231 19.845-18.115 33.422-14.884 13.577-35.346 13.577h-88.614ZM440-160h78.615L533-267.154q30.615-8 55.961-22.731 25.346-14.73 48.885-37.884L737.231-286l39.384-68-86.769-65.385q5-15.538 6.808-30.461 1.807-14.923 1.807-30.154 0-15.615-1.807-30.154-1.808-14.538-6.808-29.692L777.385-606 738-674l-100.539 42.385q-20.076-21.462-48.115-37.923-28.039-16.462-56.731-23.308L520-800h-79.385l-13.23 106.769q-30.616 7.231-56.539 22.154-25.923 14.923-49.461 38.462L222-674l-39.385 68L269-541.615q-5 14.23-7 29.615-2 15.385-2 32.385Q260-464 262-449q2 15 6.615 29.615l-86 65.385L222-286l99-42q22.769 23.385 48.692 38.308 25.923 14.923 57.308 22.923L440-160Zm40.461-200.001q49.923 0 84.961-35.038Q600.46-430.078 600.46-480t-35.038-84.961q-35.038-35.038-84.961-35.038-50.537 0-85.268 35.038-34.73 35.039-34.73 84.961t34.73 84.961q34.731 35.038 85.268 35.038ZM480-480Z"/></svg>
                                        <Link to='/profile' onClick={() => setMobileMenuOpen(false)}>Settings</Link>
                                    </span>
                                </li>
                                <li>
                                    <button onClick={toggleTheme} className='cursor-pointer flex items-center gap-3'><img src={theme === 'light' ? '/static/navbar/images/dark_mode.svg' : '/static/navbar/images/light_mode.svg'} className='w-8 h-8'/><span>Switch theme</span></button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}