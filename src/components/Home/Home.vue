<style scoped>@import'./Home.css';</style>
<template>
    <div class="home-container">
        <div class="left-column">
            <ProfileSection
                :is-owner="true"
                :profile-pic-url="userStateStore.profilePicUrl"
                :name="userStateStore.name"
                :bio-text="userStateStore.bioText"
                :birthday="userStateStore.getBirthdayAsDate"
                :following="userStateStore.following?.length"
                :followers="userStateStore.followers?.length">
            </ProfileSection>
            <div class="entries-container">
                <CreateEntry/>
                <EntryItem v-for="entry in getEntriesWithDate"
                    :key="entry.date.getTime()"
                    :entry="entry"
                    :is-owner="true"
                    @delete="deleteEntry">
                </EntryItem>
            </div>
        </div>
        <div class="right-column">
            <Calender :entries="getEntriesWithDate"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import ProfileSection from '@/components/ProfileSection/ProfileSection.vue';
import CreateEntry from '@/components/CreateEntry/CreateEntry.vue';
import EntryItem from '@/components/EntryItem/EntryItem.vue';
import Calender from '@/components/Calender/Calender.vue';
import { useUserStateStore } from '@/Shared/UserStateStore';
import { DeleteEntryClient } from '@/Shared/Clients/DeleteEntryClient';
import { storeToRefs } from 'pinia';
import { useFeedStore } from '../Feed/FeedStore';

const userStateStore = useUserStateStore();
const feedStore = useFeedStore();
//use entries from getter instead so that date is a date object
const { getEntriesWithDate } = storeToRefs(userStateStore);

async function deleteEntry(date: Date) {
    try {
        //execute the client to delete the entry data
        const deleteEntryClient = new DeleteEntryClient();
        await deleteEntryClient.execute({ date });
        
        //delete the entries from userStateStore and update it with the new updatedEntries
        const updatedEntries = userStateStore.getEntriesWithDate.filter(entry => {
            return entry.date.getTime() !== date.getTime();
        });
        userStateStore.entries = updatedEntries;
        //console.log("Entry deleted successfully");

        // Remove entry from feed
        feedStore.feed = feedStore.getFeedWithDate.filter(entry => (entry.id != userStateStore.id && entry.date != date));

    } catch (error) {
        console.error("Failed to delete entry:", error);
    }
};
</script>