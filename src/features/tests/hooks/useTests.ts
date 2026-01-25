import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { testService } from "../services/testService";
import type { Test } from "../../../types/Test";

export const useTests = () => {
    return useQuery({
        queryKey: ['tests'],
        queryFn: testService.getAll,
    });
}

export const useTest = (id: number) => {
    return useQuery({
        queryKey: ["test", id],
        queryFn: () => testService.getById(id!),
        enabled: !isNaN(id),
    });
}

export const useCreateTest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTest: Omit<Test, 'id'>) =>
            testService.create(newTest),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tests'] }),
    });
};

export const useUpdateTest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updates }: { id: number; updates: Partial<Test> }) =>
            testService.update(id, updates),
        onSuccess: (_data, variables) => queryClient.invalidateQueries({ queryKey: ['test', variables.id] }),
    });
};

export const useDeleteTest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => testService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tests'] }),
    });
};

export const useCourseTest = (courseId: number) => {    
    return useQuery({
        queryKey: ["courseTest", courseId],
        queryFn: () => testService.getCourseTest(courseId!),
        enabled: !isNaN(courseId),
    });
}