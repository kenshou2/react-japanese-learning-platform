import { useRef, useEffect } from 'react';

import { type Menu } from '../Course';

import { useAddMessage, useUserChatbotHistory, } from '../../../features/chatbotHistory/hooks/useChatbotHistory';
import { useActiveUser } from '../../../context/ActiveUserContext';

interface ChatbotProps {
    setMenus: (menu: Menu) => void;
    isOpen: boolean;
    smallScreen: boolean;
}
export default function Chatbot({setMenus, isOpen, smallScreen}: ChatbotProps) {
    const {activeUserId: uid} = useActiveUser();    
    const {data: chatHistory, isLoading, isError} = useUserChatbotHistory(uid);
    const addMessage = useAddMessage();

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const DEFAULT_BOT_ANSWER = 'Sorry, this feature requires back-end to be set up';

    function sendMessage() {
        if (!textareaRef.current) return;

        const text = textareaRef.current.value.trim();
        if (!text) return;
                
        if (chatHistory?.id !== undefined && chatHistory !== null) {
            addMessage.mutate({
                chatId: chatHistory.id, 
                message: {text: text, time: new Date(), sender: 'user'}
            });
            addMessage.mutate({
                chatId: chatHistory.id, 
                message: {text: DEFAULT_BOT_ANSWER, time: new Date(), sender: 'chatbot'}
            });
        }
        textareaRef.current.value = '';
        textareaRef.current.style.height = 'auto';
    }

    useEffect(() => {
        if (isOpen && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => { // scroll to botton on chat opening
        if (messagesEndRef.current) {
            const container = messagesEndRef.current;
            container.scrollTop = container.scrollHeight;
        }
    }, [isOpen]);
    useEffect(() => { // smooth scroll on new message additions        
        if (messagesEndRef.current) {
            const container = messagesEndRef.current;
            container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
        }
    }, [chatHistory?.messages.length]);
    
    return (
        <aside
            aria-label="Chat-bot assistant"
            className={`${!smallScreen ? 'fixed top-30 left-[80px] min-w-[250px]' : ''} ml-auto`}>
            <div className="flex flex-col gap-5 items-end sticky top-30 text-xs">
                {smallScreen &&
                    <button 
                        onClick={() => setMenus('chatbot')} 
                        className="cursor-pointer">
                        <img src={'/static/coursePage/images/J-Bot-logo.svg'} alt="icons of a chatbot assistant" className="size-12 rounded-[50%] outline-2 outline-neutral-300 dark:outline-0" />
                    </button>
                }
                {isOpen &&
                <div className="flex relative z-10 flex-col h-[clamp(40vh,400px,600px)] w-[250px] lg:w-[300px] p-3 shadow-[0px_5px_15px_-3px] shadow-neutral-400/50 dark:shadow-none bg-bg-primary dark:bg-bg-secondary rounded-lg">
                    <div ref={messagesEndRef} className="flex-1 py-2 overflow-y-auto">
                        {isError
                         ? <div className='text-neutral-400'>Messages couldn't be loaded</div>
                         : <ul className="flex flex-col gap-3">
                            {isLoading
                             ? [...Array(5)].map((_, i) => 
                                <li
                                    key={i} 
                                    className={`loading ${i % 2 === 0 ? 'self-end rounded-[10px_0px_10px_10px]' : 'rounded-[10px_10px_10px_0px]'} 
                                    border border-sakura whitespace-pre-wrap w-[90%] lg:w-[70%] h-[100px]`}>
                                </li>
                                )
                             : chatHistory?.messages.map(({text, time, sender}, i) =>
                                <li
                                    key={i} 
                                    className={`${sender === 'user' ? 'self-end bg-sakura-light dark:sakura dark:text-[#171A1F] rounded-[10px_0px_10px_10px]' : 'bg-neutral-300 dark:bg-neutral-600 rounded-[10px_10px_10px_0px]'} 
                                    whitespace-pre-wrap max-w-[90%] lg:max-w-[70%] break-words p-2`}>
                                    <div className="flex flex-col gap-[3px]">
                                        <span className={`${sender === 'user' ? 'self-end' : ''}`}>{text}</span>
                                        <span className={`${sender === 'user' ? 'self-end text-neutral-600' : 'text-neutral-400'} text-[8px] font-semibold`}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                </li>
                            )
                            }
                            </ul>
                        }
                    </div>
                    <div className="border-t-2 border-neutral-400">
                        <div className="flex mt-2 items-center gap-2 rounded-full border-neutral-400">
                            <textarea
                                ref={textareaRef}
                                rows={1}
                                placeholder="Type a message..."
                                onInput={(e) => {
                                    const el = e.currentTarget;
                                    el.style.height = "auto";
                                    el.style.height = `${el.scrollHeight}px`;                                        
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault(); // prevent newline
                                    sendMessage();
                                    }
                                }}
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck="false"
                                className="resize-none max-h-[80px] overflow-hidden w-full rounded-[18px] bg-bg-secondary dark:bg-neutral-600 p-2"
                            />
                            <button onClick={() => sendMessage()}>
                                <svg className="cursor-pointer size-8 pl-[3px] bg-bg-primary fill-txt-primary rounded-full" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M748.92-446.462 190.616-211.079q-18.076 7.231-34.345-3.115-16.27-10.346-16.27-30.039v-471.534q0-19.693 16.27-30.039 16.269-10.346 34.345-3.115L748.92-513.538q22.307 9.846 22.307 33.538 0 23.692-22.307 33.538ZM200-280l474-200-474-200v147.693L416.921-480 200-427.693V-280Zm0 0v-400 400Z"/></svg>
                            </button>
                        </div>
                    </div>
                </div>
                }
            </div>
        </aside>
    )
}