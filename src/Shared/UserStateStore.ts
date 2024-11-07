import { defineStore } from 'pinia'
import type { UserState } from './Models/UserState';
import type { Entry } from './Models/Entry';

export const useUserStateStore = defineStore('userState', {
    state: (): UserState => {
        return {
            userId: null!,
            name: null!,
            profilePicUrl: null!,
            entries: [] as Entry[]
        }
    },
});