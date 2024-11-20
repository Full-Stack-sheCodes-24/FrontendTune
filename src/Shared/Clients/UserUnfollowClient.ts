import axios from 'axios';
import { useUserStateStore } from '../UserStateStore';

export class UserUnfollowClient {
    async execute(userIdToUnfollow : string) {
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

        const response = await client.put(`/Users/${userId}/unfollow/${userIdToUnfollow}`);
        return response.data;
    }
}