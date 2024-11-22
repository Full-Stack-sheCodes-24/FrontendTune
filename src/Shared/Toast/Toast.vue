<style scoped>@import'./Toast.css';</style>
<template>
  <div v-if="toastStore.toasts.length" class="toast-container">
    <div v-for="toast in toastStore.toasts" :key="toast.id" class="card toast" :class="ToastType[toast.type]"
      @click="toastStore.removeToast(toast.id)">
      <p>{{ toast.message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ToastType } from './Toast';
import { useToastStore } from './ToastStore';

const toastStore = useToastStore();
</script>