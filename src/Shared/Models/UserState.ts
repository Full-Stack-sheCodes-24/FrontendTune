import type { Entry } from './Entry'
import type { FollowRequest } from './FollowRequest';

export interface UserState {
    id: string,
    name: string,
    profilePicUrl: string;
    bioText: string;
    birthday: Date;
    entries: Entry[];
    auth: {
        accessToken: string,
        refreshToken: string,
        expiresIn: number,
        expiryDate: Date
    };
    settings: {
        theme: string;
        isPrivate: boolean;
    }
    followers: string[];
    following: string[];
    followRequests: FollowRequest[];
}