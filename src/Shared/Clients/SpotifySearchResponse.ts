import type { SpotifyTrackDTO } from "../Models/SpotifyTrackDTO";

export interface SpotifySearchResponse {
    tracks: {
        href: string;
        items: SpotifyTrackDTO[];
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
    };
}