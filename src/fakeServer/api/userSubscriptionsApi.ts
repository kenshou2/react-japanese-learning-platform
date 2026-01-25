import type { UserSubscription } from "../../types/UserSubscription";
import { simulateDelay } from "../../utils/sumulateDelay";
import { userSubscriptionsDb } from "../db/userSubscriptions";

export const userSubscriptionsApi = {
    getAll: async (): Promise<UserSubscription[]> => simulateDelay(userSubscriptionsDb.getAll()),
    getById: async (id: number): Promise<UserSubscription> => {
        return simulateDelay(userSubscriptionsDb.getById(id));
    },
    create: async (userSubscription: Omit<UserSubscription, 'id'>): Promise<UserSubscription> => {
        return simulateDelay(userSubscriptionsDb.create(userSubscription));
    },
    update: async (id: number, updates: Partial<UserSubscription>): Promise<UserSubscription> => {
        return simulateDelay(userSubscriptionsDb.update(id, updates));
    },
    delete: async (id: number): Promise<void> => {
        const deleted = userSubscriptionsDb.delete(id);
        if (!deleted) throw new Error("Not found");
        return simulateDelay(undefined);
    },
    getSubscriptionPrice: async (subscription: UserSubscription): Promise<number> => {
        return simulateDelay(userSubscriptionsDb.getSubscriptionPrice(subscription));
    },
}