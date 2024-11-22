<style scoped src="./AudioPlayer.css"></style>
<template>
    <transition appear type="transition" name="audio-transition" @before-enter="animateVolumeChange(savedVolume)" @before-leave="waitToLeave">
    <div class="audio-player" v-if="props.isVisible">
        <!-- Progress Bar -->
        <div class="progress-bar" @click="seek($event)">
            <div class="progress" :style="{ width: progress + '%' }"></div>
        </div>

        <!-- Volume Control -->
        <div class="volume-control">
            <label for="volume">
                <i class="material-symbols-outlined">volume_up</i>
            </label>
            <div class="volume-slider">
                <input
                    id="volume"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    v-model="volume"
                    @input="updateVolume"
                />
                <div
                    class="volume-thumb"
                    :style="{ left: `${volume * 100}%` }">
                </div>
            </div>
        </div>

        <!-- Circular Progress Bar -->
        <div class="circular-progress-container" @click="togglePlay">
            <slot name="image"></slot>
            <i v-if="isPlaying" class="material-symbols-outlined">pause</i>
            <i v-else class="material-symbols-outlined">play_arrow</i>
            <svg viewBox="0 0 100 100" class="circular-progress">
                <!-- Background Circle -->
                <circle cx="50" cy="50" :r="radius" class="progress-bg"/>
                <!-- Progress Circle -->
                <circle
                    cx="50"
                    cy="50"
                    :r="radius"
                    class="progress-bar"
                    :style="{ strokeDashoffset: progressOffset }"
                />
            </svg>
        </div>
    
        <!-- Hidden default audio tag -->
        <audio
            ref="audioElement"
            :src="src"
            :autoplay="autoPlay"
            @timeupdate="updateProgress"
            @loadedmetadata="setDuration"
            @ended="onAudioEnd"
            @pause="emit('pause')"
            @play="emit('play')">
        </audio>
    </div>
</transition>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

const props = defineProps({
    src: String,
    autoPlay: {
        type: Boolean,
        default: false
    },
    isVisible: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['pause', 'play'])

const isPlaying = ref(true);
const progress = ref(0);
const currentTime = ref(0);
const duration = ref(0);
const audioElement = ref<HTMLAudioElement | null>(null);
const volume = ref(0);
const savedVolume = ref(Number(localStorage.getItem('volume_level')) ?? 0.5);

// Reset isPlaying state when put away
watch(props, props => {
    if (props.isVisible === false) {
        isPlaying.value = true;
    }
})

watch(audioElement, audioElement => {
    if (audioElement) {
        // Prevent loud popping noise when not initialized
        audioElement.muted = true;
        setInterval(() => {
            if (audioElement) {
                audioElement.muted = false;
            }
        }, 100);
    }
});

// Radius and circumference of the circular progress bar
const radius = 26;
const circumference = 2 * Math.PI * radius;

// Reactive strokeDashoffset for the circular progress
const progressOffset = computed(() => {
  const progress = currentTime.value / duration.value;
  return circumference * (1 - progress); // Invert progress for stroke direction
});

// Toggles playback
const togglePlay = () => {
    if (!audioElement.value) return;
    if (isPlaying.value) {
        audioElement.value.pause();
    } else {
        audioElement.value.play();
    }
    isPlaying.value = !isPlaying.value;
};

// Updates playback progress
const updateProgress = () => {
    if (!audioElement.value) return;
    currentTime.value = audioElement.value.currentTime;
    progress.value =
        (audioElement.value.currentTime / audioElement.value.duration) * 100;
};

// Sets the total duration when metadata is loaded
const setDuration = () => {
    if (!audioElement.value) return;
    duration.value = audioElement.value.duration;
};

// Seeks to a specific time when the progress bar is clicked
const seek = (event: MouseEvent) => {
    if (!audioElement.value) return;
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const clickPercentage = clickPosition / rect.width;
    audioElement.value.currentTime = clickPercentage * audioElement.value.duration;
};

// Loops the audio when it ends
const onAudioEnd = () => {
    audioElement.value?.play();
};

// Updates the audio volume
function updateVolume() {
    if (audioElement.value) {
        audioElement.value.volume = volume.value;
        localStorage.setItem('volume_level', volume.value.toString());
    }
};

// Smoothly animate the volume change
function animateVolumeChange (target: number) {
    const step = (target - volume.value) / 10; // Change volume by 1/10th each frame

    // Use requestAnimationFrame to gradually change the volume
    const fadeInterval = setInterval(() => {
        if (Math.abs(volume.value - target) < Math.abs(step)) {
            volume.value = target;
            if (audioElement.value) {
                audioElement.value!.volume = volume.value;
            }
            clearInterval(fadeInterval); // Stop animation when target is reached
        } else {
            volume.value += step;
            if (audioElement.value) {
                audioElement.value!.volume = volume.value;
            }
        }
    }, 100); // Update volume every 100ms for a smooth transition
};

// Once the fade is complete, set isVisible to false
function waitToLeave() {
    volume.value = 0;
    animateVolumeChange(0);
};
</script>
