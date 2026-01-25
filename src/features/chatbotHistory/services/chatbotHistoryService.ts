import { chatbotHistoriesApi } from "../../../fakeServer/api/chatbotHistoriesApi";
import type { ChatbotHistory, Message } from "../../../types/ChatbotHistory";

export const chatbotHistoryService = {
    getAll: () => chatbotHistoriesApi.getAll(),
    getById: (id: number) => chatbotHistoriesApi.getById(id),
    getUserChat: (userId: number) => chatbotHistoriesApi.getUserChat(userId),
    create: (chat: Omit<ChatbotHistory, 'id'>) => chatbotHistoriesApi.create(chat),
    addMessage: (chatId: number, message: Message) => chatbotHistoriesApi.addMessage(chatId, message),
    update: (id: number, updates: Partial<ChatbotHistory>) => chatbotHistoriesApi.update(id, updates),
    delete: (id: number) => chatbotHistoriesApi.delete(id),
}