<style>@import'./EntryItem.css';</style>
<template>
    <div class="entry-container card clickable"  :id="`entry-${new Date(entry.date).getTime()}`">
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
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { PropType } from 'vue';
import type { Entry } from '@/Shared/Models/Entry';

const audioPlayer = ref<HTMLAudioElement | null>(null);

defineProps({
    entry: {
        type: Object as PropType<Entry>,
        required: true
    }
});
const showPlayback = ref(false);

function togglePlayback() {
    showPlayback.value = !showPlayback.value;
}

function saveVolumeLevel(event: Event) {
    const audioPlayer = event.target as HTMLAudioElement
    localStorage.setItem('volume_level', audioPlayer.volume.toString());
}

onMounted(() => {
    if (audioPlayer.value != null) {
        // Get saved volumed level from local storage
        const savedVolumeLevel = localStorage.getItem('volume_level');

        // If volume level is saved, set the default volume of the audio player
        if (savedVolumeLevel != null) {
            audioPlayer.value!.volume = Number(savedVolumeLevel);
        } else {    // Else set the default volume to 0.5
            audioPlayer.value!.volume = 0.5;
        }
    }
});
</script>