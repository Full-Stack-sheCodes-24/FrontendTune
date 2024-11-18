<style scoped>@import'./Toast.css';</style>
<template>
  <div
    v-if="isVisible"
    class="card toast"
    :class="{ error: isError }"
    @click="hideToast">
    <p>{{ props.message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  message: String,
  isError: Boolean
});

const isVisible = ref(false);
const debounceHide = ref();

function hideToast() {
    isVisible.value = false;
}

function showToast() {
  isVisible.value = true;

  // If waiting to hide toast already, reset the wait
  if (debounceHide.value) clearTimeout(debounceHide.value);

  // Automatically hide toast after 2s
  debounceHide.value = setTimeout(() => {
      hideToast();
  }, 3000);
}

defineExpose({ hideToast, showToast });

</script>