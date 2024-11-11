import axios from 'axios';
import type { UserUpdateProfileRequest } from './UserUpdateProfileRequest';

export class UserUpdateProfileClient {
    async execute(request : UserUpdateProfileRequest) {
        const userState = localStorage.getItem('user_state');
        const parsedUserState = JSON.parse(userState!);
        const token = parsedUserState.jwtToken;
        const userId = parsedUserState.id;

        const client = axios.create({
            baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        console.log(`/Users/${userId}/profile`);

        const response = await client.put(`/Users/${userId}/profile`, request);
        return response.data;
    }
}