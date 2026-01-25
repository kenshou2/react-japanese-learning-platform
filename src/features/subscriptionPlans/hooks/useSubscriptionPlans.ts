import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionPlansService } from "../services/subscriptionService";
import type { SubscriptionPlan } from "../../../types/SubscriptionPlan";

export const useSubscriptionPlans = () => {
    return useQuery({
        queryKey: ['subscriptionPlans'],
        queryFn: subscriptionPlansService.getAll,
    });
}

export const useSubscriptionPlan = (id: string | null) => {
    return useQuery({
        queryKey: ['subscriptionPlan', id],
        queryFn: () => subscriptionPlansService.getById(id!),
        enabled: !!id,
    });
}

export const useCreateSubscriptionPlan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (plan: SubscriptionPlan) => subscriptionPlansService.create(plan),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subscriptionPlans'] }),
    });
}

export const useUpdateSubscriptionPlan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updates }: {id: string, updates: Partial<SubscriptionPlan>}) => subscriptionPlansService.update(id, updates),
        onSuccess: (_data, variables) => queryClient.invalidateQueries({queryKey: ['subscriptionPlan', variables.id]}),
    });
}

export const useDeleteSubscriptionPlan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => subscriptionPlansService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subscriptionPlans'] }),
    });
}