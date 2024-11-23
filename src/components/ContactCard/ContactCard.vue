<style scoped src="./ContactCard.css"></style>
<template>
    <div class="entry-container card clickable" @click="redirectToUserProfile">
        <img class="profile-picture"
            :src="profilePicUrl"
            :alt="`Profile picture for ${name}`"
        />
        <div class="profile-info">
            <h1 v-text="name"></h1>
            <p v-text="bioText"></p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const props = defineProps({
    id: String,
    profilePicUrl: String,
    name: String,
    bioText: String
});

const router = useRouter();

function redirectToUserProfile() {
    router.push({ path: `/user/${props.id}` });
}

</script>