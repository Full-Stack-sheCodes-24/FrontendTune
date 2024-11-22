<style scoped src="./Calender.css"></style>
<template>
    <div class="calender-item-wrapper">
    <div class="calender-item card clickable" :class="{ 'highlight': showEntries }" @click="showEntriesForDay()">
        <p class="days-on-calendar">{{ currentDay }}</p>   
        <div v-if="firstEntry != undefined"> 
            <img :src="firstEntry?.track?.albumImageUrl || fallbackImg"
            :alt="`Album cover image for ${currentMonth} ${currentDay}th`"/>
        </div>
    </div>

    <div class="entries-for-day" v-if="showEntries">
        <div class="go-to-top card clickable" @click="goToTop">
            <p>Go to top</p>
        </div>
        <div class="entry-for-day card clickable" v-for="entry in entriesByDay" @click="goToEntry(entry)">
            <div class="day-entry-albumImg">
                <img :src="entry.track?.albumImageUrl || fallbackImg"
                :alt="`Album cover image for entry at ${currentMonth} ${currentDay}th ${entry.date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`"/>
            </div>
            <div class="textbox">
                <p class="track-name">{{ entry.track.name }}</p>
                <p class="entry-time" v-text="entry.date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })"></p>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup lang="ts">
import type { Entry } from '@/Shared/Models/Entry';
import { computed, ref, watchEffect } from 'vue';

const fallbackImg = 'https://spiralcute.com/characters/img/characters/thumb_chiikawa.jpg';

const props = defineProps<{
    currentDay: number;
    currentMonth: string;
    entriesByDay: Entry[];
    showEntries: boolean;
}>();

const firstEntry = computed(() => props.entriesByDay[props.entriesByDay.length -1]) || null;
const highlighted = new Map();

const emit = defineEmits(['toggleEntries']);

watchEffect(() => {
    console.log("Entries in CalenderItem.vue:", props.entriesByDay); // Debug: Check received entries
});

const goToEntry = (entry: Entry) => {
    if (entry != undefined) {
        const element = document.getElementById(`entry-${new Date(entry.date).getTime()}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center'});

            // Reset highlight remover timers if user clicks again
            if(highlighted.has(entry)) {
                clearTimeout(highlighted.get(entry)[0]);
                clearTimeout(highlighted.get(entry)[1]);
            }

            element.classList.add('highlight');

            const timer1 = setTimeout(() => {
                element.classList.add("highlight-remove");
            }, 1000);  // 1 seconds delay before the highlight disappears

            const timer2 = setTimeout(() => {
                element.classList.remove('highlight');
                element.classList.remove("highlight-remove");
                highlighted.delete(entry);
            }, 1300);  // 0.3 seconds delay before removing all highlight classes

            highlighted.set(entry, [timer1, timer2]);

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