import axios from 'axios';
import type { Entry } from '../Models/Entry';
import { useUserStateStore } from '../UserStateStore';


export class CreateEntryClient { //reference how backend setup API, get userid from local storage
    async execute(request : Entry)  {
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

        const response = await client.post(`/Users/entries`, request);
        return response.data;
    }
}