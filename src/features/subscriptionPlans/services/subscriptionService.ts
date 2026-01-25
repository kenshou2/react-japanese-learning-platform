import { subscriptionPlansApi } from "../../../fakeServer/api/subscriptionPlansApi";
import type { SubscriptionPlan } from "../../../types/SubscriptionPlan";

export const subscriptionPlansService = {
    getAll: () => subscriptionPlansApi.getAll(),
    getById: (id: string) => subscriptionPlansApi.getById(id),
    create: (plan: SubscriptionPlan) => subscriptionPlansApi.create(plan),
    update: (id: string, updates: Partial<SubscriptionPlan>) => subscriptionPlansApi.update(id, updates),
    delete: (id: string) => subscriptionPlansApi.delete(id),
}