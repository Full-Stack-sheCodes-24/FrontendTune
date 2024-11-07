import type { Entry } from './Entry'

export interface UserState {
    id: string,
    name: string,
    profilePicUrl: string;
    entries: Entry[];
}