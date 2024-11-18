<style scoped src="./Calender.css"></style>
<template>
    <div class="calender-item card clickable">
        
        <p class="days-on-calendar">{{ currentDay }}</p>    
        <img
            src="https://spiralcute.com/characters/img/characters/thumb_chiikawa.jpg"
            :alt="`Calendar Picture for day ${currentDay}`"/>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    currentDay: number;
    albumCoverCalendar: string | undefined;
}>();
</script>