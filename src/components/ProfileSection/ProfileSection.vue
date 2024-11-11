<style>@import'./ProfileSection.css';</style>
<template>
  <div class="profile-section-container card">
    <div class="profile-info-container">
      <img class="profile-picture" :src="profilePicUrl">
      <div class ="profile-info">
          <h1 v-text="name"></h1>
          <p v-text="bioText" data-placeholder="This person has no bio." contenteditable></p>
          <p v-if="formattedBirthday" v-text="`Born ${formattedBirthday}`"></p>
      </div>
    </div>
    <button v-if="isOwner"class="btn-edit-profile" @click="openEditModal">Edit Profile</button>
    <EditProfileModal
      :isModalOpen="isModalOpen"
      :closeModal="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import EditProfileModal from '@/components/EditProfile/EditProfile.vue';

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

const formattedBirthday = computed(() => formatDateToMMDDYYYY(birthday));

const isModalOpen = ref(false);

const openEditModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

function formatDateToMMDDYYYY(date : Date | undefined) : string | null {
  if (date === undefined) return null;

  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getUTCDate()).padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${month}/${day}/${year}`;
}
 
</script>

