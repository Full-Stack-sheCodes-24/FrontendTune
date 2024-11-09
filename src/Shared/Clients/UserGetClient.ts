import axios from 'axios';
import type { UserState } from '@/Shared/Models/UserState';

export class UserGetClient {
    async execute(userId : string) : Promise<UserState> {
        const client = axios.create({
            baseURL: `${import.meta.env.VITE_BACKEND_URL}`
        });

        const response = await client.get(`/Users/${userId}`);
        return response.data;
    }
}