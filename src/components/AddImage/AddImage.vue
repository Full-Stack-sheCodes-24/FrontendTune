<style>@import'./AddImage.css';</style>

<template>
    <input type="file" @change="onFileSelected" accept="image/*" />
 </template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const emit = defineEmits<{
  (e: 'fileSelected', fileData: string | undefined): void;
}>();

// Method to handle image upload
const onFileSelected = (event: Event) => {
    console.log(event)
    const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        console.log("yay file")
        emit('fileSelected', e.target?.result as string); // Emit the file data (e.g., as a data URL)
    };
    reader.readAsDataURL(file);
}
}
</script>