import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userCourseService } from "../services/userCourseService";
import type { UserCourse } from "../../../types/UserCourse";

export const useUserCourses = () => {
    return useQuery({
        queryKey: ['userCourses'],
        queryFn: userCourseService.getAll,
    });
}

export const useUserCourse = (id: number | null) => {
    return useQuery({
        queryKey: ["userCourse", id],
        queryFn: () => userCourseService.getById(id!),
        enabled: !!id,
    });
}

export const useCreateUserCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUserCourse: Omit<UserCourse, 'id'>) =>
            userCourseService.create(newUserCourse),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userCourses'] }),        
    });
};

export const useUpdateUserCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updates }: { id: number; updates: Partial<UserCourse> }) =>
            userCourseService.update(id, updates),
        onSuccess: (_data, variables) => queryClient.invalidateQueries({ queryKey: ['userCourse', variables.id] }),
    });
};

export const useDeleteUserCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => userCourseService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userCourses'] }),
    });
};

export const useGetUserCourses = (userId: number | null) => {
    return useQuery({
        queryKey: ["userCourses", userId],
        queryFn: () => userCourseService.getUserCourses(userId!),
        enabled: !!userId,
    });
}