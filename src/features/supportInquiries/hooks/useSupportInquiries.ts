import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supportInquiryService } from "../services/supportInquiryService";
import type { SupportInquiry } from "../../../types/SupportInquiry";

export const useSupportInquiries = () => {
    return useQuery({
        queryKey: ['supportInquiries'],
        queryFn: supportInquiryService.getAll,
    });
}

export const useSupportInquiry = (id: number) => {
    return useQuery({
        queryKey: ["supportInquiry", id],
        queryFn: () => supportInquiryService.getById(id!),
        enabled: !isNaN(id),
    });
}

export const useCreateSupportInquiry = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newSupportInquiry: Omit<SupportInquiry, 'id'>) =>
            supportInquiryService.create(newSupportInquiry),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['supportInquiries'] }),
    });
};

export const useUpdateSupportInquiry = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updates }: { id: number; updates: Partial<SupportInquiry> }) =>
            supportInquiryService.update(id, updates),
        onSuccess: (_data, variables) => queryClient.invalidateQueries({ queryKey: ['supportInquiry', variables.id] }),
    });
};

export const useDeleteSupportInquiry = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => supportInquiryService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['supportInquiries'] }),
    });
};