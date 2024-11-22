<style scoped>@import'./SpotifyUserLogin.css';</style>
<template>
  <div class="container">
      <header class="page-header">
          <img src = "@/assets/logo.png">
          <h1 class="title">Welcome to Moodz!</h1>
          <p class="description">A journaling application with Spotify integration. Create a journal entry and attach a song-of-the-day to capture your mood.</p>
          <div class="button-container">
          <button class="login-button" @click="login()">Login with Spotify</button>
          </div>
      </header>
  </div>
  <Toast ref="toastRef"
    :message="errorMessage"
    :is-error="true">
  </Toast>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Toast from '@/Shared/Toast/Toast.vue';
import { useUserStateStore } from '@/Shared/UserStateStore';

const route = useRoute();
const router = useRouter();
const userStateStore = useUserStateStore();

const toastRef = ref<typeof Toast>();
const errorMessage = ref<string>();

onMounted(() => {
  const error = route.path.endsWith('/error');
  if (error) {
    errorMessage.value = 'Error logging in'
    toastRef.value!.showToast();
  }

  const sessionTimeout = route.path.endsWith('/session-timeout')
  if (sessionTimeout) {
    errorMessage.value = 'Session timed out.'
    toastRef.value!.showToast();
  }
});

function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

function login() {
    const state = generateRandomString(16);
    sessionStorage.setItem('spotify_state', state);
    const redirect_uri = `${window.location.origin}/callback`;

    const params = new URLSearchParams({
        client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        response_type: 'code',
        redirect_uri: redirect_uri,
        state: state,
        scope: 'user-read-currently-playing playlist-read-private user-top-read user-read-recently-played'
    })

    const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;

    window.location.href = authUrl;
}
</script>