import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../services/userService";
import type { AccountUpdate, ProfileUpdate, ProgressUpdate, UserRegistration } from "../../../fakeServer/db/users";

export const useUser = (id: number) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: () => userService.getById(id),
    });
}

export const useCreateUser = () => {    
    return useMutation({
        mutationFn: (user: UserRegistration) => userService.create(user),        
    });
}

export const useUpdateUserAccount = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, updates}: {id: number, updates: AccountUpdate}) => userService.updateAccount(id, updates),
        onSuccess: (_data, variables) => queryClient.invalidateQueries({queryKey: ['user', variables.id]}),
    });
}

export const useUpdateUserProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, updates}: {id: number, updates: ProfileUpdate}) => userService.updateProfile(id, updates),
        onSuccess: (_data, variables) => queryClient.invalidateQueries({queryKey: ['user', variables.id]}),
    });
}

export const useUpdateUserProgress = () => {    
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, updates}: {id: number, updates: ProgressUpdate}) => userService.updateProgress(id, updates),
        onSuccess: (_data, variables) => queryClient.invalidateQueries({queryKey: ['user', variables.id]}),
    });
}

export const useGetUserProgress = (id: number) => {
    return useQuery({
        queryKey: ['userProgress'],
        queryFn: () => userService.getProgress(id),
    })
}

export const useDeleteUser = () => {   
    const queryClient = useQueryClient(); 
    return useMutation({
        mutationFn: (id: number) => userService.delete(id),
        onSuccess: (_data, id) => {
            queryClient.invalidateQueries({ queryKey: ['user', id] });        
        },
    });
}