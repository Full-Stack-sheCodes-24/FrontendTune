import axios from 'axios';
import type { SpotifySearchRequest } from './SpotifySearchRequest';
import type { SpotifySearchResponse } from './SpotifySearchResponse';

export class SpotifySearchClient {
    async execute(request : SpotifySearchRequest) : Promise<SpotifySearchResponse> {
        const client = axios.create({
            baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
            params: request
        });

        const response = await client.get('/Spotify/search');
        return response.data;
    }
}