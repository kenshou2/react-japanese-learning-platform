export interface SubscriptionPlan {
  id: "basic" | "pro" | "premium" | string;
  name: string;
  description: string;
  features: string[];
  monthlyPrice: number;
  annualPrice: number;
  backgroundStyle?: string;
}