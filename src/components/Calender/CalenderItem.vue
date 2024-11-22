<style scoped src="./Calender.css"></style>
<template>
    <div class="calender-item-wrapper">
    <div class="calender-item card clickable" :class="{ 'highlight': showEntries }" @click="showEntriesForDay()">
        <p class="days-on-calendar">{{ currentDay }}</p>   
        <div v-if="firstEntry != undefined"> 
            <img :src="firstEntry?.track?.albumImageUrl || fallbackImg"/>
        </div>
    </div>

    <div class="entries-for-day" v-if="showEntries">
        <div class="go-to-top card clickable" @click="goToTop">
            <p>Go to top</p>
        </div>
        <div class="entry-for-day card clickable" v-for="entry in entriesByDay" @click="goToEntry(entry)">
            <div class="day-entry-albumImg">
                <img :src="entry.track?.albumImageUrl || fallbackImg"/>
            </div>
            <div class="textbox">
                <p class="track-name">{{ entry.track.name }}</p>
                <p class="entry-time" v-text="entry.date.toLocaleTimeString()"></p>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup lang="ts">
import type { Entry } from '@/Shared/Models/Entry';
import { computed, nextTick, ref, watchEffect } from 'vue';

const fallbackImg = 'https://spiralcute.com/characters/img/characters/thumb_chiikawa.jpg';

const props = defineProps<{
    currentDay: number;
    entriesByDay: Entry[];
    showEntries: boolean;
}>();

const firstEntry = computed(() => props.entriesByDay[props.entriesByDay.length -1]) || null;

const emit = defineEmits(['toggleEntries']);

watchEffect(() => {
    console.log("Entries in CalenderItem.vue:", props.entriesByDay); // Debug: Check received entries
});

const goToEntry = (entry: Entry) => {
    if (entry != undefined) {
        const element = document.getElementById(`entry-${new Date(entry.date).getTime()}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center'});
            element.classList.add('highlight');

            setTimeout(() => {
                element.classList.remove("highlight");
            }, 1000);  // 3 seconds delay before the highlight disappears

            console.log("Scrolled to entry:", `entry-${new Date(entry.date).getTime()}`);
        } else {
            console.warn("Element not found for entry ID:", `entry-${new Date(entry.date).getTime()}`);
        }
    }
    else {
        console.log("No entries for this day");
    }
};

const showEntriesForDay = () => {
    goToEntry(firstEntry.value); 
    emit('toggleEntries', props.currentDay);
}

const goToTop = () => {
    globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

</script>