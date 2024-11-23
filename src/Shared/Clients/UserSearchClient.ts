import axios from 'axios';
import type { UserSearchRequest } from './UserSearchRequest';
import type { OtherUserState } from '../Models/OtherUserState';

export class UserSearchClient {
    async execute(request : UserSearchRequest) : Promise<OtherUserState[]> {
        const client = axios.create({
            baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
            params: request
        });

        const response = await client.get('/Users/search');
        return response.data;
    }
}