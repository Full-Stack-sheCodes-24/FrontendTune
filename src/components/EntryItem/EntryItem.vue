<style scoped>@import'./EntryItem.css';</style>
<template>
    <div class="entry-container card clickable" :id="id">
        <div class="entry-content">
        <pre class= "output-text" v-text="entry.text"></pre>
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
            <img class="song_img" 
                v-if="entry?.track?.albumImageUrl" 
                :class="{'pause-animation': isPaused}" 
                :src="entry?.track?.albumImageUrl" 
            />
            <audio controls autoplay loop
                ref="audioPlayer"
                :src="entry.track.preview_url || undefined"
                @volumechange="saveVolumeLevel"
                @pause="isPaused = true"
                @play="isPaused = false">
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
            <div class="delete-content">
                <p>Are you sure you want to delete this entry?</p>
                <div class="button-container">
                    <button class="confirm-button yes" @click="deleteEntry">Yes</button>
                    <button class="confirm-button no" @click="cancelDelete">No</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue';
import type { PropType } from 'vue';
import type { Entry } from '@/Shared/Models/Entry';

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

const audioPlayer = ref<HTMLAudioElement | null>(null);
const isPaused = ref(false);
const activeAudioPlayer = ref<string | null>(null);
const id = ref(`entry-${new Date(props.entry.date).getTime()}`);

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

const emit = defineEmits<{
    (event: 'delete', entryDate: Date): void;
}>();
        
const showPlayback = ref(false);
const showConfirmationDialog = ref(false);

function togglePlayback() {
    showPlayback.value = !showPlayback.value;

    if (showPlayback.value) {
        document.addEventListener('click', handleOutsideClick);
        activeAudioPlayer.value = id.value;
    } else {
        document.removeEventListener('click', handleOutsideClick);
        activeAudioPlayer.value = null;
    }
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

function handleOutsideClick(event: MouseEvent) {
    if (activeAudioPlayer.value) {
        const entryContainer = document.querySelector(`#${activeAudioPlayer.value}`);
        if (!entryContainer?.contains(event.target as Node)) {
            // If the clicked element is outside of the current audio player, stop playback
            showPlayback.value = false;
            activeAudioPlayer.value = null;
        }
    }
}

onUnmounted(() => {
    document.removeEventListener('click', handleOutsideClick);
})
</script>