<style scoped>@import'./UserProfilePage.css';</style>
<template>
    <div class="user-profile-page-container">
        <div class="left-column">
            <ProfileSection
                :is-owner="false"
                :profile-pic-url="profilePicUrl"
                :name="name"
                :bio-text="bioText"
                :birthday="birthday">
            </ProfileSection>
            <div class="entries-container">
                <div v-for="entry in entries">
                    <EntryItem :entry="entry" :is-owner="false"></EntryItem>
                </div>
            </div>
        </div>
        <div class="right-column">
            <Calender v-if="!isPrivate" :entries="entries"></Calender>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import ProfileSection from '@/components/ProfileSection/ProfileSection.vue';
import EntryItem from '@/components/EntryItem/EntryItem.vue';
import Calender from '@/components/Calender/Calender.vue';
import type { Entry } from '@/Shared/Models/Entry';
import { UserGetClient } from '@/Shared/Clients/UserGetClient';
import { useRoute } from 'vue-router';

const route = useRoute();

const profilePicUrl = ref();
const name = ref();
const bioText = ref();
const birthday = ref();
const entries = ref([] as Entry[]);
const isPrivate = ref();

watch(() => route.params.userId, (newUserId) => {
    refreshUserState(newUserId.toString());
    console.log("Entries in Calender.vue:", entries); // Debug: Check received entrie
});

onMounted(async () => {
    // Get userId from url. Ex: moodz.com/users/ajsdlifjasifj
    const userId = route.params.userId.toString();

    refreshUserState(userId);
    console.log("Entries in Calender.vue:", entries); // Debug: Check received entrie


});

async function refreshUserState(userId : string) {
    const client = new UserGetClient();
    await client.execute(userId).then(response => {
        profilePicUrl.value = response.profilePicUrl;
        name.value = response.name;
        if (response.isPrivate) {
            isPrivate.value = true;
            bioText.value = 'This user has their profile privated.';
            birthday.value = null;
            entries.value = [] as Entry[];
            return;
        }
        bioText.value = response.bioText;
        birthday.value = new Date(response.birthday);
        for(let i = 0; i < response.entries.length; i++){
            response.entries[i].date = new Date(response.entries[i].date)
        }
        entries.value = response.entries;
        response.entries.sort((a, b) => b.date.getTime() - a.date.getTime());
    }).catch(error => {
        console.log(error);
    });
}
</script>