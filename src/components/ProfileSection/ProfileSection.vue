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
          <p>{{ following }} <strong>Following</strong>&emsp;{{ followersCount }} <strong>Followers</strong></p>
      </div>
    </div>
    <div class="btn-container">
      <button v-if="isOwner" class="btn-edit-profile" @click="openEditModal">
        <i class="material-symbols-outlined">edit</i>
      </button>
      <button v-else-if="hasRequested" class="btn-requested" @click="handleUnrequest">
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
    <Toast ref="toastRef"
        :is-error="true"
        :message="`Unable to ${errorMessage}. Please try again later.`">
    </Toast>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import EditProfileModal from '@/components/EditProfile/EditProfile.vue';
import { UserFollowClient } from '@/Shared/Clients/UserFollowClient';
import { useUserStateStore } from '@/Shared/UserStateStore';
import { UserUnfollowClient } from '@/Shared/Clients/UserUnfollowClient';
import { Status } from '@/Shared/Models/FollowRequest';
import { UserUnrequestClient } from '@/Shared/Clients/UserUnequestClient';
import Toast from '@/Shared/Toast/Toast.vue';

const { isOwner, userId, name, bioText, birthday, following, followers, isPrivate } = defineProps({
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
  followers: Number,
  isPrivate: Boolean
});

const userStateStore = useUserStateStore();

const profilePicAltText = computed(() => isOwner ? "Your profile picture" : `Profile picture for ${name}`);
const formattedBirthday = computed(() => birthday ? formatDateToMMDDYYYY(birthday) : null);
const bioTextWithDefault = computed(() => bioText ?? "This person has no bio.");
const isModalOpen = ref(false);
const isFollowing = computed(() => userId ? userStateStore.following?.includes(userId) : false);
const hasRequested = computed(() => userStateStore.followRequests?.find(fr => fr.fromUserId === userStateStore.id && fr.toUserId === userId && fr.status === Status.pending));
// Props are readonly, so use local offset to change the appearance of followers count instead of fetching new user data
const followersOffset = ref(0);
const followersCount = computed(() => (followers ?? 0) + followersOffset.value);
const toastRef = ref<typeof Toast>();
const errorMessage = ref();

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

  if (isPrivate) {
    userStateStore.followRequests.push({ fromUserId: userStateStore.id, toUserId: userId!, status: Status.pending });
  } else {
    userStateStore.following.push(userId!);
    followersOffset.value++;
  }

  // If server failed, revert client side status
  await client.execute(userId!).catch(() => {
    if (isPrivate) {
      userStateStore.followRequests.pop();
    } else {
      userStateStore.following.pop();
      followersOffset.value--;
    }

    errorMessage.value = 'follow'
    toastRef.value!.showToast();
  });
}

async function handleUnfollow() {
  const client = new UserUnfollowClient();

  userStateStore.following = userStateStore.following.filter(id => id !== userId);
  followersOffset.value--;

  // If server failed, revert client side status
  await client.execute(userId!).catch(() => {
    userStateStore.following.push(userId!);
    followersOffset.value++;

    errorMessage.value = 'unfollow'
    toastRef.value!.showToast();
  });
}

async function handleUnrequest() {
  const client = new UserUnrequestClient();
  
  userStateStore.followRequests = userStateStore.followRequests.filter(fr => fr.fromUserId !== userStateStore.id && fr.toUserId !== userId);

  // If server failed, revert client side status
  await client.execute(userId!).catch(() => {
    userStateStore.followRequests.push({ fromUserId: userStateStore.id, toUserId: userId!, status: Status.pending })

    errorMessage.value = 'unrequest'
    toastRef.value!.showToast();
  });
}
 
</script>