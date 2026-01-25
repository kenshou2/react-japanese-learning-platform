import { usersApi } from "../../../fakeServer/api/usersApi";
import type { AccountUpdate, ProfileUpdate, ProgressUpdate, UserRegistration } from "../../../fakeServer/db/users";

export const userService = {
    getById: (id: number) => usersApi.getById(id),
    create: (user: UserRegistration) => usersApi.create(user),
    updateAccount: (id: number, updates: AccountUpdate) => usersApi.updateAccount(id, updates),
    updateProfile: (id: number, updates: ProfileUpdate) => usersApi.updateProfile(id, updates),
    updateProgress: (id: number, updates: ProgressUpdate) => usersApi.updateProgress(id, updates),
    getProgress: (id: number) => usersApi.getProgress(id),
    delete: (id: number) => usersApi.delete(id),
}