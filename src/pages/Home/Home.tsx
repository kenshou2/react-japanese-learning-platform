import { useState, useEffect, useRef } from 'react'

import Hero from './components/Hero';
import Benefits from './components/Benefits';
import FeatureShowcase from './components/FeatureShowcase';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import HeroMirror from './components/HeroMirror';

export default function Home() {
    const [snapEnabled, setSnapEnabled] = useState(true)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return
            const scrollY = window.scrollY
            // Toggle snap based on whether it's top of the page or not
            if (scrollY > 0) {
                setSnapEnabled(false)
            } else {
                setSnapEnabled(true)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, []);    

    return (
        <div>
            <div
                ref={containerRef}
                className={`h-screen snap-y snap-mandatory ${snapEnabled ? 'overflow-y-auto' : 'overflow-hidden'}`}
                >
                <div className="h-screen snap-start snap-smooth">
                    <Hero />
                </div>
                <div className="h-screen snap-start snap-smooth">
                    <FeatureShowcase />
                </div>
            </div>
            <Benefits />
            <Testimonials />
            <FAQ />
            <HeroMirror />
        </div>
    )
}