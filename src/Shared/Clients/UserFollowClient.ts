import axios from 'axios';
import { useUserStateStore } from '../UserStateStore';

export class UserFollowClient {
    async execute(userIdToFollow : string) {
        const userState = useUserStateStore();
        await userState.checkAccessToken();
        const token = userState.auth.accessToken;

        const client = axios.create({
            baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        const response = await client.put(`/Users/follow/${userIdToFollow}`);
        return response.data;
    }
}