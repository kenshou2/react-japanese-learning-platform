import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { chatbotHistoryService } from "../services/chatbotHistoryService";
import type { ChatbotHistory, Message } from "../../../types/ChatbotHistory";

export const useChatbotHistories = () => {
    return useQuery({
        queryKey: ['chatbotHistories'],
        queryFn: chatbotHistoryService.getAll,
    });
}

export const useChatbotHistory = (id: number) => {
    return useQuery({
        queryKey: ['chatbotHistory', id],
        queryFn: () => chatbotHistoryService.getById(id),
    });
}

export const useUserChatbotHistory = (userId: number) => {
    return useQuery({
        queryKey: ['chatbotHistory', userId],
        queryFn: () => chatbotHistoryService.getUserChat(userId),
    });
}

export const useCreateChatbotHistory = () => {
    const queryClient = useQueryClient();
    return useMutation({
       mutationFn: (chat: Omit<ChatbotHistory, 'id'>) => chatbotHistoryService.create(chat),
       onSuccess: () => queryClient.invalidateQueries({queryKey: ['chatbotHistories']}),
    });
}

export const useAddMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
       mutationFn: ({chatId, message}: {chatId: number, message: Message}) => chatbotHistoryService.addMessage(chatId, message),
       onSuccess: (_data, variables) => queryClient.invalidateQueries({queryKey: ['chatbotHistory', variables.chatId]}),       
    });
}

export const useUpdateChatbotHistory = () => {
    const queryClient = useQueryClient();
    return useMutation({
       mutationFn: ({id, updates}: {id: number, updates: Partial<ChatbotHistory>}) => chatbotHistoryService.update(id, updates),
       onSuccess: (_data, variables) => queryClient.invalidateQueries({queryKey: ['chatbotHistory', variables.id]}),
    });
}

export const useDeleteChatbotHistory = () => {
    const queryClient = useQueryClient();
    return useMutation({
       mutationFn: (id: number) => chatbotHistoryService.delete(id),
       onSuccess: () => queryClient.invalidateQueries({queryKey: ['chatbotHistories']}),
    });
}