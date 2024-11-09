import axios from 'axios';
import type { SpotifySearchRequest } from './SpotifySearchRequest';
import type { SpotifySearchResponse } from './SpotifySearchResponse';

export class SpotifySearchV2Client {
    async execute(request : SpotifySearchRequest) : Promise<SpotifySearchResponse> {
        const userState = localStorage.getItem('user_state');
        const parsedUserState = JSON.parse(userState!);
        const token = parsedUserState.jwtToken;
        const userId = parsedUserState.id;

        const client = axios.create({
            baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
            params: request,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        const response = await client.get(`/Spotify/search/v2/${userId}`);
        return response.data;
    }
}