<template>
    <div class="profile-section-container card">
        <img class="profile-picture" :src="profilePicUrl">
        <div class ="profile-info">
            <p v-text="name"></p>
            <p v-text="exampleBioText"></p>
            <p>Birthday</p>
            <p v-text="exampleBirthday.toString()"></p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStateStore } from '@/Shared/UserStateStore';

const userStateStore = useUserStateStore();
const {name, profilePicUrl} = storeToRefs(userStateStore)

const exampleBioText = "this is my profile information";
const exampleBirthday = new Date();
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