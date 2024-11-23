<style scoped>@import'./UserProfilePage.css';</style>
<template>
    <div class="user-profile-page-container">
        <div class="left-column">
            <ProfileSection
                :is-owner="false"
                :user-id="userId"
                :profile-pic-url="profilePicUrl"
                :name="name"
                :bio-text="bioText"
                :birthday="birthday"
                :following="following?.length"
                :followers="followers?.length"
                :is-private="isPrivate">
            </ProfileSection>
            <div class="entries-container">
                <div v-for="entry in entries" :key="entry.date.getTime()">
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
import { useCachedUserStore } from '@/Shared/CachedUserStore';
import type { OtherUserState } from '@/Shared/Models/OtherUserState';

const route = useRoute();
const cachedUser = useCachedUserStore();

const profilePicUrl = ref();
const name = ref();
const following = ref();
const followers = ref();
const bioText = ref();
const birthday = ref();
const entries = ref([] as Entry[]);
const isPrivate = ref();
const userId = ref();

watch(() => route.params.userId, (newUserId) => {
    userId.value = newUserId;
    if (cachedUser.cache.has(userId.value)) {
        const user = cachedUser.cache.get(userId.value) as OtherUserState;
        setUserState(user);
    } else {
        refreshUserState(userId.value);
    }
});

onMounted(async () => {
    // Get userId from url. Ex: moodz.com/users/ajsdlifjasifj
    userId.value = route.params.userId.toString();
    if (cachedUser.cache.has(userId.value)) {
        const user = cachedUser.cache.get(userId.value) as OtherUserState;
        setUserState(user);
    } else {
        refreshUserState(userId.value);
    }
});

async function refreshUserState(userId : string) {
    const client = new UserGetClient();
    await client.execute(userId).then(response => {
        setUserState(response);
    }).catch(error => {
        console.log(error);
    });
}

function setUserState(user : OtherUserState) {
    profilePicUrl.value = user.profilePicUrl;
        name.value = user.name;
        following.value = user.following;
        followers.value = user.followers;
        if (user.isPrivate) {
            isPrivate.value = true;
            bioText.value = 'This user has their profile privated.';
            birthday.value = null;
            entries.value = [] as Entry[];
            return;
        }
        bioText.value = user.bioText;
        birthday.value = new Date(user.birthday);
        for(let i = 0; i < user.entries.length; i++){
            user.entries[i].date = new Date(user.entries[i].date)
        }
        entries.value = user.entries;
        user.entries.sort((a, b) => b.date.getTime() - a.date.getTime());
}
</script>