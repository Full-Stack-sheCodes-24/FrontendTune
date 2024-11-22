<style scoped>@import'./Logout.css';</style>
<template>
    <!-- Button to trigger logout modal -->
    <!-- <button @click="openLogoutModal" class="nav-logout-button">Logout</button> -->
    <button @click="openLogoutModal" class="nav-logout-button">
        <i class="material-symbols-outlined">logout</i>
        <p class ="btn-title">Logout</p>
    </button>
    <div v-if="isModalOpen" class="logout-modal" @click.self="closeModal">
        <div class="modal-content">
            <p>Are you sure you want to logout?</p>
            <div class="button-container">
                <button @click="logout" class="logout-button">Yes</button>
                <button @click="closeModal" class="cancel-button">No</button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useUserStateStore } from '@/Shared/UserStateStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const userStateStore = useUserStateStore();
const router = useRouter();
const isModalOpen = ref(false);

function openLogoutModal() {
  isModalOpen.value = true;
}

function closeModal() {
    isModalOpen.value = false;
}

function logout() {
    userStateStore.resetTheme();
    localStorage.removeItem("user_state");
    userStateStore.$reset();
    router.push({ name: 'Login' });
    isModalOpen.value = false;
}

</script>