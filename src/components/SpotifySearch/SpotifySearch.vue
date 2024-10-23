<template>
    <div>
        <input type="text" v-model="inputText" id="searchInput">
        <button @click="search(inputText)">Search</button>
        <div v-for="track in searchResults">
            <button>Select</button>
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
const inputText = ref("Query...");
const mapper = new SpotifySearchMapper();

function search(query : string) {
    const client = new SpotifySearchClient();

    client.execute({ query }).then(response => {
        searchResults.value = mapper.searchResponseToTracks(response);
    });
}
</script>
