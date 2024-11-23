<style scoped>@import'./Notifications.css';</style>
<template>
    <button @click="toggleNotification" class="btn-nav">
      <i class="material-symbols-outlined">notifications</i>
      <p class="btn-title">Notifications</p>
      <!-- Pop-out notification -->
      <div :class="['popout-notification', { show: isNotificationVisible }]" @click.self="closeNotification">
        <p>No new notifications</p>
      </div>
    </button>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const isNotificationVisible = ref(false);
  
  function toggleNotification() {
    // Toggle notification visibility
    isNotificationVisible.value = !isNotificationVisible.value;
    
    // Hide notification after a timeout (optional)
    setTimeout(() => {
      isNotificationVisible.value = false;
    }, 2000); // hides after 3 seconds
  }
  function closeNotification() {
    // Close the notification manually when clicking on it
    isNotificationVisible.value = false;
  }
  </script>