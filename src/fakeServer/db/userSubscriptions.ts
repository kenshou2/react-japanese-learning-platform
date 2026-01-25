import { type UserSubscription } from "../../types/UserSubscription";
import { subscriptionPlans } from "./subscriptionPlans";

let userSubscriptionId = 1;

let userSubscriptions: UserSubscription[] = populateUserSubscription();

export const userSubscriptionsDb = {
    getAll: () => [...userSubscriptions],
    getById: (id: number) => {
        const userSubscription = userSubscriptions.find(uS => uS.id === id);
        if (!userSubscription) throw new Error(`User subscription with ${id} not found.`);
        return userSubscription;
    },
    create: (userSubscription: Omit<UserSubscription, 'id'>) => {
        const newUserSubscription: UserSubscription = {
            id: userSubscriptionId++,
            ...userSubscription,
        };
        userSubscriptions.push(newUserSubscription);
        return newUserSubscription;
    },
    update: (id: number, updates: Partial<UserSubscription>) => {
        const toUpdateIndex = userSubscriptions.findIndex(uS => uS.id === id);
        if (toUpdateIndex === -1)
            throw new Error(`User subscription with ${id} not found.`);
        userSubscriptions[toUpdateIndex] = {...userSubscriptions[toUpdateIndex], ...updates};
        return userSubscriptions[toUpdateIndex];
    },
    delete: (id: number) => {
        const lengthBefore = userSubscriptions.length;
        userSubscriptions = userSubscriptions.filter(uS => uS.id !== id);
        if (lengthBefore !== userSubscriptions.length)
            return true;
        else throw new Error(`User subscription with ${id} not found.`);        
    },
    getSubscriptionPrice: (subscription: UserSubscription) => {
        const plan = subscriptionPlans.find(p => p.id === subscription.planId);
        if (!plan)
            throw new Error(`User subscription with ${subscription.id} not found.`);
    
        return (
            subscription.paymentInterval === "monthly"
            ? plan.monthlyPrice
            : plan.annualPrice
        )
    },
}

function populateUserSubscription(): UserSubscription[] {return [
    {
        id: userSubscriptionId++,
        status: "active",
        planId: 'pro',
        paymentMethodId: 1,
        paymentInterval: "monthly",
        nextChargeDate: new Date("2025-11-01"),        
    },    
    {
        id: userSubscriptionId++,
        status: "canceled",
        planId: 'premium',
        paymentMethodId: 2,
        paymentInterval: "annually",
        nextChargeDate: new Date("2025-10-01"),        
    },    
    {
        id: userSubscriptionId++,
        status: 'paused',
        planId: 'basic',
        paymentMethodId: 3,
        paymentInterval: "monthly",
        nextChargeDate: new Date("2025-09-01"),        
    },
]};