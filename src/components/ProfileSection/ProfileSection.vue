<style>@import'./ProfileSection.css';</style>
<template>
  <div class="profile-section-container card">
    <div class="profile-info-container">
      <img class="profile-picture" :src="profilePicUrl">
      <div class ="profile-info">
          <h1 v-text="name"></h1>
          <p v-text="bioText"></p>
          <p v-if="formattedBirthday" v-text="`Born ${formattedBirthday}`"></p>
      </div>
    </div>
    <button v-if="isOwner"class="btn-edit-profile">Edit Profile</button>
  </div>
</template>
<script setup lang="ts">

const { birthday } = defineProps({
  isOwner: {
    type: Boolean,
    required: true
  },
  profilePicUrl: String,
  name: String,
  bioText: String,
  birthday: Date
});

const formattedBirthday = birthday?.toDateString() ?? null;
</script>