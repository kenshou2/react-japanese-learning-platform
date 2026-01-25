import { testimonialsApi } from "../../../fakeServer/api/testimonialsApi";
import type { Testimonial } from "../../../types/Testimonial";

export const testimonialService = {
    getAll: () => testimonialsApi.getAll(),
    getById: (id: number) => testimonialsApi.getById(id),
    create: (testimonial: Omit<Testimonial, 'id'>) => testimonialsApi.create(testimonial),
    update: (id: number, updates: Partial<Testimonial>) => testimonialsApi.update(id, updates),
    delete: (id: number) => testimonialsApi.delete(id),    
}