import type { Test } from "../../types/Test";
import { simulateDelay } from "../../utils/sumulateDelay";
import { testsDb } from "../db/tests";

export const testsApi = {
    getAll: async (): Promise<Test[]> => {
        return simulateDelay(testsDb.getAll());
    },
    getById: async (id: number): Promise<Test> => {
        return simulateDelay(testsDb.getById(id));
    },
    create: async (test: Omit<Test, 'id'>): Promise<Test> => {
        return simulateDelay(testsDb.create(test));
    },
    update: async (id: number, updates: Partial<Test>): Promise<Test> => {
        return simulateDelay(testsDb.update(id, updates));
    },
    delete: async (id: number): Promise<void> => {
        const deleted = testsDb.delete(id);
        if (!deleted) throw new Error("Not found");
        return simulateDelay(undefined);
    },
    getCourseTest: async (courseId: number): Promise<Test> => {
        return simulateDelay(testsDb.getCourseTest(courseId));
    },
}