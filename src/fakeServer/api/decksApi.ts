import { decksDb } from "../db/decks";
import type { Card, Deck } from "../../types/Deck";
import { simulateDelay } from "../../utils/sumulateDelay";

export const decksApi = {
    getAll: async (): Promise<Deck[]> => {
        return simulateDelay(decksDb.getAll());
    },
    getById: async (id: number): Promise<Deck> => {
        return simulateDelay(decksDb.getById(id));
    },
    create: async (deck: Omit<Deck, 'id'>): Promise<Deck> => {
        return simulateDelay(decksDb.create(deck));
    },
    update: async (id: number, updates: Partial<Deck>): Promise<Deck> => {
        return simulateDelay(decksDb.update(id, updates));
    },
    delete: async (id: number): Promise<void> => {
        const deleted = decksDb.delete(id);
        if (!deleted) throw new Error("Not found");
        return simulateDelay(undefined);
    },
    getDeckCards: async (id: number): Promise<Card[]> => {
        return simulateDelay(decksDb.getDeckCards(id));
    },
}