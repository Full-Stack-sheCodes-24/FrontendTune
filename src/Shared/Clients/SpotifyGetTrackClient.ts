import axios from 'axios';
import type { SpotifyTrackDTO } from '../Models/SpotifyTrackDTO';

export class SpotifyGetTrackClient {
    async execute(trackId : String) : Promise<SpotifyTrackDTO> {
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

        const response = await client.get(`/Spotify/track/${trackId}/${userId}`);
        return response.data;
    }
}