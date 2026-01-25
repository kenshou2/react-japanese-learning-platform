import type { User } from "../../types/User";
import { simulateDelay } from "../../utils/sumulateDelay";
import { usersDb, type AccountUpdate, type ProfileUpdate, type ProgressUpdate, type UserRegistration } from "../db/users";

export const usersApi = {
    getById: async (id: number): Promise<User> => {
        return simulateDelay(usersDb.getById(id));
    },
    create: async (user: UserRegistration): Promise<User> => {
        return simulateDelay(usersDb.create(user));
    },
    updateAccount: async (id: number, updates: AccountUpdate): Promise<User> => {
        return simulateDelay(usersDb.updateAccount(id, updates));
    },
    updateProfile: async (id: number, updates: ProfileUpdate): Promise<User> => {
        return simulateDelay(usersDb.updateProfile(id, updates));
    },
    updateProgress: async (id: number, updates: Partial<ProgressUpdate>): Promise<User> => {      
        return simulateDelay(usersDb.updateProgress(id, updates));
    },
    getProgress: async (id: number): Promise<User['progress']> => {
        return simulateDelay(usersDb.getProgress(id));
    },
    delete: async (id: number): Promise<void> => {
        const deleted = usersDb.delete(id);
        if (!deleted) throw new Error("Not found");
        return simulateDelay(undefined);
    },
}