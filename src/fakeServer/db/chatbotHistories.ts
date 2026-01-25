import type { ChatbotHistory, Message } from "../../types/ChatbotHistory";

let chatbotHistoryId = 0;
let chatbotHistories: ChatbotHistory[] = populateChatbotHistories();

export const chatbotHistoriesDb = {
    getAll: () => {
        return [...chatbotHistories];
    },
    getById: (id: number) => {
        const chat = chatbotHistories.find(cH => cH.id === id);
        if (!chat) throw new Error(`Chatbot history with id ${id} not found`);
        return chat;
    },
    getUserChat: (userId: number) => {
        const chat = chatbotHistories.find(cH => cH.userId === userId);
        if (!chat) throw new Error(`Chatbot history for a user with ${userId} not found`);
        return chat;
    },
    create: (chat: Omit<ChatbotHistory, 'id'>) => {
        const newChat: ChatbotHistory = {
            id: chatbotHistoryId++,
            ...chat,
        };
        chatbotHistories.push(newChat);
        return newChat;
    },
    addMessage: (chatId: number, message: Message) => {        
        const chat = chatbotHistories.find(cH => cH.id === chatId);
        if (!chat) throw new Error(`Chatbot history with id ${chatId} not found`);
        chat.messages.push(message);                
        return chat;
    },
    update: (id: number, updates: Partial<ChatbotHistory>) => {
        const toUpdateIndex = chatbotHistories.findIndex(cH => cH.id === id);
        if (toUpdateIndex === -1) throw new Error(`Chatbot history with id ${id} not found`);
        chatbotHistories[toUpdateIndex] = {...chatbotHistories[toUpdateIndex], ...updates};
        return chatbotHistories[toUpdateIndex];
    },
    delete: (id: number) => {
        const lengthBefore = chatbotHistories.length;
        chatbotHistories = chatbotHistories.filter(cH => cH.id !== id);
        if (chatbotHistories.length === lengthBefore)
            throw new Error(`Chatbot history with id ${id} not found`);
        return true;
    }
}

function populateChatbotHistories(): ChatbotHistory[] {return [
    {
        id: chatbotHistoryId++,
        userId: 1,
        messages: [
            {
                text: "This is a test user message.",
                time: new Date(new Date().setHours(14, 30, 0, 0)),
                sender: 'user',
            },
            {
                text: "This is a test bot message.",
                time: new Date(new Date().setHours(14, 32, 0, 0)),
                sender: 'chatbot',
            },
        ],
    }
]};