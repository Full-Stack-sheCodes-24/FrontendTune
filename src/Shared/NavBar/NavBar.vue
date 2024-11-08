<style>@import'./NavBar.css';</style>
<template>
    <nav class="navbar">
        <img src = "@/assets/logo.png">
        <ul>
            <!-- If logged in, do not show login button -->
            <RouterLink to="/login" v-if="!userStateStore.isLoggedIn">Login</RouterLink>
            <RouterLink to="/home" v-if="userStateStore.isLoggedIn">Home</RouterLink>
            <RouterLink to="/logout" v-if="userStateStore.isLoggedIn">Logout</RouterLink>
        </ul>
    </nav>
</template>
<script setup lang="ts">
import { useUserStateStore } from '@/Shared/UserStateStore';

const userStateStore = useUserStateStore();
</script>