import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type UserSubscription } from "../../../types/UserSubscription";
import { userSubscriptionService } from "../services/userSubscriptionService";

export const useUserSubscriptions = () => {
    return useQuery({
        queryKey: ['userSubscriptions'],
        queryFn: userSubscriptionService.getAll,
    });
}

export const useUserSubscription = (id: number | null) => {
    return useQuery({
        queryKey: ["userSubscription", id],
        queryFn: () => userSubscriptionService.getById(id!),
        enabled: !!id,
    });
}

export const useCreateUserSubscription = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newSubscription: Omit<UserSubscription, 'id'>) =>
            userSubscriptionService.create(newSubscription),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userSubscriptions'] }),
    });
};

export const useUpdateUserSubscription = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updates }: { id: number; updates: Partial<UserSubscription> }) =>
            userSubscriptionService.update(id, updates),
        onSuccess: (_data, variables) => queryClient.invalidateQueries({ queryKey: ['userSubscription', variables.id] }),
    });
};

export const useDeleteUserSubscription = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => userSubscriptionService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userSubscriptions'] }),
    });
};

export const useGetSubscriptionPrice = (userSubscription: UserSubscription | null) => {
    return useQuery({
        queryKey: ['subscriptionPrices'],
        queryFn: () => userSubscriptionService.getSubscriptionPrice(userSubscription!),
        enabled: !!userSubscription,
    })
}