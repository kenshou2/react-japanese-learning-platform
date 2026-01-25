import { useEffect, useRef, useState } from "react";
import CtaButton from "../../shared/CtaButton";
import { useDeckCards } from "../../features/decks/hooks/useDecks";
import type { Card } from "../../types/Deck";
import { useLoaderData } from "react-router";


export default function SpacedRepetition() {
    const { deckId: deckIdStr } = useLoaderData() as { 
        deckId: string;        
    };
    
    const deckId = Number(deckIdStr);
    if (isNaN(deckId)) {
        return <div>Invalid space repetition path</div>;
    }
    
    const {data: cards, isLoading, isError} = useDeckCards(deckId);
    const [currentCard, setCurrentCard] = useState<number | null>(null);
    const [isFrontSide, setIsFrontSide] = useState(true);
    const sideRef = useRef(isFrontSide);

    useEffect(() => {
        sideRef.current = isFrontSide;
    }, [isFrontSide]);

    useEffect(() => {
        if (cards)
            setCurrentCard(0);
    }, [cards]);

    useEffect(() => {
        if (!cards) return;

        const handleFlip = (e: KeyboardEvent) => {
            const onFront = sideRef.current;

            let toFlip = null;
            if (onFront)
                toFlip = e.code === 'Space';
            else
                toFlip =
                    e.code === 'Space' ||
                    e.code === 'Digit1' ||
                    e.code === 'Digit2' ||
                    e.code === 'Digit3' ||
                    e.code === 'Digit4';

            if (toFlip) {
                e.preventDefault();
                setIsFrontSide(prev => !prev);
                if (!onFront)
                    setCurrentCard(prev => prev === null ? 0 : (prev + 1) % cards.length);
            }            
        };

        window.addEventListener('keydown', handleFlip);
        return () => window.removeEventListener('keydown', handleFlip);
    }, [cards]);

    if (isError)
        return (
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="font-semibold text-2xl text-center">
                    <h1>Couldn't load the course contents, please try again later.</h1>                    
                </div>
            </div>
        )

    if (isLoading)
        return (
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="font-semibold text-2xl text-center">
                    <h1>Loading the SRS session...</h1>                    
                </div>
            </div>
        )

    return (
        <div className="p-[5%] min-h-[calc(100vh-80px)] w-full flex justify-center items-center">
            {cards && currentCard !== null &&
                <div className="flex flex-col gap-3 w-full min-h-[60vh] max-w-[700px] max-h-[600px] overflow-y-auto">
                    <div className="self-end text-sm">
                        <span className="text-btn-primary dark:text-sakura">20</span>{' / '}
                        <span className="text-purple-600 dark:text-purple-300">6</span>{' / '}
                        <span className="text-blue-600 dark:blue-400">150</span>
                    </div>
                    {isFrontSide
                     ? <FrontSide card={cards[currentCard]} />
                     : <RearSide card={cards[currentCard]} />
                    }
                    <div className="self-center flex gap-3">
                        {isFrontSide
                        ? <CtaButton onClick={() => setIsFrontSide(prev => !prev)} borderRadius="6" fontSize="12" padX="15" padY="8">Show</CtaButton>
                        : [
                            {nextReview: '1 min', label: 'Again'},
                            {nextReview: '6 min', label: 'Hard'},
                            {nextReview: '10 min', label: 'Good'},
                            {nextReview: '1 day', label: 'Easy'},
                        ].map(({nextReview, label}, i) => (
                            <div key={i} className="flex flex-col items-center gap-1">
                                <span className="text-blue-600 dark:blue-400 text-xs">{label === 'Easy' ? '' : '<'} {nextReview}</span>
                                <CtaButton 
                                    onClick={() => {
                                        setIsFrontSide(prev => !prev);
                                        setCurrentCard(prev => prev === null ? 0 : (prev + 1) % cards.length);
                                    }} 
                                    borderRadius="6"
                                    fontSize="12"
                                    padX="15" 
                                    padY="8">
                                    {label}
                                </CtaButton>
                            </div>
                        ))}                    
                    </div>
                </div>
            }
        </div>
    )
}

function FrontSide({card}: {card: Card}) {
    return (
        <div className="flex flex-1 justify-center items-center px-5 py-8 bg-bg-secondary rounded-xl">
            <h2 className="text-center text-9xl">{card.front}</h2>
        </div>
    )
}

function RearSide({card}: {card: Card}) {
    return (
        <div className="flex-1 flex flex-col *:flex-1 *:w-full *:py-3 *:border-b-2 *:border-b-neutral-400 *:dark:border-b-neutral-600 items-center px-5 py-8 bg-bg-secondary rounded-xl">
            <h2 className="text-center text-6xl">{card.front}</h2>
            <div className="flex flex-col *:my-[3px] items-center justify-center">
                <p>
                    {card.back.map((word, i) =>
                        <span key={i}>{word}{i === 3 - 1 ? '' : ', '}</span>
                    )}
                </p>
                <div>
                    {card.hiragana?.map((word, i) =>
                        <span key={i}>{word}{i === 3 - 1 ? '' : ', '}</span>
                    )}
                    {card.katakana?.map((word, i) =>
                        <span key={i}>{word}{i === 3 - 1 ? '' : ', '}</span>
                    )}
                </div>
            </div>
            <div className="flex items-center">
                <ul>
                    {card.examples?.map((example, i) =>
                        <li key={i} className="ml-6 my-1 list-disc">{example}</li>
                    )}
                </ul>
            </div>
        </div>
    )
}