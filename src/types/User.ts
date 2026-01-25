import type { BillingRecord, PaymentMethod } from "./UserSubscription";

export interface Statistic {
  label: string;
  value: number;
}

export interface Session {
  id: number;
  device: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  country: string;
  city: string;
  firstSignedIn: Date;
  lastActive: Date;
}

export interface CourseProgress {
  courseId: number;
  checkpoint: {    
    moduleId: number;
    lessonId: number;
  };
  currentHours: number;
  currentProgress: number;
}

export interface ConfigEntry {
  label: string;
  state: boolean;
}

export const configs = [
  'usernameVisible',
  'displayNameVisible',
  'pfpVisible',
  'aboutVisible',
  'learningGoalsVisible',
  'statisticsVisible',
  'achievementsVisible',
] as const;

export type ConfigKey = typeof configs[number];

export type CustomConfig = {
  [key in ConfigKey]: ConfigEntry;
}

export interface User {
    id: number;
    account: {
        username: string;
        password: string;
        email: string;
        phoneNumber: string | null;
        subscriptionId: number | null;
        paymentMethods: PaymentMethod[];
        billingHistory: BillingRecord[];
        twoFactorOn: {
            enabled: boolean;
            dateChanged: Date | null;
        };
        activeSessions: Session[];
    }
    profile: {
        displayName: string;
        userPfpUrl: string;
        languageProficiency: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | null;
        achievements: {id: number}[] | null;        
        about: string | null;
        learningGoals: {
            id: number;
            description: string;
            completion: number;
        }[];
        statistics: {
            coursesPassed: Statistic;
            wordsLearned: Statistic;
            studyStreak: Statistic;
            averageWordRetention: Statistic;
        } | null;
        visibility: "private" | "public";
        customConfig: CustomConfig;
    };
    progress: {
      currentXp: number;
      nextLanguageLevelXp: number;
      courseProgress: CourseProgress[];
    }
}