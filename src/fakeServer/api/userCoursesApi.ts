import type { CourseDetail } from "../../types/CourseDetail";
import type { UserCourse } from "../../types/UserCourse";
import { simulateDelay } from "../../utils/sumulateDelay";
import { userCoursesDb } from "../db/userCourses";

export const userCoursesApi = {
    getAll: async (): Promise<UserCourse[]> => simulateDelay(userCoursesDb.getAll()),
    getById: async (id: number): Promise<UserCourse> => {
        return simulateDelay(userCoursesDb.getById(id));
    },
    create: async (userCourse: Omit<UserCourse, 'id'>): Promise<UserCourse> => {
        return simulateDelay(userCoursesDb.create(userCourse));
    },
    update: async (id: number, updates: Partial<UserCourse>): Promise<UserCourse> => {
        return simulateDelay(userCoursesDb.update(id, updates));
    },
    delete: async (id: number): Promise<void> => {
        const deleted = userCoursesDb.delete(id);
        if (!deleted) throw new Error("Not found");
        return simulateDelay(undefined);
    },
    getUserCourses: async (userId: number): Promise<CourseDetail[]> => {
        return simulateDelay(userCoursesDb.getUserCourses(userId));
    },
}