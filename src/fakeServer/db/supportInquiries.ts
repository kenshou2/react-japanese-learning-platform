import type { SupportInquiry } from "../../types/SupportInquiry";

let supportInquiryId = 0;
let supportInquiries: SupportInquiry[] = [];

export const supportInquiriesDb = {
    getAll: () => [...supportInquiries],
    getById: (id: number) => {
        const supportInquiry = supportInquiries.find(sI => sI.id === id);
        if (!supportInquiry) throw new Error(`Support inquiry with ${id} not found.`);
        return supportInquiry;
    },
    create: (inquiry: Omit<SupportInquiry, 'id'>) => {
        supportInquiries.push({id: supportInquiryId++, ...inquiry});
    },
    update: (id: number, updates: Partial<SupportInquiry>) => {
        const toUpdateIndex = supportInquiries.findIndex(sI => sI.id === id);
        if (toUpdateIndex === -1)
            throw new Error(`Support inquiry with ${id} not found`);
        supportInquiries[toUpdateIndex] = {...supportInquiries[toUpdateIndex], ...updates};
        return supportInquiries[toUpdateIndex];  
    },
    delete: (id: number) => {
        const lengthBefore = supportInquiries.length;
        supportInquiries = supportInquiries.filter(sI => sI.id !== id);
        if (lengthBefore !== supportInquiries.length)
            return true;
        else throw new Error(`Support inquiry with ${id} not found.`);     
    }
};