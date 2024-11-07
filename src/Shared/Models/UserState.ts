import type { Entry } from './Entry'

export interface UserState {
    id: string,
    name: string,
    profilePicUrl: string;
    profilePicCache: string;
    entries: Entry[];
}