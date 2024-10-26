<template>
    <div class="create-entry-container">
        <h1>Create an entry</h1>
        <SpotifySearch></SpotifySearch>
    </div>
</template>
<script setup lang="ts">
import SpotifySearch from './SpotifySearch/SpotifySearch.vue';
</script>
<style>
.create-entry-container {
    background-color: #f9f9f9; /* Light background color */
    border: 1px solid #ddd; /* Soft border */
    border-radius: 8px; /* Rounded corners */
    padding: 20px; /* Space inside the box */
    margin: 20px; /* Space outside the box */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    font-family: 'Georgia', serif; /* Elegant font for writing */
}
</style>