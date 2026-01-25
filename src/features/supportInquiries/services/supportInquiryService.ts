import { supportInquiriesApi } from "../../../fakeServer/api/supportInquiriesApi";
import type { SupportInquiry } from "../../../types/SupportInquiry";

export const supportInquiryService = {
    getAll: () => supportInquiriesApi.getAll(),
    getById: (id: number) => supportInquiriesApi.getById(id),
    create: (inquiry: Omit<SupportInquiry, 'id'>) => supportInquiriesApi.create(inquiry),
    update: (id: number, updates: Partial<SupportInquiry>) => supportInquiriesApi.update(id, updates),
    delete: (id: number) => supportInquiriesApi.delete(id),    
}