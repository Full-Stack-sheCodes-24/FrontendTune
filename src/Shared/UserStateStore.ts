import { defineStore } from 'pinia'
import type { UserState } from './Models/UserState';
import type { Entry } from './Models/Entry';

export const useUserStateStore = defineStore('userState', {
    state: (): UserState => {
        return {
            id: null!,
            name: null!,
            profilePicUrl: null!,
            bioText: null!,
            birthday: null!,
            entries: [] as Entry[]
        }
    },
    getters: {
        isLoggedIn: (state) => Boolean(state.id),
        getBirthdayAsDate: (state) => new Date(state.birthday)
    }
});