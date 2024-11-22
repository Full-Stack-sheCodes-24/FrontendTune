import type { SpotifyAlbumDTO } from "./SpotifyAlbumDTO"
import type { SpotifyArtistDTO } from "./SpotifyArtistDTO"

export interface Track {
    name: string
    uri: string
    href: string
    id: string
    album: SpotifyAlbumDTO
    preview_url: string | null
    artist: SpotifyArtistDTO[];
    albumImageUrl: string | null
}