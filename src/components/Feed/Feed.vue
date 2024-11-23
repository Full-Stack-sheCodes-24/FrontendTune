<style scoped src="./Feed.css"></style>
<template>
    <div class="home-container">
        <div class="left-column">
            <div class="entries-container">
                <CreateEntry/>
                <FeedEntry v-for="entry in getFeedWithDate"
                    :key="entry.date.getTime()"
                    :entry="entry">
                </FeedEntry>
                <div class="no-friends card" v-if="!loading && getFeedWithDate.length === 0">
                    <h2>Uh Oh! You're not following anyone yet!</h2>
                    <p>Search for your friends and follow them to see their posts here.</p>
                </div>
            </div>
            <LoadingSpinner v-if="loading"></LoadingSpinner>
        </div>
        <div class="right-column">
            <ProfileSection
                :is-owner="true"
                :profile-pic-url="userState.profilePicUrl"
                :name="userState.name"
                :bio-text="userState.bioText"
                :birthday="userState.getBirthdayAsDate"
                :following="userState.following?.length"
                :followers="userState.followers?.length">
            </ProfileSection>
        </div>
    </div>
</template>
<script setup lang="ts">
import ProfileSection from '@/components/ProfileSection/ProfileSection.vue';
import CreateEntry from '@/components/CreateEntry/CreateEntry.vue';
import { useUserStateStore } from '@/Shared/UserStateStore';
import { storeToRefs } from 'pinia';
import FeedEntry from './FeedEntry/FeedEntry.vue';
import { onMounted, ref } from 'vue';
import { UserGetFeedClient } from '@/Shared/Clients/UserGetFeedClient';
import { useFeedStore } from './FeedStore';
import LoadingSpinner from '@/Shared/LoadingSpinner/LoadingSpinner.vue';
import { useToastStore } from '@/Shared/Toast/ToastStore';
import { ToastType } from '@/Shared/Toast/Toast';

const userState = useUserStateStore();
const feedStore = useFeedStore();
const toast = useToastStore();
// use entries from getter instead so that date is a date object
const { getFeedWithDate } = storeToRefs(feedStore);
const loading = ref(true);

onMounted(async () => {
    const client = new UserGetFeedClient();
    // Get feed
    await client.execute().then(response => {
        feedStore.feed = response;
    }).catch(error => {
        console.log(error);
        toast.addToast('Error fetching feed. Try again later.', ToastType.error);
    }).finally(() => {
        loading.value = false;
    });
});
</script>