<template>
    <div>
        <h1>Loading...</h1>
    </div>
</template>
<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

onBeforeMount(() => {
    const code = route.query.code;
    const state = route.query.state;
    if (sessionStorage.getItem('spotify_state') === state) {
        console.log(code);
        //send code to our backend
        router.push({ name: 'Home' });
    }
})

</script>
