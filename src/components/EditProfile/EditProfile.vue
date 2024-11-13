<style src="./EditProfile.css"></style>

<template>
  <div v-if="isModalOpen" class="entry-modal" @click.self="closeModal">
    <div class="modal-content">
      <button @click="closeModal" class="close-button">×</button>
      <h1>Edit Profile</h1>
      <h4>Profile Picture</h4>

      <img class="edit-profile-picture" :src="newProfilePicUrl">
      <p></p>
      <AddImage @fileSelected="handleFileSelected"/>

      <form @submit.prevent="submitForm">
        <h4>Biography</h4>
        <textarea v-model="newBioText" class="entry-textarea" placeholder="Enter a bio." ></textarea>
        <h4>Birthday</h4>
        <input type="date" v-model="newBirthday" />
        <p></p>

        <!-- Post button -->
        <button type="submit" class="save-button">Save</button>

      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AddImage from '@/components/AddImage/AddImage.vue';
import { useUserStateStore } from '@/Shared/UserStateStore';
const userStateStore = useUserStateStore();

import { UserUpdateProfileClient } from '@/Shared/Clients/UserUpdateProfileClient';
import type { UserUpdateProfileRequest } from '@/Shared/Clients/UserUpdateProfileRequest';

const props = defineProps<{
  isModalOpen: boolean;
  closeModal: () => void;
}>();

const newProfilePicUrl = ref(userStateStore.profilePicUrl);
const newBioText = ref(userStateStore.bioText);
const newBirthday = ref(userStateStore.getBirthdayAsDate.toISOString().slice(0, 10));

const handleFileSelected = (fileUrl: string | undefined) => {
  if (fileUrl) {
    newProfilePicUrl.value = fileUrl; // Set profilePicUrl to the selected image URL
  }
};

const updateUserProfileClient = new UserUpdateProfileClient();

const submitForm = async () => {
  if (newProfilePicUrl.value == userStateStore.profilePicUrl
    && newBioText.value == userStateStore.bioText
    && newBirthday.value == userStateStore.getBirthdayAsDate.toISOString().slice(0, 10)
  ) {
    console.log("Nothing edited, not sending an API request")
    props.closeModal();
    return;
  }

  const request: UserUpdateProfileRequest = {
    profilePicUrl: newProfilePicUrl.value,
    bioText: newBioText.value,
    birthday: new Date(newBirthday.value)
  }

  try {
    await updateUserProfileClient.execute(request);

    userStateStore.$patch({ 
        profilePicUrl: newProfilePicUrl.value,
        bioText: newBioText.value, 
        birthday: new Date(newBirthday.value)
    })

    console.log('Profile updated successfully:');
    props.closeModal();
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};

</script>
  