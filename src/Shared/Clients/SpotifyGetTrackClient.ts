import axios from 'axios';
import type { SpotifyTrackDTO } from '../Models/SpotifyTrackDTO';
import { useUserStateStore } from '../UserStateStore';

export class SpotifyGetTrackClient {
    async execute(trackId : String) : Promise<SpotifyTrackDTO> {
        const userState = useUserStateStore();
        const token = userState.auth.accessToken;
        const userId = userState.id;

        const client = axios.create({
            baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        const response = await client.get(`/Spotify/track/${trackId}/${userId}`);
        return response.data;
    }
}