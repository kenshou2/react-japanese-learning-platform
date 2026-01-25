import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userDeckService } from "../services/userDeckService";
import type { UserDeck } from "../../../types/UserDeck";

export const useUserDecks = () => {
    return useQuery({
        queryKey: ['userDecks'],
        queryFn: userDeckService.getAll,
    });
}

export const useUserDeck = (id: number | null) => {
    return useQuery({
        queryKey: ["userDeck", id],
        queryFn: () => userDeckService.getById(id!),
        enabled: !!id,
    });
}

export const useCreateUserDeck = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUserDeck: Omit<UserDeck, 'id'>) =>
            userDeckService.create(newUserDeck),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userDecks'] }),
    });
};

export const useUpdateUserDeck = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updates }: { id: number; updates: Partial<UserDeck> }) =>
            userDeckService.update(id, updates),
        onSuccess: (_data, variables) => queryClient.invalidateQueries({ queryKey: ['userDeck', variables.id] }),
    });
};

export const useDeleteUserDeck = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => userDeckService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userDecks'] }),
    });
};

export const useGetUserDecks = (userId: number | null) => {
    return useQuery({
        queryKey: ["userDecks", userId],
        queryFn: () => userDeckService.getUserDecks(userId!),
        enabled: !!userId,
    });
}