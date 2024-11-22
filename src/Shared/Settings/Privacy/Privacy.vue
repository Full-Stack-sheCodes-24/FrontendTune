<style scoped>@import'./Privacy.css';</style>
<template>
    <div class="privacy-container">
        <h2 class="title">Privacy and Safety</h2>
        <h2>Protect Your Posts</h2>
        <label>
            When selected, your profile and posts will not be visible by other people
            <div class="switch">
                <input type="checkbox" v-model="isPrivate">
                <span class="slider round"></span>
            </div>
        </label>
    </div>
</template>
<script setup lang="ts">
import { UserSettingsClient } from '@/Shared/Clients/UserSettingsClient';
import { ToastType } from '@/Shared/Toast/Toast';
import { useToastStore } from '@/Shared/Toast/ToastStore';
import { useUserStateStore } from '@/Shared/UserStateStore';
import { ref, watch } from 'vue';

const client = new UserSettingsClient();
const userStateStore = useUserStateStore();
const toastStore = useToastStore();
const isPrivate = ref(userStateStore?.settings?.isPrivate ?? false);

watch(isPrivate, async newValue => {
    await client.execute({ isPrivate: newValue }).then(() => {
        userStateStore.settings.isPrivate = newValue;
    }).catch(error => {
        console.log(error);
        toastStore.addToast('Error: Failed to update settings. Please try again later.', ToastType.error);
        return;
    });
});

</script>