import { defineStore } from 'pinia'
import type { UserState } from './Models/UserState';
import type { Entry } from './Models/Entry';
import { NewAuthTokenClient } from './Clients/NewAuthTokenClient';
import { HttpStatusCode } from 'axios';

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
            entries: [] as Entry[],
            auth: null!
        }
    },
    getters: {
        isLoggedIn: (state) => Boolean(state.id),
        getBirthdayAsDate: (state) => new Date(state.birthday),
        getExpiryAsDate: (state) => new Date(state.auth.expiryDate)
    },
    actions: {
        updateExpiryDate()
        {
            const currentDate = new Date();
            const currentMinutes = currentDate.getMinutes();
            const newMinutes = currentMinutes + this.auth.expiresIn;

            currentDate.setMinutes(newMinutes);
            this.auth.expiryDate = currentDate;
        },
        async checkAccessToken()
        {
            const currentDate = new Date();
            if(currentDate > this.getExpiryAsDate){
                const client = new NewAuthTokenClient();
                await client.execute().then(response => {
                    this.auth.expiresIn = response.expiresIn;
                    this.auth.accessToken = response.accessToken;
                    this.updateExpiryDate();
                }).catch(error => {
                    console.log(error.response.status);
                    if(error.response.status == HttpStatusCode.Unauthorized){
                        localStorage.removeItem("user_state");
                        this.$reset();
                        this.router.push({ name: 'Login' });
                    }
                });
            }
        }
    }
});