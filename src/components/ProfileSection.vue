<template>
    <div class="profile-section-container">
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
    background-color: #f9f9f9; /* Light background color */
    border: 1px solid #ddd; /* Soft border */
    border-radius: 8px; /* Rounded corners */
    padding: 20px; /* Space inside the box */
    margin: 20px; /* Space outside the box */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    font-family: 'Georgia', serif; /* Elegant font for writing */
}

.profile-picture {
    width: 128px;
    height: 128px;
}
</style>