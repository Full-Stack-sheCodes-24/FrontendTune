<style scoped src="./Feed.css"></style>
<template>
    <div class="home-container">
        <div class="left-column">
            <div class="entries-container">
                <CreateEntry/>
                <div v-if="loading" class="refreshing-container card">
                    <p>Refreshing feed...</p>
                </div>
                <FeedEntry v-for="entry in getFeedWithDate"
                    :key="entry.date.getTime()"
                    :entry="entry">
                </FeedEntry>
                <div class="no-friends card" v-if="!loading && getFeedWithDate.length === 0">
                    <h2>Uh Oh! You're not following anyone yet!</h2>
                    <p>Search for your friends and follow them to see their posts here.</p>
                </div>
            </div>
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
            <div class="card">
                <h2>Following</h2>
            </div>
            <div class="contact-list">
                <ContactCard class="contact-item" v-for="contact in contacts" :key="contact.id"
                    :id="contact.id"
                    :profile-pic-url="contact.profilePicUrl"
                    :name="contact.name"
                    :bio-text="contact.bioText">
                </ContactCard>
            </div>
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
import { useToastStore } from '@/Shared/Toast/ToastStore';
import { ToastType } from '@/Shared/Toast/Toast';
import { UserGetClient } from '@/Shared/Clients/UserGetClient';
import ContactCard from '../ContactCard/ContactCard.vue';
import type { Contact } from '@/Shared/Models/Contact';
import { useCachedUserStore } from '@/Shared/CachedUserStore';
import type { OtherUserState } from '@/Shared/Models/OtherUserState';

const userState = useUserStateStore();
const feedStore = useFeedStore();
const cachedUser = useCachedUserStore();
const toast = useToastStore();
// use entries from getter instead so that date is a date object
const { getFeedWithDate } = storeToRefs(feedStore);
const loading = ref(true);
const contacts = ref<Contact[]>([]);

onMounted(async () => {
    loading.value = true;
    const client = new UserGetFeedClient();
    // Get feed
    client.execute().then(response => {
        feedStore.feed = response;
    }).catch(error => {
        console.log(error);
        toast.addToast('Error fetching feed. Try again later.', ToastType.error);
    }).finally(() => {
        loading.value = false;
    });

    // Get contacts and get/set cache
    const getClient = new UserGetClient();
    for (const id of userState.following) {
        if (cachedUser.cache.has(id)) {
            const user = cachedUser.cache.get(id) as OtherUserState;
            addContact(user);
        } else {
            getClient.execute(id).then(response => {
                addContact(response);
                cachedUser.cache.set(response.id, response);
            }).catch(error => {
                console.log(error);
            });
        }
    }
});

function addContact(user : OtherUserState) {
    contacts.value.push({
        id: user.id,
        profilePicUrl: user.profilePicUrl,
        name: user.name,
        bioText: user.bioText
    });
}
</script>