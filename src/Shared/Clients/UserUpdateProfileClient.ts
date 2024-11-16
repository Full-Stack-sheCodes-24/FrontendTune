import axios from 'axios';
import type { UserUpdateProfileRequest } from './UserUpdateProfileRequest';
import { useUserStateStore } from '../UserStateStore';

export class UserUpdateProfileClient {
    async execute(request : UserUpdateProfileRequest) {
        const userState = useUserStateStore();
        await userState.checkAccessToken();
        const token = userState.auth.accessToken;
        const userId = userState.id;

        const client = axios.create({
            baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        const response = await client.put(`/Users/${userId}/profile`, request);
        return response.data;
    }
}