<style scoped src="./CreateEntry.css"></style>
<template>
  <div @click="openModal" class="create-entry-container card">
    <h1>Whats your mood today?</h1>
    <p>Start an Entry</p>
  </div>

  <div v-if="isModalOpen" class="entry-modal" @click.self="closeModal">
    <div class="modal-content">
      <button @click="closeModal" class="material-symbols-outlined close-button">close</button>
      <h1>Create an Entry</h1>  
      <textarea v-model="entryText" placeholder="Write about your day..." class="entry-textarea"></textarea>
      <SpotifySearch @update-selected-track="updateSelectedTrack"></SpotifySearch>
      <!-- Post button -->
      <button @click="postEntry" class="post-button">Post</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CreateEntryClient } from '@/Shared/Clients/CreateEntryClient'; 
import SpotifySearch from '@/components/SpotifySearch/SpotifySearch.vue';
import { useUserStateStore } from '@/Shared/UserStateStore';
import type { Entry } from '@/Shared/Models/Entry';
import type { Track } from '@/Shared/Models/Track';
import { useFeedStore } from '../Feed/FeedStore';

const userStateStore = useUserStateStore();
const feedStore = useFeedStore();
const createEntryClient = new CreateEntryClient(); //initialize CreateEntryClient

const isModalOpen = ref(false);
const entryText = ref('');
const selectedTrack = ref();

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

function updateSelectedTrack(newTrack : Track) {
  selectedTrack.value = newTrack;
}

// Function to post the entry
async function postEntry() {
  // Check if there's any content to post
  if (!entryText.value.trim()) {
    //console.log("Empty entry.");
    return;
  }

  // Construct the entry object to send
  const newEntry: Entry = {
    text: entryText.value,
    track: selectedTrack.value,
    date: new Date()
  };

  try {
    //execute the client to send the entry data
    await createEntryClient.execute(newEntry);
    
    //console.log("Entry posted successfully");

    userStateStore.entries.push(newEntry);  // Update the store to reflect the new entry
    
    // Add entry to the top of the feed
    feedStore.feed.push({
      id: userStateStore.id,
      profilePicUrl: userStateStore.profilePicUrl,
      name: userStateStore.name,
      text: newEntry.text,
      track: newEntry.track,
      likes: 0,
      date: newEntry.date
    });

    // Clear entry text and close the modal after successful submission
    entryText.value = '';
    closeModal();
  } catch (error) {
    console.error("Failed to post entry:", error);
  }
}

</script> 