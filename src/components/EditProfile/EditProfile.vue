<style src="./EditProfile.css"></style>

<template>
  <div v-if="isModalOpen" class="entry-modal" @click.self="closeModal">
    <div class="modal-content">
      <button @click="closeModal" class="close-button">×</button>
      <h1>Edit Profile</h1>

      <h4>Profile Picture</h4>
      <img @click="addImage" class="edit-profile-picture" :src="userStateStore.profilePicUrl">
      <AddImage 
        :isImageModalOpen="isImageModalOpen"
        :closeImageModal="closeImageModal"
      />

      <form @submit.prevent="submitForm">
        <h4>Biography</h4>
        <textarea v-model="formData.bio" class="entry-textarea" placeholder="Enter a bio." ></textarea>
        <h4>Birthday</h4>
        <input type="date" v-model="formData.birthday" />
        <p></p>

        <!-- Post button -->
        <button type="submit" @click="submitForm" class="save-button">Save</button>

      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStateStore } from '@/Shared/UserStateStore';

const userStateStore = useUserStateStore();

const props = defineProps<{
  isModalOpen: boolean
  closeModal: () => void;
}>();

const formData = ref({
    profilePicUrl: '',
    bio: '',
    birthday: '',
});

const submitForm = () => {
  //backend not completed yet
};

const isImageModalOpen = ref(false);

const addImage = () => {
    isImageModalOpen.value = true;
};

const closeImageModal = () => {
    isImageModalOpen.value = false;
};
 
</script>
  