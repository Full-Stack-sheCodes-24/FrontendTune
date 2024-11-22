import axios from 'axios';
import { useUserStateStore } from '../UserStateStore';

export class UserAcceptFollowClient {
    async execute(userIdToAccept : string) {
        const userState = useUserStateStore();
        await userState.checkAccessToken();
        const token = userState.auth.accessToken;

        const client = axios.create({
            baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        const response = await client.put(`/Users/accept/${userIdToAccept}`);
        return response.data;
    }
}