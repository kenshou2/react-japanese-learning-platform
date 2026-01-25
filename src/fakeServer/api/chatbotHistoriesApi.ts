import { chatbotHistoriesDb } from "../db/chatbotHistories";
import type { ChatbotHistory, Message } from "../../types/ChatbotHistory";
import { simulateDelay } from "../../utils/sumulateDelay";

export const chatbotHistoriesApi = {
    getAll: async (): Promise<ChatbotHistory[]> => {
        return simulateDelay(chatbotHistoriesDb.getAll());
    },
    getById: async (id: number): Promise<ChatbotHistory> => {        
        return simulateDelay(chatbotHistoriesDb.getById(id));
    },
    getUserChat: async (userId: number): Promise<ChatbotHistory> => {
        return simulateDelay(chatbotHistoriesDb.getUserChat(userId));
    },
    create: async (chat: Omit<ChatbotHistory, 'id'>): Promise<ChatbotHistory> => {        
        return simulateDelay(chatbotHistoriesDb.create(chat));
    },
    addMessage: async (chatId: number, message: Message): Promise<ChatbotHistory> => {        
        return simulateDelay(chatbotHistoriesDb.addMessage(chatId, message));
    },
    update: async (id: number, updates: Partial<ChatbotHistory>): Promise<ChatbotHistory> => {
        return simulateDelay(chatbotHistoriesDb.update(id, updates));
    },
    delete: async (id: number): Promise<void> => {
        const deleted = chatbotHistoriesDb.delete(id);
        if (!deleted) throw new Error("Not found");
        return simulateDelay(undefined);
    },
}