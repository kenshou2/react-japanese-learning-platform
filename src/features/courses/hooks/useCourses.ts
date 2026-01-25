import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Course } from "../../../types/Course";
import { courseService } from "../services/courseService";

export const useCourses = () => {
    return useQuery({
        queryKey: ['courses'],
        queryFn: courseService.getAll,
    });
}

export const useCourse = (id: number) => {
    return useQuery({
        queryKey: ['course', id],
        queryFn: () => courseService.getById(id),
    });
}

export const useCreateCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (course: Omit<Course, 'id'>) => courseService.create(course),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['courses']}),
    })
}

export const useUpdateCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, updates}: {id: number, updates: Partial<Course>}) => courseService.update(id, updates),
        onSuccess: (_data, variables) => queryClient.invalidateQueries({queryKey: ['course', variables.id]}),
    })
}

export const useDeleteCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => courseService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['courses']}),
    })
}