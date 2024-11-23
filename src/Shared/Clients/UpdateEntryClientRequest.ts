import type { Track } from "../Models/Track";

export interface UpdateEntryClientRequest {
    entryText?: string;
    entryTrack?: Track;
    isPinned?: boolean;
}