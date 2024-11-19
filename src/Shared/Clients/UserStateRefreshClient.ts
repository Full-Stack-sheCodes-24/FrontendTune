import axios from 'axios';
import type { UserState } from '../Models/UserState';
import { useUserStateStore } from '../UserStateStore';

export class UserStateRefreshClient {
    async execute(userId : string) : Promise<UserState> {
        const userState = useUserStateStore();
        await userState.checkAccessToken();
        const token = userState.auth.accessToken;

        const client = axios.create({
            baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        const response = await client.get(`/Users/${userId}/refresh`);
        return response.data;
    }
}