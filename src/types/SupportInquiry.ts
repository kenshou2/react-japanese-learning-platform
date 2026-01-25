export const supportInquiryCategories = [
    'Account & Login Issues',
    'Subscription & Billing',
    'Technical Problem',
    'Feedback / Suggestions',
    'Content Error or Bug Report',
    'Other',
] as const;

export interface SupportInquiry {
    id: number;
    subject: string;
    description: string;
    category: typeof supportInquiryCategories[number];
}