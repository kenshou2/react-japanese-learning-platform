import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { testimonialService } from "../services/testimonialService";
import type { Testimonial } from "../../../types/Testimonial";

export const useTestimonials = () => {
    return useQuery({
        queryKey: ['testimonials'],
        queryFn: testimonialService.getAll,
    });
}

export const useTestimonial = (id: number) => {
    return useQuery({
        queryKey: ["testimonial", id],
        queryFn: () => testimonialService.getById(id!),
        enabled: !isNaN(id),
    });
}

export const useCreateTestimonial = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTestimonial: Omit<Testimonial, 'id'>) =>
            testimonialService.create(newTestimonial),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['testimonials'] }),
    });
};

export const useUpdateTestimonial = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updates }: { id: number; updates: Partial<Testimonial> }) =>
            testimonialService.update(id, updates),
        onSuccess: (_data, variables) => queryClient.invalidateQueries({ queryKey: ['testimonial', variables.id] }),
    });
};

export const useDeleteTestimonial = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => testimonialService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['testimonials'] }),
    });
};