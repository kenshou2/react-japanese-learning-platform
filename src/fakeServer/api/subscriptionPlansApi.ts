import type { SubscriptionPlan } from "../../types/SubscriptionPlan";
import { simulateDelay } from "../../utils/sumulateDelay";
import { subscriptionPlansDb } from "../db/subscriptionPlans";

export const subscriptionPlansApi = {
    getAll: async (): Promise<SubscriptionPlan[]> => {
        return simulateDelay(subscriptionPlansDb.getAll());
    },
    getById: async (id: string): Promise<SubscriptionPlan> => {
        return simulateDelay(subscriptionPlansDb.getById(id));
    },
    create: async (plan: SubscriptionPlan): Promise<SubscriptionPlan> => {
        return simulateDelay(subscriptionPlansDb.create(plan));
    },
    update: async (id: string, updates: Partial<SubscriptionPlan>): Promise<SubscriptionPlan> => {
        return simulateDelay(subscriptionPlansDb.update(id, updates));
    },
    delete: async (id: string): Promise<void> => {
        const deleted = subscriptionPlansDb.delete(id);
        if (!deleted) throw new Error("Not found");
        return simulateDelay(undefined);
    },
}