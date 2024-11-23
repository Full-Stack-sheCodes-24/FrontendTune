import type { Track } from "./Track";

export interface Entry {
    track: Track;
    text: string;
    date: Date;
    isPinned?: boolean;
}