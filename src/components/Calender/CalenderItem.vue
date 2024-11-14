<template>
    <div class="calender-item card clickable">
        
        <p class="days-on-calendar">{{ currentDay }}</p>    
        <img src="https://spiralcute.com/characters/img/characters/thumb_chiikawa.jpg"/>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    currentDay: number;
    albumCoverCalendar: string | undefined;
}>();
</script>