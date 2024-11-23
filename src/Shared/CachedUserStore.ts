import { defineStore } from 'pinia'
import type { OtherUserState } from './Models/OtherUserState';

export const useCachedUserStore = defineStore('cachedUserStore', {
    state: () => ({
        cache: new Map<string, OtherUserState>()
    })
});