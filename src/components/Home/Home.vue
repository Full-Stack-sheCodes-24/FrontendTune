<style>@import'./Home.css';</style>
<template>
    <div class="home-container">
        <div class="left-column">
            <ProfileSection
                :is-owner="true"
                :profile-pic-url="userStateStore.profilePicUrl"
                :name="userStateStore.name"
                :bio-text="userStateStore.bioText"
                :birthday="userStateStore.getBirthdayAsDate">
            </ProfileSection>
            <div class="entries-container">
                <CreateEntry/>
                <div v-for="entry in entries">
                    <EntryItem :entry="entry"></EntryItem>
                </div>
            </div>
        </div>
        <div class="right-column">
            <Calender :entries="userStateStore.entries"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onBeforeMount } from 'vue';
import ProfileSection from '@/components/ProfileSection/ProfileSection.vue';
import CreateEntry from '@/components/CreateEntry/CreateEntry.vue';
import EntryItem from '@/components/EntryItem/EntryItem.vue';
import Calender from '@/components/Calender/Calender.vue';
import { useUserStateStore } from '@/Shared/UserStateStore';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const router = useRouter();
const userStateStore = useUserStateStore();

const entries = userStateStore.getEntriesWithDate

onBeforeMount(() => {
    // If user is not logged in, reroute to Login page
    if (!userStateStore.isLoggedIn) {
        router.push({ name: 'Login' });
    }
});
</script>