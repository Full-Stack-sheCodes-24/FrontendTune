<template>
    <p v-if="isSelected">{{ selectedSong }}</p>
    <div>
        <input type="text" v-model="inputText" placeholder="Type in song name" id="searchInput">
        <button @click="search(inputText)">Search</button>
        <div v-for="track in searchResults">
            <button @click="selectSong(track.name)">Select</button>
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
const selectedSong = ref('');
const isSelected = ref(false);

function search(query : string) {
    const client = new SpotifySearchClient();

    client.execute({ query }).then(response => {
        searchResults.value = mapper.searchResponseToTracks(response);
    });
}

function selectSong(trackName : string){
    selectedSong.value = trackName;
    isSelected.value = true;
}
</script>
