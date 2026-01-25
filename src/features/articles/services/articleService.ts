import { articlesApi } from "../../../fakeServer/api/articlesApi";
import type { Article } from "../../../types/Article";

export const articleService = {
    getAll: () => articlesApi.getAll(),
    getById: (id: number) => articlesApi.getById(id),
    create: (article: Omit<Article, 'id'>) => articlesApi.create(article),
    update: (id: number, updates: Partial<Article>) => articlesApi.update(id, updates),
    delete: (id: number) => articlesApi.delete(id),    
}