<template>
  <NavBar />
  <main>
    <RouterView />
    <Toast />
  </main>
</template>
<script setup lang="ts">
import NavBar from '@/Shared/NavBar/NavBar.vue'
import Toast from './Shared/Toast/Toast.vue';
</script>