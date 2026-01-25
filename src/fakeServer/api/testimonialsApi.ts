import type { Testimonial } from "../../types/Testimonial";
import { simulateDelay } from "../../utils/sumulateDelay";
import { testimonialsDb } from "../db/testimonials";

export const testimonialsApi = {
    getAll: async (): Promise<Testimonial[]> => {
        return simulateDelay(testimonialsDb.getAll())
    },
    getById: async (id: number): Promise<Testimonial> => {
        return simulateDelay(testimonialsDb.getById(id));
    },
    create: async (testimonial: Omit<Testimonial, 'id'>): Promise<Testimonial> => {
        return simulateDelay(testimonialsDb.create(testimonial));
    },
    update: async (id: number, updates: Partial<Testimonial>): Promise<Testimonial> => {
        return simulateDelay(testimonialsDb.update(id, updates));
    },
    delete: async (id: number): Promise<void> => {
        const deleted = testimonialsDb.delete(id);
        if (!deleted) throw new Error("Not found");
        return simulateDelay(undefined);
    },
}