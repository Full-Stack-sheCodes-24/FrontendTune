<style>@import'./Settings.css';</style>
<template>
    <div class="settings-container">
        <div class="left-column card">
            <div class="profile-info-container">
                <div class="profile-pic-wrapper">
                    <img class="profile-picture" :src="userStateStore.profilePicUrl">
                </div>
                <h1>Settings</h1>
            </div>
            <div class="settings-tab-container">
                <div id="0"
                    class="tab clickable"
                    @click="handleTabClick($event)">
                    <i class="material-symbols-outlined">monitor</i>
                    <h2>Display Preferences</h2>
                </div>
            </div>
        </div>

        <div class="right-column card">
            <Display v-if="selectedTab === 0"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useUserStateStore } from '@/Shared/UserStateStore';
import Display from './Display/Display.vue';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

const userStateStore = useUserStateStore();
const router = useRouter();

const selectedTab = ref(0);

function handleTabClick(event : MouseEvent) {
    const target = event.target as HTMLDivElement;
    selectedTab.value = Number(target.id);
}

onBeforeMount(() => {
    // If user is not logged in, reroute to Login page
    if (!userStateStore.isLoggedIn) {
        router.push({ name: 'Login' });
    }
});

</script>