<template>
    <div class="container">
        <header class="page-header">
            <h1 class="title">Welcome to Moodz!</h1>
            <p class="description">A journaling application with Spotify integration. Create a journal entry and attach a song-of-the-day to capture your mood.</p>
            <div class="button-container">
            <button class="login-button" @click="login()">Login with Spotify</button>
            </div>
        </header>
    </div>
  </template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

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

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding-top: 10vh; /* Adjusts the distance from the top */
}

/* Center-left alignment for title, description, and button */
.page-header {
  max-width: 60%; /* Limit the width of content */
  text-align: center;
}

/* Styling for the title */
.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #304674;
  margin-bottom: 0.5rem;
}

/* Styling for the description */
.description {
  font-size: 1.2rem;
  color: #304674; /* Gray text */
  margin-bottom: 1.5rem;
}

/* Button styling */
.button-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.login-button {
  background-color: #6eb06e;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #5a8a5a; /* Darker blue on hover */
}
</style>