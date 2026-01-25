import { Link } from 'react-router';
import { navMenuSections } from './Header';

export default function Footer() {
    return (
        <footer className='mt-auto w-full'>
            <nav className='py-5 px-[5%] flex flex-col items-center justify-center bg-neutral-800 dark:bg-bg-secondary text-neutral-300 '>
                <ul className='grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] w-full 2xl:max-w-[50%] gap-5 justify-center border-neutral-500 border-b-2 pb-5'>
                    {navMenuSections.map(({id, heading, links, url}) =>
                        <li key={id} className='flex flex-col text-sm text-neutral-400 text-sm sm:text-lg text-center'>
                            <Link to={`${url}`}>{heading}</Link>
                            {links.map((link, i) =>
                                <div key={i}><Link to={`${link.url}`} className='text-center mb-2'>{link.name}</Link></div>
                            )}
                        </li>
                    )}
                </ul>
                <ul className="flex gap-5 justify-center pt-5 text-sm">
                    <li>© 2026 JP-Input</li>
                    <li><Link to='/' className='underline'>Privacy policy</Link></li>
                    <li><Link to='/' className='underline'>Terms of use</Link></li>
                </ul>
            </nav>
        </footer>
    )
}