<style>@import'./SearchForUser.css';</style>
<template>
    <div ref="myDiv" class="search-for-user-container">
        <input
            v-model="query"
            placeholder="search for user..."
            @input="debouncedSearch()"
            @click="showSearchResults = true"
            @keydown.esc="showSearchResults = false">
        </input>
        <i class="material-icons">search</i>
        <div class="search-results-container card">
            <div class="search-result-item-container clickable"
                v-if="showSearchResults"
                v-for="result in searchResults"
                @click="redirect(result)">
                <img :src="result.profilePicUrl"></img>
                <p>{{result.name}}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { UserSearchClient } from '../Clients/UserSearchClient';
import type { UserState } from '../Models/UserState';
import { useRouter } from 'vue-router';

const router = useRouter();
const client = new UserSearchClient();

const query = ref('');
const debounceTimeout = ref();
const searchResults = ref([] as UserState[]);
const showSearchResults = ref(false);

function debouncedSearch() {
    if (debounceTimeout.value) clearTimeout(debounceTimeout.value)  // If still counting down, reset the timer

    // Set a timeout to wait for the user to stop typing
    debounceTimeout.value = setTimeout(() => {
        search();
    }, 300);    // Set how long we should wait for the user to stop typing before making a search
}

function search() {
    client.execute({ query: query.value }).then(response => {
        searchResults.value = response;
    }).catch(error => {
        console.log(error);
    });

    showSearchResults.value = true;
}

function redirect(user : UserState) {
    showSearchResults.value = false;
    router.push({ path: `user/${user.id}` });
}

// Close the dropdown results if user clicks off it or presses 'esc'
const myDiv = ref<HTMLDivElement | null>(null);

const handleClickOutside = (event : MouseEvent) => {
  if (myDiv.value && !myDiv.value.contains(event.target as Node)) {
    showSearchResults.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
</script>