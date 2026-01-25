import { courseDetailsApi } from "../../../fakeServer/api/courseDetailsApi";
import type { CourseDetail } from "../../../types/CourseDetail";

export const courseDetailsService = {
    getAll: () => courseDetailsApi.getAll(),
    getById: (id: number) => courseDetailsApi.getById(id),
    create: (courseDetails: Omit<CourseDetail, 'id'>) => courseDetailsApi.create(courseDetails),
    update: (id: number, updates: Partial<CourseDetail>) => courseDetailsApi.update(id, updates),
    delete: (id: number) => courseDetailsApi.delete(id),
}