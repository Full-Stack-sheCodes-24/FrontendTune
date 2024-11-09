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
      <textarea placeholder="Write about your day..." class="entry-textarea"></textarea>
      <SpotifySearch></SpotifySearch>

      <!-- Post button -->
      <button @click="postEntry" class="post-button">Post</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SpotifySearch from '@/components/SpotifySearch/SpotifySearch.vue';

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const postEntry = () => {
  closeModal();
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
  