import type { SpotifyAlbumDTO } from "./SpotifyAlbumDTO"
import type { SpotifyImageDTO } from "./SpotifyImageDTO";

export interface Track {
    name: string
    uri: string
    href: string
    id: string
    album: SpotifyAlbumDTO
    preview_url: string | null
}