import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import { courseDetailsService } from "../services/courseDetailsService";
import type { CourseDetail } from "../../../types/CourseDetail";

export const useAllCourseDetails = () => {
    return useQuery({
        queryKey: ['allCourseDetails'],
        queryFn: courseDetailsService.getAll,
    });
}

export const useCourseDetails = (id: number) => {
    return useQuery({
        queryKey: ['courseDetails', id],
        queryFn: () => courseDetailsService.getById(id),
        enabled: !isNaN(id),
    });
}

export const useCreateCourseDetails = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newCourseDetails: Omit<CourseDetail, 'id'>) => 
            courseDetailsService.create(newCourseDetails),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['allCourseDetails']}),
    });
}

export const useUpdateCourseDetails = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, updates}: {id: number, updates: Partial<CourseDetail>}) => 
            courseDetailsService.update(id, updates),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['allCourseDetails']}),
    });
}

export const useDeleteCourseDetails = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => courseDetailsService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['allCourseDetails']}),
    });
}