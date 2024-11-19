import { defineStore } from 'pinia'
import type { UserState } from './Models/UserState';
import type { Entry } from './Models/Entry';
import { NewAuthTokenClient } from './Clients/NewAuthTokenClient';
import { HttpStatusCode } from 'axios';
import { UserStateRefreshClient } from './Clients/UserStateRefreshClient';

export const useUserStateStore = defineStore('userState', {
    state: (): UserState => {
        // If user state is already in local storage, hydrate the pinia store
        if (localStorage.getItem('user_state')) {
            const parsedUserState = JSON.parse(localStorage.getItem('user_state')!);

            // Update theme
            if (parsedUserState.settings?.theme != null) {
                document.body.className = (`${parsedUserState.settings.theme}-theme`);
            }

            return parsedUserState;
        }

        // Else, initialize the pinia store
        return {
            id: null!,
            name: null!,
            profilePicUrl: null!,
            bioText: null!,
            birthday: null!,
            entries: [] as Entry[],
            auth: null!,
            settings: null!
        }
    },
    getters: {
        isLoggedIn: (state) => Boolean(state.id),
        getBirthdayAsDate: (state) => new Date(state.birthday),
        getExpiryAsDate: (state) => new Date(state.auth.expiryDate),
        getEntriesWithDate: (state) => {
            var Entries = state.entries
            for(let i = 0; i < Entries.length; i++){
                Entries[i].date = new Date(Entries[i].date)
            }
            return Entries
        }
    },
    actions: {
        updateExpiryDate() {
            const currentDate = new Date();
            const currentMinutes = currentDate.getMinutes();
            const newMinutes = currentMinutes + this.auth.expiresIn;

            currentDate.setMinutes(newMinutes);
            this.auth.expiryDate = currentDate;
        },
        async checkAccessToken() {
            const currentDate = new Date();
            if (currentDate > this.getExpiryAsDate){
                const client = new NewAuthTokenClient();
                await client.execute().then(response => {
                    this.auth.expiresIn = response.expiresIn;
                    this.auth.accessToken = response.accessToken;
                    this.updateExpiryDate();
                }).catch(error => {
                    console.log(error.response.status);
                    if (error.response.status === HttpStatusCode.Unauthorized){
                        localStorage.removeItem("user_state");
                        this.$reset();
                        this.router.push({ name: 'Login' });
                    }
                });
            }
        },
        updateTheme() {
            if (this.settings?.theme != null) {
                document.body.className = (`${this.settings.theme}-theme`);
            }
        },
        refreshUserState() {
            const client = new UserStateRefreshClient();

            // Do not await, allow refresh to run in the background asynchronously
            client.execute( this.id ).then(response => {
                this.$patch(response);
            }).catch(error => {
                console.log(error);
            });
        }
    }
});