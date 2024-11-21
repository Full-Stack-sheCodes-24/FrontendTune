import axios from 'axios';
import { useUserStateStore } from '../UserStateStore';

export class UserUnrequestClient {
    async execute(userIdToUnrequest : string) {
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

        const response = await client.put(`/Users/${userId}/unrequest/${userIdToUnrequest}`);
        return response.data;
    }
}