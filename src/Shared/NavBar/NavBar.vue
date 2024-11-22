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
                <SearchForUser @darken="handleDarken" @lighten="handleLighten" />
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
                <!-- Login Button -->
                <button v-if="!userStateStore.isLoggedIn" class="btn-nav" @click="redirectToLogin">
                    <i class="material-symbols-outlined">login</i>
                    <p class ="btn-title">Login</p>
                </button>
                <!-- Logout Button -->
                <Logout v-if="userStateStore.isLoggedIn"></Logout>
             </div>
        </div>
    </nav>
    <div v-show="darken"
        class="darken-background"
        :class="{ 'darken-background-active': isDarkenActive }">
    </div>
</template>
<script setup lang="ts">
import { useUserStateStore } from '@/Shared/UserStateStore';
import SearchForUser from '../SearchForUser/SearchForUser.vue';
import Logout from '../../components/Logout/Logout.vue';
import { useRouter } from 'vue-router';
import { nextTick, ref } from 'vue'

const router = useRouter();
const userStateStore = useUserStateStore();

const darken = ref(false);
const isDarkenActive = ref(false);

async function handleDarken() {
    darken.value = true;
    // Wait for DOM to render darken-background div
    await nextTick();
    
    // Delay the activation of the darken transition to ensure div is ready
    setTimeout(() => {
        isDarkenActive.value = true;
    }, 10);
}

function handleLighten() {
    darken.value = false;
    isDarkenActive.value = false;
}

function redirectToLogin() {
    router.push({ name: "Login" });
}

function redirectToHome() {
    router.push({ name: "Home" });
}

function redirectToAboutUs(){
    router.push({ name: "About" });
}
function redirectToSettings(){
    router.push({ name: "Settings" });
}
</script>