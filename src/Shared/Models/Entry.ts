import type { Track } from "./Track";

export interface Entry {
    track: Track;
    likes: number;
    text: string;
    date: Date;
}