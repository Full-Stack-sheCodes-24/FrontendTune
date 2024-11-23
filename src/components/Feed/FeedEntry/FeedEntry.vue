<style scoped src="./FeedEntry.css"></style>
<template>
    <div class="entry-container card" :id="id">
        <div class="entry-content">
            <div class="profile-container">
                <img class="profile-picture clickable"
                    @click="redirectToUserProfile"
                    :src="entry.profilePicUrl"
                    :alt="`Profile picture for ${entry.name}`"
                />
                <div class="profile-info">
                    <h1 v-text="entry.name" @click="redirectToUserProfile"></h1>
                    <div class="track-info">
                        <p class="track-name">{{ entry.track.name }}</p>
                        <div 
                            v-if="entry.track.preview_url" 
                            class="favicon-container" 
                            @click="togglePlayback">
                            <img src="/favicon.ico" alt="Play Icon" class="favicon-icon" />
                        </div>
                    </div>
                </div>
            </div>
            <AudioPlayer
                class="music-play"
                :src="entry.track.preview_url || undefined"
                :auto-play="true"
                :is-visible="showPlayback"
                @pause="isPaused = true"
                @play="isPaused = false">
                <template v-slot:image>
                    <img class="song_img" 
                        v-if="entry?.track?.albumImageUrl" 
                        :class="{'pause-animation': isPaused}" 
                        :src="entry?.track?.albumImageUrl" 
                    />
                </template>
            </AudioPlayer>
            <pre class= "output-text" v-text="entry.text"></pre>
            <p>{{ dateFormat(entry.date) }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import type { PropType } from 'vue';
import AudioPlayer from '@/Shared/AudioPlayer/AudioPlayer.vue';
import type { FeedEntry } from '@/Shared/Models/FeedEntry';
import { useRouter } from 'vue-router';

const props = defineProps({
    entry: {
        type: Object as PropType<FeedEntry>,
        required: true
    }
});

const router = useRouter();
const isPaused = ref(false);
const activeAudioPlayer = ref<string | null>(null);
const id = ref(`entry-${new Date(props.entry.date).getTime()}`);
const showPlayback = ref(false);

function redirectToUserProfile() {
    router.push({ path: `/user/${props.entry.id}` });
}

function togglePlayback() {
    showPlayback.value = !showPlayback.value;

    if (showPlayback.value) {
        document.addEventListener('click', handleOutsideClick);
        activeAudioPlayer.value = id.value;
    } else {
        document.removeEventListener('click', handleOutsideClick);
        activeAudioPlayer.value = null;
    }
}

function handleOutsideClick(event: MouseEvent) {
    if (activeAudioPlayer.value) {
        const entryContainer = document.querySelector(`#${activeAudioPlayer.value}`);
        if (!entryContainer?.contains(event.target as Node)) {
            // If the clicked element is outside of the current audio player, stop playback
            showPlayback.value = false;
            activeAudioPlayer.value = null;
        }
    }
}

function dateFormat(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days <= 5) {
    return `${days}d ago`;
  } else {
    // if thime passed is more than 5 days, it will display the full date
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear().toString().slice(-2); 
    return `${month}/${day}/${year}`;
  }
}

onUnmounted(() => {
    document.removeEventListener('click', handleOutsideClick);
})
</script>