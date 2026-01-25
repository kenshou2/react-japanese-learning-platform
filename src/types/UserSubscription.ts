import type { SubscriptionPlan } from "./SubscriptionPlan";

export interface Invoice {
  id: string;
  url: string;
  amount: number;
  currency: string;
  issuedDate: Date;
  dueDate: Date;
}

export interface PaymentMethod {
    id: number;
    cardNumber: string;
    provider: "visa" | "mastercard" | null;
    isDefault: boolean;
    cardColor?: string;
}

export interface BillingRecord {
  date: Date;  
  subscriptionId: number;
  invoice: Invoice;
}

export interface UserSubscription {
  id: number;
  planId: SubscriptionPlan["id"];
  paymentMethodId: number;
  status: "active" | "paused" | "canceled" | "absent";
  paymentInterval: "annually" | "monthly";
  nextChargeDate: Date | null;
}