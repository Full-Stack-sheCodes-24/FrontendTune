import type { FeedEntry } from '@/Shared/Models/FeedEntry';
import { defineStore } from 'pinia'

export const useFeedStore = defineStore('feedStore', {
    state: () => ({
        feed: <FeedEntry[]>[]
    }),
    getters: {
        getFeedWithDate: (state) => {
            if (state.feed === null || state.feed?.length === 0) return [];
            const feed = state.feed.map(entry => ({
                ...entry,
                date: new Date(entry.date) // date strings are converted back to Date objects in order to use getTime()
            }));
            return feed;
        }
    }
});