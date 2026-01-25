import { userSubscriptionsApi } from "../../../fakeServer/api/userSubscriptionsApi";
import { type UserSubscription } from "../../../types/UserSubscription";

export const userSubscriptionService = {
    getAll: () => userSubscriptionsApi.getAll(),
    getById: (id: number) => userSubscriptionsApi.getById(id),
    create: (userSubscription: Omit<UserSubscription, 'id'>) => userSubscriptionsApi.create(userSubscription),
    update: (id: number, updates: Partial<UserSubscription>) => userSubscriptionsApi.update(id, updates),
    delete: (id: number) => userSubscriptionsApi.delete(id),
    getSubscriptionPrice: (userSubscription: UserSubscription) => userSubscriptionsApi.getSubscriptionPrice(userSubscription),
}