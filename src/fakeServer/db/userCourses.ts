import type { User } from "../../types/User";
import type { UserCourse } from "../../types/UserCourse";
import { courseDetailsDb } from "./courseDetails";
import { lessonsDb } from "./courses";
import { usersDb } from "./users";

let userCourseId = 0;

let userCourses: UserCourse[] = populateUserCourses();

export const userCoursesDb = {
    getAll: () => [...userCourses],
    getById: (id: number) => {
        const userCourse = userCourses.find(uC => uC.id === id);
        if (!userCourse) throw new Error(`User course with id ${id} not found.`);
        return userCourse;
    },
    create: (userCourse: Omit<UserCourse, 'id'>) => {
        const newUserCourse: UserCourse = {
            id: userCourseId++,
            ...userCourse,
        };
        const userProgress = usersDb.getProgress(userCourse.userId);
        const lessons = lessonsDb.getCourseLessons(userCourse.courseId);
        if (!userProgress)
            throw new Error(`Error during the creation of a user course object.`);
        const updatedProgress: User['progress'] = {...userProgress, courseProgress: [
            ...userProgress.courseProgress,
            {
                courseId: userCourse.courseId,
                checkpoint: {
                    moduleId: lessons[0].moduleId,
                    lessonId: lessons[0].id,
                },
                currentHours: 0,
                currentProgress: 0,
            },
        ]};        
        usersDb.updateProgress(userCourse.userId, updatedProgress);
        userCourses.push(newUserCourse);
        return newUserCourse;
    },
    update: (id: number, updates: Partial<UserCourse>) => {
        const toUpdateIndex = userCourses.findIndex(uC => uC.id === id);
        if (toUpdateIndex === -1)
            throw new Error(`User course with ${id} not found.`);
        userCourses[toUpdateIndex] = {...userCourses[toUpdateIndex], ...updates};
        return userCourses[toUpdateIndex];
    },
    delete: (id: number) => {
        const lengthBefore = userCourses.length;
        userCourses = userCourses.filter(uC => uC.id !== id);
        if (lengthBefore !== userCourses.length)
            return true;
        else throw new Error(`User course with ${id} not found.`);        
    },
    getUserCourses: (userId: number) => {
        const courseIds = userCourses
            .filter(uC => uC.userId === userId)
            .map(uC => uC.courseId);
        let allCourseDetails = courseDetailsDb.getAll();
        const userCoursesList = allCourseDetails.filter(cD => courseIds.includes(cD.id));
        return userCoursesList;
    },
}

function populateUserCourses(): UserCourse[] {return [
    {id: userCourseId++, userId: 1, courseId: 0},        
]};