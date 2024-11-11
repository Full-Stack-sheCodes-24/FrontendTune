<style>@import'./SpotifySearch.css';</style>
<template>
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
                    :src="selectedSongPreviewUrl"
                    @pause="isPaused = true"
                    @play="isPaused = false"
                    @volumechange="saveVolumeLevel">
                    Your browser does not support the audio element.
                </audio>
            </p>
        </div>
    </div>
    <div>
        <input type="text" v-model="inputText" placeholder="Type in song name" id="searchInput">
        <button @click="search(inputText)">Search</button>
        <div v-for="track in searchResults">
            <button @click="selectSong(track)">Select</button>
            {{ track.name }}
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
const inputText = ref();
const mapper = new SpotifySearchMapper();
const selectedSongName = ref();
const isSelected = ref(false);
const hasPreviewUrl = ref(true);
const selectedSongImg = ref();
const selectedSongPreviewUrl = ref();
const isPaused = ref(false);
const noPreviewUrlMsg = "does not have a preview track.";
const audioPlayer = ref<HTMLAudioElement | null>(null);

async function search(query : string) {
    await client.execute({ query }).then(response => {
        searchResults.value = mapper.searchResponseToTracks(response);
    });
}

async function selectSong(track : Track){
    selectedSongPreviewUrl.value = track.preview_url;

    // Try getting the preview_url from a different spotify endpoint
    if (selectedSongPreviewUrl.value == null) {
        const client = new SpotifyGetTrackClient();
        await client.execute(track.id).then(response => {
            selectedSongPreviewUrl.value = response.preview_url;
        }).catch(error => {
            console.log(error);
        });
        if (selectedSongPreviewUrl.value == null){
            hasPreviewUrl.value = false;
        }
    }

    selectedSongName.value = track.name;
    selectedSongImg.value = track.album.images[0].url;
    isSelected.value = true;
}

function saveVolumeLevel(event: Event) {
    const audioPlayer = event.target as HTMLAudioElement
    localStorage.setItem('volume_level', audioPlayer.volume.toString());
}

onMounted(() => {
    // Get saved volumed level from local storage
    const savedVolumeLevel = localStorage.getItem('volume_level');

    // If volume level is saved, set the default volume of the audio player
    if (savedVolumeLevel != null) {
        audioPlayer.value!.volume = Number(savedVolumeLevel);
    } else {    // Else set the default volume to 0.5
        audioPlayer.value!.volume = 0.5;
    }
});
</script>
