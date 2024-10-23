import type { SpotifyAlbumDTO } from "./SpotifyAlbumDTO";
import type { SpotifyArtistDTO } from "./SpotifyArtistDTO";

export interface SpotifyTrackDTO {
    album: SpotifyAlbumDTO;
    artists: SpotifyArtistDTO[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
      isrc: string;
    };
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: "track";
    uri: string;
}