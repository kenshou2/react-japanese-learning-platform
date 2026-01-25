import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Module } from "../../../types/Course";
import { moduleService } from "../services/moduleService";

export const useModules = () => {
    return useQuery({
        queryKey: ['modules'],
        queryFn: moduleService.getAll,
    });
}

export const useModule = (id: number) => {
    return useQuery({
        queryKey: ['module', id],
        queryFn: () => moduleService.getById(id),
    });
}

export const useCourseModules = (courseId: number | null) => {    
    return useQuery({
        queryKey: ['courseModules', courseId],
        queryFn: () => moduleService.getCourseModules(courseId!),
        enabled: typeof courseId === "number" && !isNaN(courseId),
    });
}

export const useCreateModule = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (module: Omit<Module, 'id'>) => moduleService.create(module),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['modules']}),
    })
}

export const useUpdateModule = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, updates}: {id: number, updates: Partial<Module>}) => moduleService.update(id, updates),
        onSuccess: (_data, variables) => queryClient.invalidateQueries({queryKey: ['module', variables.id]}),
    })
}

export const useDeleteModule = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => moduleService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['modules']}),
    })
}