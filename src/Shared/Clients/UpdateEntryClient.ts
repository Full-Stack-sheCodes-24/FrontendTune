import axios from 'axios';
import { useUserStateStore } from '../UserStateStore';
import type { UpdateEntryClientRequest } from './UpdateEntryClientRequest';

export class UpdateEntryClient { //reference how backend setup API, get userid from local storage
    async execute(request: UpdateEntryClientRequest)  {
        const userState = useUserStateStore();
        await userState.checkAccessToken();
        const token = userState.auth.accessToken;

        if (!token) {
            console.error("Token not found in user state");
            return;
        }

        const client = axios.create({
            baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const response = await client.put(`/Users/entries`, request);
        return response.data;
    }
}