<template>
    <div class="entry-container card clickable">
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
}

.entry-container:hover {
    background-color: #f0f0f0; /* Slightly darker on hover */
    transition: background-color 0.3s; /* Smooth transition */
}
</style>