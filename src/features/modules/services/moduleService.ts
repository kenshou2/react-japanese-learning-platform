import { modulesApi } from "../../../fakeServer/api/coursesApi";
import type { Module } from "../../../types/Course";

export const moduleService = {
    getAll: () => modulesApi.getAll(),
    getById: (id: number) => modulesApi.getById(id),
    getCourseModules: (courseId: number) => modulesApi.getCourseModules(courseId),
    create: (module: Omit<Module, 'id'>) => modulesApi.create(module),
    update: (id: number, updates: Partial<Module>) => modulesApi.update(id, updates),
    delete: (id: number) => modulesApi.delete(id),
}