import axios from 'axios';
import { useUserStateStore } from '../UserStateStore';
import type { UserSettingsRequest } from './UserSettingsRequest';

export class UserSettingsClient {
    async execute(request : UserSettingsRequest) {
        const userState = useUserStateStore();
        await userState.checkAccessToken();
        const token = userState.auth.accessToken;

        const client = axios.create({
            baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        const response = await client.put(`/Users/settings`, request);
        return response.data;
    }
}