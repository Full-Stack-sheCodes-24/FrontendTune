<style>@import'./EntryItem.css';</style>
<template>
    <div class="entry-container card clickable">
        <h1 v-text="entry.text"></h1>
        <p v-text="entry.track.name"></p>
        <p v-text="entry.date.toLocaleString()"></p>
        <!-- Show delete button only if the user is the owner -->
        <button v-if="isOwner" class="delete-button" @click="$emit('delete', entry.date)">Delete</button>
    </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue';
import type { Entry } from '@/Shared/Models/Entry';

defineProps({
    entry: {
        type: Object as PropType<Entry>,
        required: true
    },
    isOwner: {
        type: Boolean,
        required: true
  },
})
</script>