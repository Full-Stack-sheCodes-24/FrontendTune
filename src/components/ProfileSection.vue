<template>
    <div class="profile-section-container card">
        <img class="profile-picture" :src="imageSrc">
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
import { onMounted, ref } from 'vue';

const userStateStore = useUserStateStore();
const {name} = storeToRefs(userStateStore)
const imageSrc = ref("");

const exampleBioText = "this is my profile information";
const exampleBirthday = new Date();

onMounted(async () => {
    // If image is cached, load it in. Else, cache the image in state
    if(userStateStore.profilePicCache != null) {
        imageSrc.value = userStateStore.profilePicCache;
    } else {
        const response = await fetch(userStateStore.profilePicUrl);
        const blob = await response.blob();
        const base64 = await convertBlobToBase64(blob);
        userStateStore.profilePicCache = base64 as string;
        imageSrc.value = base64 as string;
    }
});

async function convertBlobToBase64(blob : Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result); // reader.result will contain the Base64 string
    reader.onerror = reject;
    reader.readAsDataURL(blob); // Convert the Blob to Base64
  });
}
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