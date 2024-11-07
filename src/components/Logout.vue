<template>
    <p>Are you sure you want to logout?</p>
    <button @click="logout()">Yes</button>
    <button @click="redirect()">No</button>
</template>
<script setup lang="ts">
import { useUserStateStore } from '@/Shared/UserStateStore';
import { useRouter } from 'vue-router';

const userStateStore = useUserStateStore();
const router = useRouter();

function logout() {
    localStorage.removeItem("user_state");
    userStateStore.$reset();
    router.push({ name: 'Login' });
}

function redirect() {
    router.push({ name: 'Home' });
}
</script>
<style>
</style>