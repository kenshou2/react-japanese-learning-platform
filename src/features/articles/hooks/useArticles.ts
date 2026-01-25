import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { articleService } from "../services/articleService";
import type { Article } from "../../../types/Article";

export const useArticles = () => {
    return useQuery({
        queryKey: ['articles'],
        queryFn: articleService.getAll,
    });
}

export const useArticle = (id: number) => {
    return useQuery({
        queryKey: ["article", id],
        queryFn: () => articleService.getById(id!),
        enabled: !isNaN(id),
    });
}

export const useCreateArticle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newArticle: Omit<Article, 'id'>) =>
            articleService.create(newArticle),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['articles'] }),
    });
};

export const useUpdateArticle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updates }: { id: number; updates: Partial<Article> }) =>
            articleService.update(id, updates),
        onSuccess: (_data, variables) => queryClient.invalidateQueries({ queryKey: ['article', variables.id] }),
    });
};

export const useDeleteArticle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => articleService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['articles'] }),
    });
};