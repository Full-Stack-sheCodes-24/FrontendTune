<template>
    <div>
        <h1>Loading...</h1>
    </div>
</template>
<script setup lang="ts">
import { SpotifyLoginClient } from '@/Shared/Clients/SpotifyLoginClient';
import { onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

onBeforeMount(() => {
    const code = route.query.code?.toString()!;
    const state = route.query.state?.toString()!;
    if (sessionStorage.getItem('spotify_state') === state) {
        console.log(code);
        //send code to our backend
        const client = new SpotifyLoginClient();
        client.execute({ authorizationCode: code}).then(response => {
            // On success, save userState in local storage
            localStorage.setItem("user_state", JSON.stringify(response))
        }).catch(error => {
            // If error, reroute to login page and print error to console
            console.log(error);
            router.push({ name: 'Login' });
        });

        // Redirect home
        router.push({ name: 'Home' });
    }
})

</script>
