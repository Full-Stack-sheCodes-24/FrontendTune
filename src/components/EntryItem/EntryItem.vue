<style>@import'./EntryItem.css';</style>
<template>
    <div class="entry-container card clickable">
        <div class="entry-content">
            <h1 v-text="entry.text"></h1>
            <p v-text="entry.track.name"></p>
            <p v-text="entry.date.toLocaleString()"></p>
        </div>
        <!-- Trash button -->
        <button v-if="isOwner" class="btn-delete-entry" @click="$emit('delete', entry.date)">
            <i class="material-symbols-outlined">delete</i>
        </button>
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