<style scoped>@import'./EntryItem.css';</style>
<template>
    <div class="entry-container card clickable"  :id="`entry-${new Date(entry.date).getTime()}`">
        <div class="entry-content">
        <h1 class= "output-text" v-text="entry.text"></h1>
        <div class="track-info">
            <p class="track-name">{{ entry.track.name }}</p>
            <div 
                v-if="entry.track.preview_url" 
                class="favicon-container" 
                @click="togglePlayback">
                <img src="/favicon.ico" alt="Play Icon" class="favicon-icon" />
            </div>
        </div>
        <div class="music-play" v-if="showPlayback">
            <audio controls autoplay loop
                ref="audioPlayer"
                :src="entry.track.preview_url || undefined"
                @volumechange="saveVolumeLevel">
                Your browser does not support the audio element.
            </audio>
        </div>
        <p v-text="entry.date.toLocaleString()"></p>
        </div>
        <!-- Trash button -->
        <button v-if="isOwner" class="btn-delete-entry" @click="confirmation" title="Delete Entry">
            <i class="material-symbols-outlined">delete</i>
        </button>
        <div v-if="showConfirmationDialog" class="confirmation-dialog">
            <p>Are you sure you want to delete this entry?</p>
            <button class="confirm-button yes" @click="deleteEntry">Yes</button>
            <button class="confirm-button no" @click="cancelDelete">No</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import type { PropType } from 'vue';
import type { Entry } from '@/Shared/Models/Entry';

const audioPlayer = ref<HTMLAudioElement | null>(null);

watch(audioPlayer, audioPlayer => {
    if (audioPlayer == null) return
    
    // Get saved volumed level from local storage
    const savedVolumeLevel = localStorage.getItem('volume_level');

    // If volume level is saved, set the default volume of the audio player
    if (savedVolumeLevel != null) {
        audioPlayer!.volume = Number(savedVolumeLevel);
    } else {    // Else set the default volume to 0.5
        audioPlayer!.volume = 0.5;
    }
});

const props = defineProps({
    entry: {
        type: Object as PropType<Entry>,
        required: true
    },
    isOwner: {
        type: Boolean,
        required: true
  },
});

const emit = defineEmits<{
    (event: 'delete', entryDate: Date): void;
}>();
        
const showPlayback = ref(false);
const showConfirmationDialog = ref(false);

function togglePlayback() {
    showPlayback.value = !showPlayback.value;
}

function saveVolumeLevel(event: Event) {
    const audioPlayer = event.target as HTMLAudioElement
    localStorage.setItem('volume_level', audioPlayer.volume.toString());
}

function confirmation(){
    showConfirmationDialog.value = true;
}
function deleteEntry(){
    showConfirmationDialog.value = false;
    props.entry && emit('delete', props.entry.date);
}
function cancelDelete(){
    showConfirmationDialog.value = false;
}
</script>