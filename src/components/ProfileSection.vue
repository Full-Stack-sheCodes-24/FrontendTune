<template>
    <div class="profile-section-container card">
        <img class="profile-picture" :src="image">
        <div class ="profile-info">
            <p class v-text="text"></p>
            <p>Birthday</p>
            <p v-text="birthday?.toString()"></p>
        </div>
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
    display: flex;
    
    .profile-picture {
        width: 128px;
        height: 128px;
        margin-right: 20px;
        border-radius: 50%; /* Makes the picture circular */
    }

    .profile-info p {
        margin: 5px 0 ;
        display: flex;
        flex-direction: column;
    }
}
</style>