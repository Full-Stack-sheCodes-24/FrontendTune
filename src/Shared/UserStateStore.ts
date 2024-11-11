import { defineStore } from 'pinia'
import type { UserState } from './Models/UserState';
import type { Entry } from './Models/Entry';

export const useUserStateStore = defineStore('userState', {
    state: (): UserState => {
        // If user state is already in local storage, hydrate the pinia store
        if (localStorage.getItem('user_state')) return JSON.parse(localStorage.getItem('user_state')!);

        // Else, initialize the pinia store
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