import axios from 'axios';
import type { UserState } from '../Models/UserState';
import type { UserSearchRequest } from './UserSearchRequest';

export class UserSearchClient {
    async execute(request : UserSearchRequest) : Promise<UserState[]> {
        const client = axios.create({
            baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
            params: request
        });

        const response = await client.get('/Users/search');
        return response.data;
    }
}