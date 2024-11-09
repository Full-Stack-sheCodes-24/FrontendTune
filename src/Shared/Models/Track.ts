import type { SpotifyAlbumDTO } from "./SpotifyAlbumDTO"

export interface Track {
    name: string
    uri: string
    href: string
    id: string
    album: SpotifyAlbumDTO
    preview_url: string | null
}