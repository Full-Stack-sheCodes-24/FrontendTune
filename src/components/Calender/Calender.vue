<style>@import'./Calender.css';</style>
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
            <CalenderItem v-for="day in days"
                :currentDay="day"
                :entry=getEntryForDay(day)
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UserGetClient } from '@/Shared/Clients/UserGetClient';
import CalenderItem from './CalenderItem.vue';

const today = new Date();
let currentMonth = today.getMonth(); // 0 for January, 11 for December
let currentYear = today.getFullYear();
import { useUserStateStore } from '@/Shared/UserStateStore';
const userStateStore = useUserStateStore();

// import { useRoute } from 'vue-router';
// const route = useRoute();
// const currentUser = ref()

// async function refreshUserState(userId : string) {
//     const client = new UserGetClient();
//     await client.execute(userId).then(response => {
//         currentUser.value = response;
//     }).catch(error => {
//         console.log(error);
//     });
// }

//Finds the first entry that has a date equals the day and passes it to CalenderItem
const getEntryForDay = (day: number) => {
    const entry = userStateStore.entries.find(e => {
        const entryDate = new Date(e.date);
        return entryDate.getDate() === day;
    });
    return entry || null; 
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
</script>