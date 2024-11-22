import axios from 'axios';
import type { SpotifySearchRequest } from './SpotifySearchRequest';
import type { SpotifySearchResponse } from './SpotifySearchResponse';
import { useUserStateStore } from '../UserStateStore';

export class SpotifySearchV2Client {
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

        const response = await client.get(`/Spotify/search/v2`);
        return response.data;
    }
}