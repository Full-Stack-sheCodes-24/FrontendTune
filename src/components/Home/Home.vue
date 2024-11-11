<style>@import'./Home.css';</style>
<template>
    <div class="home-container">
        <div class="left-column">
            <ProfileSection
                :is-owner="true"
                :profile-pic-url="userStateStore.profilePicUrl"
                :name="userStateStore.name"
                :bio-text="userStateStore.bioText"
                :birthday="userStateStore.birthday">
            </ProfileSection>
            <div class="entries-container">
                <CreateEntry/>
                <div v-for="entry in entries">
                    <EntryItem :entry="entry"></EntryItem>
                </div>
            </div>
        </div>
        <div class="right-column">
            <Calender/>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import ProfileSection from '@/components/ProfileSection/ProfileSection.vue';
import CreateEntry from '@/components/CreateEntry/CreateEntry.vue';
import EntryItem from '@/components/EntryItem/EntryItem.vue';
import Calender from '@/components/Calender/Calender.vue';
import type { Entry } from '@/Shared/Models/Entry';
import { useUserStateStore } from '@/Shared/UserStateStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStateStore = useUserStateStore();

const exampleBioText = "this is my profile information";
const exampleBirthday = new Date();

const entries = ref([] as Entry[]);

const addEntry = (newEntry: Entry) => {
  entries.value.unshift(newEntry); // Adds new entry to beginning of the array
};

onBeforeMount(() => {
    const userState = localStorage.getItem("user_state");

    // If userState does NOT exist in localStorage, reroute to login page
    if (userState == null) {
        router.push({ name: 'Login' });
    }
    // otherwise, load the local storage if the userStateStore hasn't already been loaded.
    if (userStateStore.id != null) {
        userStateStore.$patch(JSON.parse(userState!));
    }
});

onMounted(async () => {
    //Get entries from backend API
    //Hardcode example entries for now
    entries.value.push({
        track: {
            name: "Touch",
            uri: "asdf",
            href: "qewr",
            id: "zxcv"
        },
        text: "what a great day! :D",
        date: new Date()
    });

    entries.value.push({
        track: {
            name: "APT",
            uri: "asdf",
            href: "qewr",
            id: "zxcv"
        },
        text: "what a horrible day! :(",
        date: new Date()
    });
});
</script>