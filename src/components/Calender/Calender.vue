<style scoped>@import'./Calender.css';</style>
<template>
    <div class="calender-container card">
        <div class="calendar-title">
            <button class="calendar-arrow" @click="nextPreviousMonth(-1)">
                <i class="material-symbols-outlined">chevron_left</i>
            </button>
            <h1 v-text="month"></h1>
            <!-- <p v-text="year"></p> -->
            <button class="calendar-arrow" @click="nextPreviousMonth(1)">
                <i class="material-symbols-outlined">chevron_right</i>
            </button>

        </div>
        <p v-text="year"></p>
        <div class="calender-item-container">    
            <CalenderItem v-for="day in days" :key="day"
                :currentDay="day"
                :currentMonth="month"
                :entriesByDay=getEntryForDay(day)
                :showEntries="openDay === day"
                @toggleEntries="toggleOtherDayEntries(day)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CalenderItem from './CalenderItem.vue';
import type { Entry } from '@/Shared/Models/Entry';

const today = new Date();
let currentMonth = today.getMonth(); // 0 for January, 11 for December
let currentYear = today.getFullYear();

const props = defineProps<{
    entries: Entry[];
}>();


const openDay = ref();

//Finds the first entry that has a date equals the day and passes it to CalenderItem
const getEntryForDay = (day: number): Entry[] => {
    if (props.entries != null) {
        const entriesByDay : Entry[] = [];
        for (let i = 0; i < props.entries.length; i++) {
            const entry = props.entries[i];
            const entryDate = new Date(entry.date);
            if (entryDate.getFullYear() === currentYear && 
                    entryDate.getMonth() === currentMonth && 
                    entryDate.getDate() === day) {
                entriesByDay.push(entry);
            }
        }

        return entriesByDay;
    }
    return [] // it returns an empty if no entry value is found
}

const monthNames: string[] = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

const days = ref(getDaysInCurrentMonth());
const month = ref(monthNames[currentMonth]);
const year = ref(currentYear);

const nextPreviousMonth = (value: number) => {
    currentMonth += value;

    if (currentMonth == 12) {
        currentYear += 1;
        currentMonth = 0;
    }
    else if (currentMonth == -1) {
        currentYear -= 1;
        currentMonth = 11;
    }

    month.value = monthNames[currentMonth];
    days.value = getDaysInCurrentMonth();
    year.value = currentYear;
    // console.log("next month");
}

function getDaysInCurrentMonth(): number {
    // Create a new date for the first day of the next month
    const firstDayNextMonth = new Date(currentYear, currentMonth + 1, 1);
    
    // Subtract one day to get the last day of the current month
    const lastDayCurrentMonth = new Date(firstDayNextMonth.getTime() - 1);

    return lastDayCurrentMonth.getDate(); // Return the day of the month
}

const toggleOtherDayEntries = (day: number) => {
    openDay.value = openDay.value === day ? null : day; // Close if already open, otherwise open
}

</script>