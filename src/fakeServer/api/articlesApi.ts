import { articlesDb } from '../db/articles'
import type { Article } from "../../types/Article";
import { simulateDelay } from "../../utils/sumulateDelay";

export const articlesApi = {
    getAll: async (): Promise<Article[]> => {
        return simulateDelay(articlesDb.getAll())
    },
    getById: async (id: number): Promise<Article> => {        
        return simulateDelay(articlesDb.getById(id));
    },
    create: async (article: Omit<Article, 'id'>): Promise<Article> => {        
        return simulateDelay(articlesDb.create(article));
    },
    update: async (id: number, updates: Partial<Article>): Promise<Article> => {        
        return simulateDelay(articlesDb.update(id, updates));
    },
    delete: async (id: number): Promise<void> => {
        const deleted = articlesDb.delete(id);
        if (!deleted) throw new Error("Not found");
        return simulateDelay(undefined);
    },
}