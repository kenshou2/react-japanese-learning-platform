import type { SupportInquiry } from "../../types/SupportInquiry";
import { simulateDelay } from "../../utils/sumulateDelay";
import { supportInquiriesDb } from "../db/supportInquiries";

export const supportInquiriesApi = {
    getAll: async (): Promise<SupportInquiry[]> => simulateDelay(supportInquiriesDb.getAll()),
    getById: async (id: number): Promise<SupportInquiry> => {
        return simulateDelay(supportInquiriesDb.getById(id));
    },
    create: async (inquiry: Omit<SupportInquiry, 'id'>) => {
        return simulateDelay(supportInquiriesDb.create(inquiry));
    },
    update: async (id: number, updates: Partial<SupportInquiry>) => {
        return simulateDelay(supportInquiriesDb.update(id, updates));
    },
    delete: async (id: number): Promise<void> => {
        const deleted = supportInquiriesDb.delete(id);
        if (!deleted) throw new Error("Not found");
        return simulateDelay(undefined);
    },
};