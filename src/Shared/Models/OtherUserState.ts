import type { Entry } from './Entry'

export interface OtherUserState {
    id: string,
    name: string,
    profilePicUrl: string;
    bioText: string;
    birthday: Date;
    entries: Entry[];
    isPrivate: boolean;
    following: string[];
    followers: string[];
}