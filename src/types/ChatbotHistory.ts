export interface Message {
    text: string;
    time: Date;
    sender: "user" | "chatbot";
}

export interface ChatbotHistory {
    id: number;
    userId: number;
    messages: Message[];
}