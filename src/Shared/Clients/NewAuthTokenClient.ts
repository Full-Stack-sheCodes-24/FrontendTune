import axios from 'axios';
import type { NewAuthTokenResponse } from './NewAuthTokenResponse';
import { useUserStateStore } from '../UserStateStore';

export class NewAuthTokenClient {
    async execute() : Promise<NewAuthTokenResponse> {
        const userStateStore = useUserStateStore()
        const client = axios.create({
            baseURL: `${import.meta.env.VITE_BACKEND_URL}`
        });

        const response = await client.put(`/Jwt/refresh/`, {
            userId : userStateStore.id,
            accessToken : userStateStore.auth.accessToken,
            refreshToken : userStateStore.auth.refreshToken
        });
        return response.data;
    }
}