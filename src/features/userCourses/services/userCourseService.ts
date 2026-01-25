import { userCoursesApi } from "../../../fakeServer/api/userCoursesApi";
import type { UserCourse } from "../../../types/UserCourse";

export const userCourseService = {
    getAll: () => userCoursesApi.getAll(),
    getById: (id: number) => userCoursesApi.getById(id),
    create: (newUserCourse: Omit<UserCourse, 'id'>) => userCoursesApi.create(newUserCourse),
    update: (id: number, updates: Partial<UserCourse>) => userCoursesApi.update(id, updates),
    delete: (id: number) => userCoursesApi.delete(id),
    getUserCourses: (userId: number) => userCoursesApi.getUserCourses(userId),
}