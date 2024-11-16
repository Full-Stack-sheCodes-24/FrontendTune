<style>@import'./EntryItem.css';</style>
<template>
    <div class="entry-container card clickable">
        <h1 class= "output-text" v-text="entry.text"></h1>
        <div class="track-info">
            <p class="track-name">{{ entry.track.name }}</p>
            <div class="favicon-container" @click="togglePlayback">
                <img src="/favicon.ico" alt="Play Icon" class="favicon-icon" />
            </div>
        </div>
        <div class="music-play" v-if="showPlayback">
            <audio controls autoplay loop :src="entry.track.preview_url || undefined">
                Your browser does not support the audio element.
            </audio>
        </div>
        <p v-if="!entry.track.preview_url">No preview available for this track</p>
        <p v-text="entry.date.toLocaleString()"></p>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { PropType } from 'vue';
import type { Entry } from '@/Shared/Models/Entry';

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
</script>