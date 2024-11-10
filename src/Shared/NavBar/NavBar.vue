<style>@import'./NavBar.css';</style>
<template>
    <nav class="navbar">
        <div class="navbar-layout">
            <!-- If logged in, do not show login button -->
             <div class="btn-container">
                <img src="@/assets/logo.png" @click="redirectToHome">
                <!-- If logged in, do not show login button -->
                <RouterLink to="/login" v-if="!userStateStore.isLoggedIn">Login</RouterLink>
                <RouterLink to="/home" v-if="userStateStore.isLoggedIn">Home</RouterLink>
             </div>
             <div class="btn-container">
                <SearchForUser></SearchForUser>
                <RouterLink to="/logout" v-if="userStateStore.isLoggedIn">Logout</RouterLink>
             </div>
        </div>
    </nav>
</template>
<script setup lang="ts">
import { useUserStateStore } from '@/Shared/UserStateStore';
import SearchForUser from '../SearchForUser/SearchForUser.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStateStore = useUserStateStore();

function redirectToHome() {
    router.push({ name: "Home" });
}
</script>