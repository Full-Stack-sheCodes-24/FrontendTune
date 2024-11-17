<template>
    <div class="calender-item card clickable" @click="goToEntry">
        <p class="days-on-calendar">{{ currentDay }}</p>   
        <div v-if="entry != null"> 
            <img :src="entry.track.album.images[0].url || fallbackImg"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Entry } from '@/Shared/Models/Entry';
import { ref } from 'vue';

const fallbackImg = 'https://spiralcute.com/characters/img/characters/thumb_chiikawa.jpg';

const albumCover = ref();
const props = defineProps<{
    currentDay: number;
    entry: Entry | undefined;
}>();

const goToEntry = () => {
    if (props.entry !== undefined) {
        const element = document.getElementById(props.entry.id);
        element?.scrollIntoView();
        console.log("Go to entry!")
    }
}
</script>