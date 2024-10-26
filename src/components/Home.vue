<template>
    <div class="home-container">
        <div class="left-column">
            <ProfileSection
                :image="exampleProfilePic"
                :text="exampleBioText"
                :birthday="exampleBirthday">
            </ProfileSection>
            <div class="entries-container">
                <CreateEntry></CreateEntry>
                <div v-for="entry in entries">
                    <EntryItem :entry="entry"></EntryItem>
                </div>
            </div>
        </div>
        <div class="right-column">
            <Calender></Calender>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import ProfileSection from './ProfileSection.vue';
import CreateEntry from './CreateEntry.vue';
import EntryItem from './EntryItem.vue';
import Calender from './Calender.vue';
import type { Entry } from '@/Shared/Models/Entry';

const entries = ref([] as Entry[]);
const exampleProfilePic = "https://media.licdn.com/dms/image/v2/C4E03AQGBBKCRQNcqJg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1579728661856?e=1735171200&v=beta&t=viz2XS_XBnZkgXF76Vqm4tOuU3u5y6a-oyrxCutPKq0";
const exampleBioText = "this is my profile information";
const exampleBirthday = new Date();

onBeforeMount(() => {
    //Get entries from backend API
    //Hardcode example entries for now
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
})
</script>
<style>
.home-container {
    display: grid;
    grid-template-columns: 2fr auto;
    gap: 20px;

    .left-column {
        display: flex;
        flex-direction: column;
        gap: 20px;

        .entries-container {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
    }
}
</style>