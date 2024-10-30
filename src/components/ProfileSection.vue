<template>
    <div class="profile-section-container card">
        <img class="profile-picture" :src="image">
        <p v-text="text"></p>
        <p>Birthday</p>
        <p v-text="birthday?.toString()"></p>
    </div>
</template>
<script setup lang="ts">
defineProps({
    image: String,  
    text: String,
    birthday: Date
})
</script>
<style>
.profile-section-container {
}

.profile-picture {
    width: 128px;
    height: 128px;
}
</style>