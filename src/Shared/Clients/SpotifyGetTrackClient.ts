import axios from 'axios';
import type { SpotifyTrackDTO } from '../Models/SpotifyTrackDTO';
import { useUserStateStore } from '../UserStateStore';

export class SpotifyGetTrackClient {
    async execute(trackId : String) : Promise<SpotifyTrackDTO> {
        const userState = useUserStateStore();
        await userState.checkAccessToken();
        const token = userState.auth.accessToken;

        const client = axios.create({
            baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        const response = await client.get(`/Spotify/track/${trackId}`);
        return response.data;
    }
}