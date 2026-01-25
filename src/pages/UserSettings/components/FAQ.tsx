import { useState } from "react";
import Accordion from "../../../shared/Accordion";
import SearchBar from "../../../shared/SearchBar";

interface FAQItem {
  id: number;
  name: string;
  heading: string;
  text: string[] | string;
  expanded: boolean;
}
export const faqItems: FAQItem[] = [
  {
    id: 1,
    name: "How do I create an account?", // needed for search bar functionality
    heading: "How do I create an account?",
    text: "You can create an account by clicking the 'Sign Up' button and following the registration steps. Make sure to verify your email to activate your account.",
    expanded: false,
  },
  {
    id: 2,
    name: "Can I change my subscription plan later?",
    heading: "Can I change my subscription plan later?",
    text: "Yes, you can upgrade or downgrade your subscription anytime from your account settings. Billing will be adjusted accordingly.",
    expanded: false,
  },
  {
    id: 3,
    name: "What payment methods are accepted?",
    heading: "What payment methods are accepted?",
    text: ["We accept all major credit cards (Visa, MasterCard, American Express).", "PayPal is also supported for monthly and annual plans."],
    expanded: false,
  },
  {
    id: 4,
    name: "Is there a free trial available?",
    heading: "Is there a free trial available?",
    text: "Yes, new users can access a 7-day free trial. You’ll be prompted to choose a plan once the trial ends.",
    expanded: false,
  },
  {
    id: 5,
    name: "How do I reset my password?",
    heading: "How do I reset my password?",
    text: "Go to the login page, click 'Forgot Password?', and follow the instructions. You’ll receive an email to reset your password.",
    expanded: false,
  },
  {
    id: 6,
    name: "Can I access my account on multiple devices?",
    heading: "Can I access my account on multiple devices?",
    text: ["Yes, you can log in on multiple devices simultaneously.", "Your account settings and progress are synced across all devices."],
    expanded: false,
  },
  {
    id: 7,
    name: "How do I contact support?",
    heading: "How do I contact support?",
    text: "You can reach our support team via the 'Contact Us' form in your account dashboard or by emailing support@example.com.",
    expanded: false,
  },
  {
    id: 8,
    name: "What is your data privacy policy?",
    heading: "What is your data privacy policy?",
    text: "We take your privacy seriously. All personal data is encrypted and never shared with third parties without consent. Check our Privacy Policy for full details.",
    expanded: false,
  },
  {
    id: 9,
    name: "Can I cancel my subscription anytime?",
    heading: "Can I cancel my subscription anytime?",
    text: "Yes, you can cancel at any time from your account settings. Your subscription will remain active until the end of the current billing period.",
    expanded: false,
  },
  {
    id: 10,
    name: "Do you offer discounts for students or teams?",
    heading: "Do you offer discounts for students or teams?",
    text: ["Yes, we provide special pricing for students and team accounts.", "Please contact our sales team to learn more about available discounts."],
    expanded: false,
  },
];


export default function FAQ() {
    const [searchResults, setSearchResults] = useState<FAQItem[]>(faqItems);    

    return (
        <div className="flex flex-col gap-5 max-w-[500px]">
            <SearchBar setSearchResults={setSearchResults} data={faqItems} isLoading={false} />
            <Accordion items={searchResults} fontScale="normal" />
        </div>
    )
}