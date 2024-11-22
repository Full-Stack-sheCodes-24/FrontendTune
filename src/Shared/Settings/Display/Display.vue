<style scoped>@import'./Display.css';</style>
<template>
    <div class="display-container">
        <h2 class="title">Display Preferences</h2>
        <h2>Theme</h2>
        <div class="presets">
            <div class="color-container" @click="handleThemeClick($event)">
                <div id="blue" class="color blue"></div>
            </div>
            <div class="color-container" @click="handleThemeClick($event)">
                <div id="pink" class="color pink"></div>
            </div>
            <div class="color-container" @click="handleThemeClick($event)">
                <div id="green" class="color green"></div>
            </div>
            <div class="color-container" @click="handleThemeClick($event)">
                <div id="purple" class="color purple"></div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { UserSettingsClient } from '@/Shared/Clients/UserSettingsClient';
import { useUserStateStore } from '@/Shared/UserStateStore';
import { useToastStore } from '@/Shared/Toast/ToastStore';
import { ToastType } from '@/Shared/Toast/Toast';

const client = new UserSettingsClient();
const userStateStore = useUserStateStore();
const toastStore = useToastStore();

async function handleThemeClick(event : MouseEvent) {
    const target = event.target as HTMLElement;
    const id = target.id;

    // If selected theme is already the set theme, return
    if (id === userStateStore.settings.theme) return;

    await client.execute({ theme: id }).then(() => {
        userStateStore.settings.theme = id;
        userStateStore.updateTheme();
    }).catch(error => {
        console.log(error);
        toastStore.addToast('Error: Failed to update settings. Please try again later.', ToastType.error);
        return;
    });
}

</script>