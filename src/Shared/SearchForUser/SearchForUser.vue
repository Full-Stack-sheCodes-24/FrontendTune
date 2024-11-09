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
                v-if="showSearchResults && query.length != 0"
                v-for="result in searchResults"
                @click="redirect(result)">
                <img :src="result.profilePicUrl"></img>
                <p>{{result.name}}</p>
            </div>
            <div v-if="showSearchResults && query.length == 0">
                <p>Find a friend by searching their name...</p>
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
// Dictionary for query -> response to store search results and prevent excessive API calls
// Useful if the user makes a typo or queries the same thing multiple times
const cache: Record<string, UserState[]> = {};

function debouncedSearch() {
    showSearchResults.value = true;

    // If still counting down, reset the timer
    if (debounceTimeout.value) clearTimeout(debounceTimeout.value);

    // Guard for empty string query
    if (query.value === '') {
        searchResults.value = [];
        return;
    }

    // If query is in our cache, return the cached result
    if (cache[query.value]) {
        searchResults.value = cache[query.value];
        return;
    }

    // Set a timeout to wait for the user to stop typing
    debounceTimeout.value = setTimeout(() => {
        search();
    }, 300);    // If user stopped typing for 300 milliseconds, execute the search API request
}

async function search() {
    // Make an API request to our backend
    await client.execute({ query: query.value }).then(response => {
        searchResults.value = response;
        // Store the response in our cache
        cache[query.value] = response;
    }).catch(error => {
        console.log(error);
    });
}

function redirect(user : UserState) {
    showSearchResults.value = false;
    router.push({ path: `/user/${user.id}` });
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