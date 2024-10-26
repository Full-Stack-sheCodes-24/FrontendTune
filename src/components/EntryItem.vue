<template>
    <div class="entry-container">
        <h1 v-text="entry.text"></h1>
        <p v-text="entry.track.name"></p>
        <p v-text="entry.date.toString()"></p>
    </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue';
import type { Entry } from '@/Shared/Models/Entry';
defineProps({
    entry: {
        type: Object as PropType<Entry>,
        required: true
    }
})
</script>
<style>
.entry-container {
    background-color: #f9f9f9; /* Light background color */
    border: 1px solid #ddd; /* Soft border */
    border-radius: 8px; /* Rounded corners */
    padding: 20px; /* Space inside the box */
    margin: 20px; /* Space outside the box */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    font-family: 'Georgia', serif; /* Elegant font for writing */
}

.entry-container:hover {
    background-color: #f0f0f0; /* Slightly darker on hover */
    transition: background-color 0.3s; /* Smooth transition */
}
</style>