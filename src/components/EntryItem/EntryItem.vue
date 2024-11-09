<style>@import'./EntryItem.css';</style>
<template>
    <div class="entry-container card clickable">
        <h1 v-text="entry.text"></h1>
        <p v-text="entry.track.name"></p>
        <p v-text="entry.date.toLocaleString()"></p>
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