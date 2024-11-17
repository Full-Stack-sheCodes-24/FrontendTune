import type { Track } from "./Track";

export interface Entry {
    id: string;
    track: Track;
    text: string;
    date: Date;
}