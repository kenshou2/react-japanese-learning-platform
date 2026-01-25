import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Lesson } from "../../../types/Course";
import { lessonService } from "../services/lessonService";

export const useLessons = () => {
    return useQuery({
        queryKey: ['lessons'],
        queryFn: lessonService.getAll,
    });
}

export const useLesson = (id: number) => {
    return useQuery({
        queryKey: ['lesson', id],
        queryFn: () => lessonService.getById(id),
    });
}

export const useModuleLessons = (moduleId: number | null) => {
    return useQuery({
        queryKey: ['moduleLessons', moduleId],
        queryFn: () => lessonService.getModuleLessons(moduleId!),
        enabled: typeof moduleId === "number" && !isNaN(moduleId),
    });
}

export const useCourseLessons = (courseId: number | null) => {
    return useQuery({
        queryKey: ['courseLessons', courseId],
        queryFn: () => lessonService.getCourseLessons(courseId!),
        enabled: typeof courseId === "number" && !isNaN(courseId),
    });
}

export const useLessonVocabulary = (lessonId: number | null) => {
    return useQuery({
        queryKey: ['lessonVocabulary', lessonId],
        queryFn: () => lessonService.getLessonVocabulary(lessonId!),
        enabled: typeof lessonId === "number" && !isNaN(lessonId),
    });
}

export const useLessonContent = (lessonId: number | null) => {
    return useQuery({
        queryKey: ['lessonContent', lessonId],
        queryFn: () => lessonService.getLessonContent(lessonId!),
        enabled: typeof lessonId === "number" && !isNaN(lessonId),
    });
}

export const useCreateLesson = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (lesson: Omit<Lesson, 'id'>) => lessonService.create(lesson),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['lessons']}),
    })
}

export const useUpdateLesson = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, updates}: {id: number, updates: Partial<Lesson>}) => lessonService.update(id, updates),
        onSuccess: (_data, variables) => queryClient.invalidateQueries({queryKey: ['lesson', variables.id]}),
    })
}

export const useDeleteLesson = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => lessonService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['lessons']}),
    })
}