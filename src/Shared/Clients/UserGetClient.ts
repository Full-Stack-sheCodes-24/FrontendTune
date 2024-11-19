import axios from 'axios';
import type { OtherUserState } from '@/Shared/Models/OtherUserState';

export class UserGetClient {
    async execute(userId : string) : Promise<OtherUserState> {
        const client = axios.create({
            baseURL: `${import.meta.env.VITE_BACKEND_URL}`
        });

        const response = await client.get(`/Users/${userId}`);
        return response.data;
    }
}