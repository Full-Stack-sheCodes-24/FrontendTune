import axios from 'axios';
import type { SpotifyLoginRequest } from './SpotifyLoginRequest';
import type { UserState } from '../Models/UserState';

export class SpotifyLoginClient {
    async execute(request : SpotifyLoginRequest) : Promise<UserState> {
        const client = axios.create({
            baseURL: `${import.meta.env.VITE_BACKEND_URL}`
        });

        const response = await client.get(`/Spotify/login/${request.authorizationCode}`);
        return response.data;
    }
}
