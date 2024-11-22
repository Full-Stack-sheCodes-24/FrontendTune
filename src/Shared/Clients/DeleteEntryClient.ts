import axios from 'axios';
import { useUserStateStore } from '../UserStateStore';


export class DeleteEntryClient { //reference how backend setup API, get userid from local storage
    async execute(request: {date: Date})  {
        const userState = useUserStateStore();
        await userState.checkAccessToken();
        const token = userState.auth.accessToken;
        const date = request.date

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

        const response = await client.delete(`/Users/entries/${date.toISOString()}`);
        return response.data;
    }
}