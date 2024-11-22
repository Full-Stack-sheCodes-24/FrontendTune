import axios from 'axios';
import { useUserStateStore } from '../UserStateStore';
import type { UserState } from '../Models/UserState';

export class UserStateRefreshClient {
    async execute() : Promise<UserState> {
        const userState = useUserStateStore();
        await userState.checkAccessToken();
        const token = userState.auth.accessToken;

        const client = axios.create({
            baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        const response = await client.get(`/Users/refresh`);
        delete response.data.auth;  // Remove the auth field
        return response.data;
    }
}