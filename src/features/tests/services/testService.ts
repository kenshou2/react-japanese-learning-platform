import { testsApi } from "../../../fakeServer/api/testsApi";
import type { Test } from "../../../types/Test";

export const testService = {
    getAll: () => testsApi.getAll(),
    getById: (id: number) => testsApi.getById(id),
    create: (test: Omit<Test, 'id'>) => testsApi.create(test),
    update: (id: number, updates: Partial<Test>) => testsApi.update(id, updates),
    delete: (id: number) => testsApi.delete(id),    
    getCourseTest: (courseId: number) => testsApi.getCourseTest(courseId),
}