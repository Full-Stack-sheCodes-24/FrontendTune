import type { Track } from "./Track";

export interface FeedEntry {
    id: string,
    name: string,
    profilePicUrl: string;
    text: string;
    likes: number;
    track: Track;
    date: Date;
}