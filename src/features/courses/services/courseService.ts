import { coursesApi } from "../../../fakeServer/api/coursesApi";
import type { Course } from "../../../types/Course";

export const courseService = {
    getAll: () => coursesApi.getAll(),
    getById: (id: number) => coursesApi.getById(id),
    create: (course: Omit<Course, 'id'>) => coursesApi.create(course),
    update: (id: number, updates: Partial<Course>) => coursesApi.update(id, updates),
    delete: (id: number) => coursesApi.delete(id),
}