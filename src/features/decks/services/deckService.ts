import { decksApi } from "../../../fakeServer/api/decksApi";
import type { Deck } from "../../../types/Deck";

export const deckService = {
    getAll: () => decksApi.getAll(),
    getById: (id: number) => decksApi.getById(id),
    create: (deck: Omit<Deck, 'id'>) => decksApi.create(deck),
    update: (id: number, updates: Partial<Deck>) => decksApi.update(id, updates),
    delete: (id: number) => decksApi.delete(id),
    getDeckCards: (id: number) => decksApi.getDeckCards(id),
}