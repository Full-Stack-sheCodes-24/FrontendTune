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
                    <EntryItem :entry="entry" :is-owner="isOwner"></EntryItem>
                </div>
            </div>
        </div>
        <div class="right-column">
            <Calender/>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import ProfileSection from '@/components/ProfileSection/ProfileSection.vue';
import EntryItem from '@/components/EntryItem/EntryItem.vue';
import Calender from '@/components/Calender/Calender.vue';
import type { Entry } from '@/Shared/Models/Entry';
import { UserGetClient } from '@/Shared/Clients/UserGetClient';
import { useRoute } from 'vue-router';
import { useUserStateStore } from '@/Shared/UserStateStore';
import { storeToRefs } from 'pinia';

const route = useRoute();
const userStateStore = useUserStateStore();
const { id } = storeToRefs(userStateStore);

const profilePicUrl = ref();
const name = ref();
const bioText = ref();
const birthday = ref();
const entries = ref([] as Entry[]);


watch(() => route.params.userId, (newUserId) => {
    refreshUserState(newUserId.toString());
});

onMounted(async () => {
    // Get userId from url. Ex: moodz.com/users/ajsdlifjasifj
    const userId = route.params.userId.toString();

    refreshUserState(userId);
});

async function refreshUserState(userId : string) {
    const client = new UserGetClient();
    await client.execute(userId).then(response => {
        profilePicUrl.value = response.profilePicUrl;
        name.value = response.name;
        bioText.value = response.bioText;
        birthday.value = new Date(response.birthday);
        for(let i = 0; i < response.entries.length; i++){
            response.entries[i].date = new Date(response.entries[i].date)
        }
        entries.value = response.entries;
    }).catch(error => {
        console.log(error);
    });
}
const isOwner = computed(() => route.params.userId === id.value);

</script>