<style scoped>@import'./Privacy.css';</style>
<template>
    <div class="privacy-container">
        <h2 class="title">Privacy and Security</h2>
        <h2>Protect Your Posts</h2>
        <p>When selected, your profile and posts will not be visible by other people</p>
        <label class="switch">
            <input type="checkbox" v-model="isPrivate">
            <span class="slider round"></span>
        </label>
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
import { ref, watch } from 'vue';

const client = new UserSettingsClient();
const toastRef = ref<typeof Toast>();
const userStateStore = useUserStateStore();
const isPrivate = ref(userStateStore.settings.isPrivate ?? false)

watch(isPrivate, async newValue => {
    await client.execute({ isPrivate: newValue }).then(() => {
        userStateStore.settings.isPrivate = isPrivate.value;
    }).catch(error => {
        console.log(error);
        toastRef.value!.showToast();
        return;
    });
});

</script>