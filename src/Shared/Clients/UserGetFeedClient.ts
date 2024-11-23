import axios from 'axios';
import type { FeedEntry } from '../Models/FeedEntry';
import { useUserStateStore } from '../UserStateStore';

export class UserGetFeedClient {
    async execute() : Promise<FeedEntry[]> {
        const userState = useUserStateStore();
        await userState.checkAccessToken();
        const token = userState.auth.accessToken;

        const client = axios.create({
            baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        const response = await client.get(`/Users/feed`);
        return response.data;
    }
}