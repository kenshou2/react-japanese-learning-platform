import { lessonsApi } from "../../../fakeServer/api/coursesApi";
import type { Lesson } from "../../../types/Course";

export const lessonService = {
    getAll: () => lessonsApi.getAll(),
    getById: (id: number) => lessonsApi.getById(id),
    getModuleLessons: (moduleId: number) => lessonsApi.getModuleLessons(moduleId),
    getCourseLessons: (courseId: number) => lessonsApi.getCourseLessons(courseId),
    getLessonVocabulary: (lessonId: number) => lessonsApi.getLessonVocabulary(lessonId),
    getLessonContent: (lessonId: number) => lessonsApi.getLessonContent(lessonId),
    create: (lesson: Omit<Lesson, 'id'>) => lessonsApi.create(lesson),
    update: (id: number, updates: Partial<Lesson>) => lessonsApi.update(id, updates),
    delete: (id: number) => lessonsApi.delete(id),
}