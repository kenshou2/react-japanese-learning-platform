import type { Course, Lesson, Module } from "../../types/Course";
import { simulateDelay } from "../../utils/sumulateDelay";
import { coursesDb, modulesDb, lessonsDb, lessonContentsDb, lessonVocabularyDb } from "../db/courses";

export const coursesApi = {
    getAll: async (): Promise<Course[]> => {
        return simulateDelay(coursesDb.getAll());
    },
    getById: async (id: number): Promise<Course> => {
        return simulateDelay(coursesDb.getById(id));
    },
    create: async (course: Omit<Course, 'id'>): Promise<Course> => {
        return simulateDelay(coursesDb.create(course));
    },
    update: async (id: number, updates: Partial<Course>): Promise<Course> => {
        return simulateDelay(coursesDb.update(id, updates));
    },
    delete: async (id: number): Promise<void> => {
        const deleted = coursesDb.delete(id);
        if (!deleted) throw new Error("Not found");
        return simulateDelay(undefined);
    },
}

export const modulesApi = {
    getAll: async (): Promise<Module[]> => {
        return simulateDelay(modulesDb.getAll());
    },
    getById: async (id: number): Promise<Module> => {
        return simulateDelay(modulesDb.getById(id));
    },
    getCourseModules: async (courseId: number): Promise<Module[]> => {
        return simulateDelay(modulesDb.getCourseModules(courseId));
    },
    create: async (module: Omit<Module, 'id'>): Promise<Module> => {
        return simulateDelay(modulesDb.create(module));
    },
    update: async (id: number, updates: Partial<Module>): Promise<Module> => {
        return simulateDelay(modulesDb.update(id, updates));
    },
    delete: async (id: number): Promise<void> => {
        const deleted = modulesDb.delete(id);
        if (!deleted) throw new Error("Not found");
        return simulateDelay(undefined);
    },
}

export const lessonsApi = {
    getAll: async (): Promise<Lesson[]> => {
        return simulateDelay(lessonsDb.getAll());
    },
    getById: async (id: number): Promise<Lesson> => {
        return simulateDelay(lessonsDb.getById(id));
    },
    getCourseLessons: async (courseId: number): Promise<Lesson[]> => {        
        return simulateDelay(lessonsDb.getCourseLessons(courseId));
    },
    getModuleLessons: async (moduleId: number): Promise<Lesson[]> => {
        return simulateDelay(lessonsDb.getModuleLessons(moduleId));
    },
    getLessonVocabulary: (lessonId: number) => {
        return lessonVocabularyDb.getLessonVocab(lessonId);
    },
    getLessonContent: (lessonId: number) => {
        return lessonContentsDb.getLessonContent(lessonId);
    },
    create: async (lesson: Omit<Lesson, 'id'>): Promise<Lesson> => {
        return simulateDelay(lessonsDb.create(lesson));
    },
    update: async (id: number, updates: Partial<Lesson>): Promise<Lesson> => {
        return simulateDelay(lessonsDb.update(id, updates));
    },
    delete: async (id: number): Promise<void> => {
        const deleted = lessonsDb.delete(id);
        if (!deleted) throw new Error("Not found");
        return simulateDelay(undefined);
    },
}