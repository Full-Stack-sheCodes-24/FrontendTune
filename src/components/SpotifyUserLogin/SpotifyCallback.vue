<style>@import'./SpotifyCallback.css';</style>

<template>
    <div class="loading">
        <img src="https://giffiles.alphacoders.com/170/170278.gif" alt="Loading..." />
    </div>
</template>
<script setup lang="ts">
import { SpotifyLoginClient } from '@/Shared/Clients/SpotifyLoginClient';
import { onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStateStore } from '@/Shared/UserStateStore'

const route = useRoute();
const router = useRouter();
const userStateStore = useUserStateStore();

onBeforeMount(async () => {
    const code = route.query.code?.toString()!;
    const state = route.query.state?.toString()!;
    if (sessionStorage.getItem('spotify_state') === state) {
        console.log(code);
        //send code to our backend
        const client = new SpotifyLoginClient();
        await client.execute({ authorizationCode: code }).then(response => {

            console.log(response);
            
            // Save userState in pinia store to allow home page to update
            userStateStore.$patch(response!);
            userStateStore.updateExpiryDate();
            userStateStore.updateTheme();
            // Redirect home
            router.push({ name: 'Home' });
        }).catch(error => {
            // If error, reroute to login page and print error to console
            console.log(error);
            router.push({ name: 'LoginError' });
            return;
        });
    }
})
</script>