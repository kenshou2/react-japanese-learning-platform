import type { CourseDetail } from '../../types/CourseDetail';
import { simulateDelay } from '../../utils/sumulateDelay';
import { courseDetailsDb } from '../db/courseDetails'

export const courseDetailsApi = {
    getAll: async (): Promise<CourseDetail[]> => {
        return simulateDelay(courseDetailsDb.getAll());
    },
    getById: async (id: number): Promise<CourseDetail> => {
        return simulateDelay(courseDetailsDb.getById(id));
    },
    create: async (courseDetail: Omit<CourseDetail, 'id'>): Promise<CourseDetail> => {
        return simulateDelay(courseDetailsDb.create(courseDetail));
    },
    update: async (id: number, updates: Partial<CourseDetail>): Promise<CourseDetail> => {
        return simulateDelay(courseDetailsDb.update(id, updates));
    },
    delete: async (id: number): Promise<void> => {
        const deleted = courseDetailsDb.delete(id);
        if (!deleted) throw new Error("Not found");
        return simulateDelay(undefined);
    },
}