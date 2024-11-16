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
    if (userState == null || JSON.parse(userState).id == null) {
        router.push({ name: 'Login' });
    }
    // otherwise, load the local storage if the userStateStore hasn't already been loaded.
    if (userStateStore.id != null) {
        userStateStore.$patch(JSON.parse(userState!));
    }
});

onMounted(async () => {
    entries.value = await fetchEntriesFromBackend();
    console.log("Fetched entries:", entries.value);
});



async function fetchEntriesFromBackend() {
  try {
    const userState = useUserStateStore();
    await userState.checkAccessToken();
    
    const userID = userState.id;
    const token = userState.auth.accessToken;

    if (!token) {
      console.error("Token not found in user state");
      return [];
    }

    // Construct the full API endpoint URL
    const baseURL = import.meta.env.VITE_BACKEND_URL;
    const endpoint = `${baseURL}/Users/${userID}/entries`;

    // Make the API request
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch entries: ${response.statusText}`);
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching entries from backend:", error);
    return [];
  }
}



</script>