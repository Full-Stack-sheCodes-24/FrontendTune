export interface FollowRequest {
    fromUserId: string;
    toUserId: string;
    status: Status;
}

export enum Status {
    pending,
    success,
    fromBlocked,
    toBlocked,
    bothBlocked
}