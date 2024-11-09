<style>@import'./ProfileSection.css';</style>
<template>
  <div class="profile-section-container card">
    <div class="profile-info-container">
      <img class="profile-picture" :src="profilePicUrl">
      <div class ="profile-info">
          <h1 v-text="name"></h1>
          <p v-text="exampleBioText"></p>
          <p v-text="`Born ${formattedBirthday}`"></p>
      </div>
    </div>
    <button class="btn-edit-profile">Edit Profile</button>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStateStore } from '@/Shared/UserStateStore';

const userStateStore = useUserStateStore();
const {name, profilePicUrl} = storeToRefs(userStateStore)

const exampleBioText = "this is my profile information";
const exampleBirthday = new Date();
const formattedBirthday = exampleBirthday.toDateString();
</script>