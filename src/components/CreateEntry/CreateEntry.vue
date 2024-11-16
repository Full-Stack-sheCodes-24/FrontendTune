<style src="./CreateEntry.css"></style>
<template>
  <div @click="openModal" class="create-entry-container card">
    <h1>Whats your mood today?</h1>
    <p>Start an Entry</p>
  </div>

  <div v-if="isModalOpen" class="entry-modal" @click.self="closeModal">
    <div class="modal-content">
      <button @click="closeModal" class="close-button">×</button>
      <h1>Create an Entry</h1>  
      <textarea v-model="entryText" placeholder="Write about your day..." class="entry-textarea"></textarea>
      
      <SpotifySearch></SpotifySearch>



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
const userStateStore = useUserStateStore();


const isModalOpen = ref(false);
const entryText = ref('');
const selectedTrack = ref({ name: "Some Track", uri: "some-uri", href: "some-href", id: "some-id" });

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

//const postEntry = () => {
  //closeModal();
//};

const createEntryClient = new CreateEntryClient(); //initialize CreateEntryClient


// Function to post the entry
const postEntry = async () => {
  // Check if there's any content to post
  if (!entryText.value.trim()) {
    console.log("Empty entry.");
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
    
    console.log("Entry posted successfully");

    userStateStore.entries.push(newEntry);  // Update the store to reflect the new entry

    // Clear entry text and close the modal after successful submission
    entryText.value = '';
    closeModal();
  } catch (error) {
    console.error("Failed to post entry:", error);
  }
};


</script> 
  
 <!-- Props and data
const isModalOpen = ref(false);
const entryText = ref('');
const selectedTrack = ref({ name: "Some Track", uri: "some-uri", href: "some-href", id: "some-id" });

// Emitting `add-entry` w/ new entry details
const postEntry = () => {
  if (entryText.value.trim()) {
    const newEntry: Entry = {
      track: selectedTrack.value,
      text: entryText.value,
      date: new Date()
    };
    emit("add-entry", newEntry);
    entryText.value = '';
    closeModal();
  }
}; -->
  