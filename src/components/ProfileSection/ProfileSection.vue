<style scoped>@import'./ProfileSection.css';</style>
<template>
  <div class="profile-section-container card">
    <div class="profile-info-container">
      <div class="profile-pic-wrapper">
        <img class="profile-picture"
          :src="profilePicUrl"
          :alt="profilePicAltText">
      </div>
      <div class ="profile-info">
          <h1 v-text="name"></h1>
          <p v-text="bioTextWithDefault"></p>
          <p v-if="formattedBirthday" v-text="`Born ${formattedBirthday}`"></p>
          <p>{{ following }} <strong>Following</strong>&emsp;{{ followers }} <strong>Followers</strong></p>
      </div>
    </div>
    <div class="btn-container">
      <button v-if="isOwner" class="btn-edit-profile" @click="openEditModal">
        <i class="material-symbols-outlined">edit</i>
      </button>
      <button v-else-if="!isFollowing" class="btn-follow" @click="handleFollow">
        Follow
      </button>
      <button v-else class="btn-unfollow" @click="handleUnfollow">
      </button>
    </div>
    <EditProfileModal
      :isModalOpen="isModalOpen"
      :closeModal="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import EditProfileModal from '@/components/EditProfile/EditProfile.vue';
import { UserFollowClient } from '@/Shared/Clients/UserFollowClient';
import { useUserStateStore } from '@/Shared/UserStateStore';
import { UserUnfollowClient } from '@/Shared/Clients/UserUnfollowClient';

const { isOwner, userId, name, bioText, birthday, following, followers } = defineProps({
  isOwner: {
    type: Boolean,
    required: true
  },
  userId: String,
  profilePicUrl: String,
  name: String,
  bioText: String,
  birthday: Date,
  following: Number,
  followers: Number
});

const userStateStore = useUserStateStore();

const profilePicAltText = computed(() => isOwner ? "Your profile picture" : `Profile picture for ${name}`);
const formattedBirthday = computed(() => birthday ? formatDateToMMDDYYYY(birthday) : null);
const bioTextWithDefault = computed(() => bioText ?? "This person has no bio.");
const isModalOpen = ref(false);
const isFollowing = computed(() => userId ? userStateStore.following?.includes(userId) : false);

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

async function handleFollow() {
  const client = new UserFollowClient();

  await client.execute(userId!).then(() => {
    userStateStore.following.push(userId!);
  });
}

async function handleUnfollow() {
  const client = new UserUnfollowClient();

  await client.execute(userId!).then(() => {
    userStateStore.following = userStateStore.following.filter(id => id !== userId);
  });
}
 
</script>