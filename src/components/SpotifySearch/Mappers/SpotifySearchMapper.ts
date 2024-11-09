import type { SpotifySearchResponse } from "../../../Shared/Clients/SpotifySearchResponse";
import type { Track } from "../../../Shared/Models/Track";

export class SpotifySearchMapper {
    searchResponseToTracks(response : SpotifySearchResponse) : Track[] {
        var results : Track[] = [];
        response.tracks.items.forEach(spotifyTrackDTO => {
            results.push({
                name: spotifyTrackDTO.name,
                uri: spotifyTrackDTO.uri,
                href: spotifyTrackDTO.href,
                id: spotifyTrackDTO.id,
                album: spotifyTrackDTO.album
            } as Track);
        });

        return results;
    }
}