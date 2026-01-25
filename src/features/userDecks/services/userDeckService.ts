import { userDecksApi } from "../../../fakeServer/api/userDecksApi";
import type { UserDeck } from "../../../types/UserDeck";

export const userDeckService = {
    getAll: () => userDecksApi.getAll(),
    getById: (id: number) => userDecksApi.getById(id),
    create: (newUserDeck: Omit<UserDeck, 'id'>) => userDecksApi.create(newUserDeck),
    update: (id: number, updates: Partial<UserDeck>) => userDecksApi.update(id, updates),
    delete: (id: number) => userDecksApi.delete(id),
    getUserDecks: (userId: number) => userDecksApi.getUserDecks(userId),
}