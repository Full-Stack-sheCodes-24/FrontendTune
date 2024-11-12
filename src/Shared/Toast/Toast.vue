<style>@import'./Toast.css';</style>
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
    isVisible: Boolean,
    message: String,
    isError: Boolean
});

const isVisible = ref(props.isVisible);

function hideToast() {
    isVisible.value = false;
}

// Automatically hide toast after 2s
setTimeout(() => {
    isVisible.value = false;
}, 2000);

</script>