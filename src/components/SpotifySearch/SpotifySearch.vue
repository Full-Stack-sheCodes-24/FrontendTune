<style>@import'./SpotifySearch.css';</style>
<template>
    <div class="selected-song-format">
        <img v-if="isSelected" :src="selectedSongImg"/>
        <div>
            <p v-if="isSelected && selectedSongPreviewUrl == null">{{ selectedSongName }}&nbsp;{{ noPreviewUrlMsg }}</p>
            <p v-else-if="isSelected && selectedSongPreviewUrl != null">{{ selectedSongName }}</p>
            <p v-if="selectedSongPreviewUrl != null">
            <audio controls autoplay loop :src="selectedSongPreviewUrl">
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
import { ref } from 'vue';
import type { Track } from '../../Shared/Models/Track';
import { SpotifySearchMapper } from './Mappers/SpotifySearchMapper';
import { SpotifySearchClient } from '../../Shared/Clients/SpotifySearchClient'; 

const searchResults = ref([] as Track[]);
const inputText = ref();
const mapper = new SpotifySearchMapper();
const selectedSongName = ref();
const isSelected = ref(false);
const selectedSongImg = ref();
const selectedSongPreviewUrl = ref();
const noPreviewUrlMsg = "does not have a preview track.";

function search(query : string) {
    const client = new SpotifySearchClient();

    client.execute({ query }).then(response => {
        searchResults.value = mapper.searchResponseToTracks(response);
    });
}

function selectSong(track : Track){
    selectedSongPreviewUrl.value = track.preview_url;
    selectedSongName.value = track.name;
    selectedSongImg.value = track.album.images[0].url;
    isSelected.value = true;
}
</script>
