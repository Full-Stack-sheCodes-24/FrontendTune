<style scoped>@import'./NavBar.css';</style>
<template>
    <nav class="navbar">
        <div class="navbar-layout">
            <!-- If logged in, do not show login button -->
             <div class="btn-container">
                <img class="logo"
                    src="@/assets/logo.png"
                    @click="redirectToHome"
                    alt="Moodz logo">
                    <!-- If logged in, do not show login button -->
                    <!-- <RouterLink to="/login" v-if="!userStateStore.isLoggedIn">Login</RouterLink> -->
                <SearchForUser></SearchForUser>
             </div>
             <div class="btn-container">
                <button v-if="userStateStore.isLoggedIn" class="btn-nav">
                    <i class="material-symbols-outlined">notifications</i>
                    <p class ="btn-title">Notifications</p>
                </button>
                <!-- Home Button -->
                <button v-if="userStateStore.isLoggedIn" class="btn-nav" @click ="redirectToHome">
                    <i class="material-symbols-outlined">home</i>
                    <p class ="btn-title">Home</p>
                </button>
                <!-- About Us Button -->
                <button class="btn-nav" @click="redirectToAboutUs">
                    <i class="material-symbols-outlined">group</i>
                    <p class ="btn-title">About</p>
                </button>
                <!-- Settings Button -->
                <button v-if="userStateStore.isLoggedIn" class="btn-nav" @click="redirectToSettings">
                    <i class="material-symbols-outlined">settings</i>
                    <p class="btn-title">Settings</p>
                </button>
                <!-- Logout Button -->
                <Logout v-if="userStateStore.isLoggedIn"></Logout>
             </div>
        </div>
    </nav>
</template>
<script setup lang="ts">
import { useUserStateStore } from '@/Shared/UserStateStore';
import SearchForUser from '../SearchForUser/SearchForUser.vue';
import Logout from '../../components/Logout/Logout.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStateStore = useUserStateStore();

function redirectToHome() {
    router.push({ name: "Home" });
}

function redirectToAboutUs(){
    router.push({ name:"About"});
}
function redirectToSettings(){
    router.push({ name:"Settings"});
}
</script>