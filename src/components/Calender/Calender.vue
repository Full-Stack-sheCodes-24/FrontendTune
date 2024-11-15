<style>@import'./Calender.css';</style>
<template>
    <div class="calender-container card">
        <h1 v-text="month"></h1>
        <div class="calender-item-container">
            <CalenderItem v-for="day in days"
                :currentDay="day"
                :albumCoverCalendar=undefined
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import CalenderItem from './CalenderItem.vue';

const monthNames: string[] = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

const days = getDaysInCurrentMonth();
const month = monthNames[new Date().getMonth()];

function getDaysInCurrentMonth(): number {
    const today = new Date();
    const currentMonth = today.getMonth(); // 0 for January, 11 for December
    const currentYear = today.getFullYear();

    // Create a new date for the first day of the next month
    const firstDayNextMonth = new Date(currentYear, currentMonth + 1, 1);
    
    // Subtract one day to get the last day of the current month
    const lastDayCurrentMonth = new Date(firstDayNextMonth.getTime() - 1);

    return lastDayCurrentMonth.getDate(); // Return the day of the month
}
</script>