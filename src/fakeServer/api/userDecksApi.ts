import type { Deck } from "../../types/Deck";
import type { UserDeck } from "../../types/UserDeck";
import { simulateDelay } from "../../utils/sumulateDelay";
import { userDecksDb } from "../db/userDecks";

export const userDecksApi = {
    getAll: async (): Promise<UserDeck[]> => simulateDelay(userDecksDb.getAll()),
    getById: async (id: number): Promise<UserDeck> => {
        return simulateDelay(userDecksDb.getById(id));
    },
    create: async (userDeck: Omit<UserDeck, 'id'>): Promise<UserDeck> => {
        return simulateDelay(userDecksDb.create(userDeck));
    },
    update: async (id: number, updates: Partial<UserDeck>): Promise<UserDeck> => {
        return simulateDelay(userDecksDb.update(id, updates));
    },
    delete: async (id: number): Promise<void> => {
        const deleted = userDecksDb.delete(id);
        if (!deleted) throw new Error("Not found");
        return simulateDelay(undefined);
    },
    getUserDecks: async (userId: number): Promise<Deck[]> => {
        return simulateDelay(userDecksDb.getUserDecks(userId));
    },
}