<style>@import'./Home.css';</style>
<template>
    <div class="home-container">
        <div class="left-column">
            <ProfileSection/>
            <div class="entries-container">
                <CreateEntry/>
                <div v-for="entry in entries">
                    <EntryItem :entry="entry"></EntryItem>
                </div>
            </div>
        </div>
        <div class="right-column">
            <Calender/>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import ProfileSection from '@/components/ProfileSection/ProfileSection.vue';
import CreateEntry from '@/components/CreateEntry/CreateEntry.vue';
import EntryItem from '@/components/EntryItem/EntryItem.vue';
import Calender from '@/components/Calender/Calender.vue';
import type { Entry } from '@/Shared/Models/Entry';

const entries = ref([] as Entry[]);

onBeforeMount(() => {
    // //Get entries from backend API
    // //Hardcode example entries for now
    entries.value.push({
        track: {
            name: "Touch",
            uri: "asdf",
            href: "qewr",
            id: "zxcv"
        },
        text: "what a great day! :D",
        date: new Date()    //Creates a new date object with the current date/time
    });

    entries.value.push({
        track: {
            name: "APT",
            uri: "asdf",
            href: "qewr",
            id: "zxcv"
        },
        text: "what a horrible day! :(",
        date: new Date()
    });

const addEntry = (newEntry: Entry) => {
  entries.value.unshift(newEntry); // Adds new entry to beginning of the array
};

})
</script>