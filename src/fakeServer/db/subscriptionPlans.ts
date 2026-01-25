import { type SubscriptionPlan } from "../../types/SubscriptionPlan";

export const subscriptionPlans: SubscriptionPlan[] = populateSubscriptionPlans();

export const subscriptionPlansDb = {
    getAll: () => {
        return [...subscriptionPlans];
    },
    getById: (id: string) => {
        const plan = subscriptionPlans.find(sP => sP.id === id);
        if (!plan) throw new Error(`User subscription plan with ${id} not found.`);
        return plan;
    },
    create: (plan: SubscriptionPlan) => {
        subscriptionPlans.push(plan);
        return plan;
    },
    update: (id: string, updates: Partial<SubscriptionPlan>) => {
        const toUpdateIndex = subscriptionPlans.findIndex(sP => sP.id === id);
        if (!toUpdateIndex) throw new Error(`User subscription plan with ${id} not found.`);
        subscriptionPlans[toUpdateIndex] = { ...subscriptionPlans[toUpdateIndex], ...updates };
        return subscriptionPlans[toUpdateIndex];
    },
    delete: (id: string) => {
        const lengthBefore = subscriptionPlans.length;
        const newPlans = subscriptionPlans.filter(p => p.id !== id);
        if (newPlans.length !== lengthBefore)
            return true;
        else throw new Error(`User subscription plan with ${id} not found.`);
    }
}

function populateSubscriptionPlans(): SubscriptionPlan[] {return [
    {
        id: 'basic',
        name: 'Basic',
        description: 'Perfect for beginners or casual learners. Access essential courses, vocabulary decks, and basic tests to start your Japanese learning journey.',
        features: ['Access to beginner courses (JLPT N5-N4)', 'Limited SRS vocabulary decks', 'Basic quizzes and tests', 'Track your XP and streaks'],
        monthlyPrice: 6,
        annualPrice: 65,
        backgroundStyle: "linear-gradient(135deg, #0099FF, #806ECB, #D042FF)",
    },
    {
        id: 'pro',
        name: 'Pro',
        description: 'Designed for committed learners. Unlock intermediate and advanced courses, full SRS decks, interactive tests, and chatbot practice to accelerate your Japanese.',
        features: ['All beginner and intermediate courses (JLPT N5-N3)', 'Full SRS vocabulary and kanji decks', 'Interactive tests with progress tracking'],
        monthlyPrice: 8,
        annualPrice: 89,
        backgroundStyle: "linear-gradient(135deg, #FFBE55, #FF8076, #FF4297)",
    },
    {
        id: 'premium',
        name: 'Premium',
        description: 'For advanced learners and enthusiasts. Get full access to all courses, SRS decks, tests, chatbot features, articles, and premium insights for mastering Japanese.',
        features: ['All courses (JLPT N5-N1)', 'Unlimited SRS decks for vocabulary and kanji', 'Advanced tests and progress analytics', 'AI-powered chatbot with contextual feedback', 'Exclusive articles on culture, travel, and language tips'],
        monthlyPrice: 10,
        annualPrice: 110,
        backgroundStyle: "linear-gradient(135deg, #FF5558, #E74BAB, #D042FF)",
    },
]};