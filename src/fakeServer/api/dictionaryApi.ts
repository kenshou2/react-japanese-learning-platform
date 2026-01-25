import type { DictionaryEntry } from "../../types/DictionaryEntry";
import { simulateDelay } from "../../utils/sumulateDelay";
import { dictionaryDb } from "../db/dictionary";

export const dictionaryApi = {
    getAll: async (): Promise<DictionaryEntry[]> => {
        return simulateDelay(dictionaryDb.getAll());
    },
    getById: async (id: number): Promise<DictionaryEntry> => {
        return simulateDelay(dictionaryDb.getById(id));
    },
    create: async (dictionaryEntry: Omit<DictionaryEntry, 'id'>): Promise<DictionaryEntry> => {
        return simulateDelay(dictionaryDb.create(dictionaryEntry));
    },
    update: async (id: number, updates: Partial<DictionaryEntry>): Promise<DictionaryEntry> => {
        return simulateDelay(dictionaryDb.update(id, updates));
    },
    delete: async (id: number): Promise<void> => {
        const deleted = dictionaryDb.delete(id);
        if (!deleted) throw new Error("Not found");
        return simulateDelay(undefined);
    },
}