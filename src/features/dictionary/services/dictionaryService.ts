import { dictionaryApi } from "../../../fakeServer/api/dictionaryApi";
import type { DictionaryEntry } from "../../../types/DictionaryEntry";

export const dictionaryService = {
    getAll: () => dictionaryApi.getAll(),
    getById: (id: number) => dictionaryApi.getById(id),
    create: (dictionaryEntry: Omit<DictionaryEntry, 'id'>) => dictionaryApi.create(dictionaryEntry),
    update: (id: number, updates: Partial<DictionaryEntry>) => dictionaryApi.update(id, updates),
    delete: (id: number) => dictionaryApi.delete(id),
}