import type { Entry } from './Entry'

export interface UserState {
    userId: string,
    name: string,
    profilePicUrl: string;
    entries: Entry[];
}