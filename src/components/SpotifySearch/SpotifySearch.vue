<style>@import'./SpotifySearch.css';</style>
<template>
    <div class="spotify-search-container">
        <div class="selected-song-format">
            <img v-if="isSelected"
                :src="selectedSongImg"
                :class="{ 'pause-animation': isPaused }"/>
            <div>
                <p v-if="isSelected && !(hasPreviewUrl)">{{ selectedSongName }}&nbsp;{{ noPreviewUrlMsg }}</p>
                <p v-else-if="isSelected && selectedSongPreviewUrl != null">{{ selectedSongName }}</p>
                <p v-show="selectedSongPreviewUrl != null">
                    <audio controls autoplay loop
                        ref="audioPlayer"
                        :src="selectedSongPreviewUrl || undefined"
                        @pause="isPaused = true"
                        @play="isPaused = false"
                        @volumechange="saveVolumeLevel">
                        Your browser does not support the audio element.
                    </audio>
                </p>
            </div>
        </div>
        <div>
            <input type="text" v-model="inputText" placeholder="Type in song name" id="searchInput" @input="debouncedSearch" >
            <div class = "spotify-search-results">
                <div v-for="track in searchResults"
                    :key = "track.id"
                    @click="selectSong(track)"
                    class = "track-item">
                    {{ track.name }} - {{ track.album.artists.map(artist => artist.name).join(',') }}
            </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Track } from '../../Shared/Models/Track';
import { SpotifySearchMapper } from './Mappers/SpotifySearchMapper';
import { SpotifySearchClient } from '../../Shared/Clients/SpotifySearchClient'; 
import { SpotifySearchV2Client } from '../../Shared/Clients/SpotifySearchV2Client';
import { SpotifyGetTrackClient } from '@/Shared/Clients/SpotifyGetTrackClient';

// const client = new SpotifySearchClient();
// User userAccessToken instead of server access_token for greater chance of getting a preview_url returned
const client = new SpotifySearchV2Client();

const searchResults = ref([] as Track[]);
const inputText = ref('');
const debounceTimeout = ref<number | null>(null);
const cache: Record<string, Track[]> = {};
const mapper = new SpotifySearchMapper();
const selectedSongName = ref('');
const isSelected = ref(false);
const hasPreviewUrl = ref(true);
const selectedTrack = ref();
const selectedSongImg = ref('');
const selectedSongPreviewUrl = ref<string | null>(null);
const isPaused = ref(false);
const noPreviewUrlMsg = "does not have a preview track.";
const audioPlayer = ref<HTMLAudioElement | null>(null);

const emit = defineEmits(['update-selected-track']);

function debouncedSearch() {
    if (debounceTimeout.value) clearTimeout(debounceTimeout.value);
    if (inputText.value.trim() === '') {
        searchResults.value = [];
        return;
    }
    debounceTimeout.value = window.setTimeout(() => {
        performSearch(inputText.value);
    }, 300);
}

async function performSearch(query: string){
    if (cache[query]) {
        searchResults.value = cache[query];
        return;
    }
    try {
        const response = await client.execute({ query });
        const results = mapper.searchResponseToTracks(response);
        searchResults.value = results;
        cache[query] = results;
    }
    catch (error){
        console.error('Search error:', error);
    }
}

async function selectSong(track : Track){
    selectedTrack.value = track;
    selectedSongPreviewUrl.value = track.preview_url;
    if(!selectedSongPreviewUrl.value){
        const client = new SpotifyGetTrackClient();
        try{
            const response = await client.execute(track.id);
            selectedSongPreviewUrl.value = response.preview_url;
            selectedTrack.value.preview_url = response.preview_url;
        }
        catch(error){
            console.error(error);
        }
        if(!selectedSongPreviewUrl.value) hasPreviewUrl.value = false;
    }
    selectedSongName.value = track.name;
    selectedSongImg.value = track.album.images[0].url;
    isSelected.value = true;
    emit('update-selected-track', selectedTrack.value); // Let CreateEntry.vue know that the value has changed
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
