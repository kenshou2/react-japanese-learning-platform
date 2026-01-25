import type { UserDeck } from "../../types/UserDeck";
import { decksDb } from "./decks";

let userDeckId = 0;

let userDecks: UserDeck[] = populateUserDecks();

export const userDecksDb = {
    getAll: () => [...userDecks],
    getById: (id: number) => {
        const userDeck = userDecks.find(uD => uD.id === id);
        if (!userDeck) throw new Error(`User deck with id ${id} not found.`);
        return userDeck;
    },
    create: (userDeck: Omit<UserDeck, 'id'>) => {
        const newUserDeck: UserDeck = {
            id: userDeckId++,
            ...userDeck,
        };
        userDecks.push(newUserDeck);
        return newUserDeck;
    },
    update: (id: number, updates: Partial<UserDeck>) => {
        const toUpdateIndex = userDecks.findIndex(uD => uD.id === id);
        if (toUpdateIndex === -1)
            throw new Error(`User deck with id ${id} not found.`);
        userDecks[toUpdateIndex] = {...userDecks[toUpdateIndex], ...updates};
        return userDecks[toUpdateIndex];
    },
    delete: (id: number) => {
        const lengthBefore = userDecks.length;
        userDecks = userDecks.filter(uC => uC.id !== id);
        if (lengthBefore !== userDecks.length)
            return true;
        else throw new Error(`User deck with id ${id} not found.`);        
    },
    getUserDecks: (userId: number) => {
        const deckIds = userDecks
            .filter(uD => uD.userId === userId)
            .map(uD => uD.deckId);
        let allDecks = decksDb.getAll();
        const userDecksList = allDecks.filter(uD => deckIds.includes(uD.id));
        return userDecksList;
    },
}

function populateUserDecks(): UserDeck[] {return [
    {id: userDeckId++, userId: 1, deckId: 0},    
]};