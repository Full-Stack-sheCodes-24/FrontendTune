<style>@import'./ProfileSection.css';</style>
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

async function convertBlobToBase64(blob : Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result); // reader.result will contain the Base64 string
    reader.onerror = reject;
    reader.readAsDataURL(blob); // Convert the Blob to Base64
  });
}
</script>