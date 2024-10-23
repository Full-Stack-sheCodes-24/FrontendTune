import type { SpotifyArtistDTO } from "./SpotifyArtistDTO";
import type { SpotifyImageDTO } from "./SpotifyImageDTO";

export interface SpotifyAlbumDTO {
    album_type: string;
    artists: SpotifyArtistDTO[];
    available_markets: string[];
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: SpotifyImageDTO[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: "album";
    uri: string;
}