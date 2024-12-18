import axios from 'axios';
import type { SpotifySearchRequest } from './SpotifySearchRequest';
import type { SpotifySearchResponse } from './SpotifySearchResponse';
import { useUserStateStore } from '../UserStateStore';

export class SpotifySearchClient {
    async execute(request : SpotifySearchRequest) : Promise<SpotifySearchResponse> {
        const userState = useUserStateStore();
        await userState.checkAccessToken();
        const token = userState.auth.accessToken;

        const client = axios.create({
            baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
            params: request,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        const response = await client.get('/Spotify/search');
        return response.data;
    }
}