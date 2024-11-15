<style>@import'./Display.css';</style>
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
        </div>
    </div>
    <Toast ref="toastRef"
        :is-error="true"
        message="Error: Failed to update settings. Please try again later.">
    </Toast>
</template>
<script setup lang="ts">
import { UserSettingsClient } from '@/Shared/Clients/UserSettingsClient';
import Toast from '@/Shared/Toast/Toast.vue';
import { useUserStateStore } from '@/Shared/UserStateStore';
import { ref } from 'vue';

const client = new UserSettingsClient();
const toastRef = ref<typeof Toast>();
const userStateStore = useUserStateStore();

async function handleThemeClick(event : MouseEvent) {
    const target = event.target as HTMLElement;
    const id = target.id;

    await client.execute({ theme: id }).then(() => {
        userStateStore.settings.theme = id;
        userStateStore.updateTheme();
    }).catch(error => {
        console.log(error);
        toastRef.value!.showToast();
        return;
    });
}

</script>