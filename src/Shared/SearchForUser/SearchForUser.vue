<style scoped>@import'./SearchForUser.css';</style>
<template>
    <div ref="searchUserDiv" class="search-for-user-container">
        <i class="material-symbols-outlined search-icon">search</i>
        <input
            ref="inputRef"
            v-model="query"
            title="Search"
            placeholder="Search"
            @input="debouncedSearch()"
            @keydown.esc="close"
            @focusin="handleFocusIn"
            @blur="handleFocusOut">
        </input>
        <div v-if="showSearchResults"
            class="search-results-container card">
            <div class="search-result-item-container clickable"
                v-if="query.length !== 0"
                v-for="result in searchResults"
                :key="result.id"
                @click="redirect(result)"
                @mousedown.prevent>
                <img class="profile-pic" :src="result.profilePicUrl"></img>
                <span>
                    <p>{{result.name}}</p>
                    <i v-if="result.isPrivate" class="material-symbols-outlined">lock</i>
                </span>
            </div>
            <p v-if="query.length !==0 && noSearchResults">No search results</p>
            <p v-if="query.length === 0">Find a friend by searching for their name</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UserSearchClient } from '../Clients/UserSearchClient';
import { useRouter } from 'vue-router';
import { useUserStateStore } from '../UserStateStore';
import type { OtherUserState } from '../Models/OtherUserState';
import { useCachedUserStore } from '../CachedUserStore';

const emit = defineEmits(['darken', 'lighten']);

const router = useRouter();
const userStateStore = useUserStateStore();
const cachedUser = useCachedUserStore();
const client = new UserSearchClient();

const inputRef = ref<HTMLElement | null>();
const query = ref('');
const debounceTimeout = ref();
const searchResults = ref([] as OtherUserState[]);
const noSearchResults = ref(false);
const showSearchResults = ref(false);
// Dictionary for query -> response to store search results and prevent excessive API calls
// Useful if the user makes a typo or queries the same thing multiple times
const cache: Record<string, OtherUserState[]> = {};

function debouncedSearch() {
    showSearchResults.value = true;
    noSearchResults.value = false;

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
        if (searchResults.value.length === 0) noSearchResults.value = true;
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
        if (searchResults.value.length === 0) noSearchResults.value = true;
        // Store the response in our cache
        cache[query.value] = response;
    }).catch(error => {
        console.log(error);
    });
}

function redirect(user : OtherUserState) {
    cachedUser.cache.set(user.id, user);
    showSearchResults.value = false;
    inputRef.value!.blur();
    query.value = '';
    // If user clicks on themself, send them to their home page
    if (user.id === userStateStore.id) {
        router.push({ name: 'Home' });
        return;
    }
    router.push({ path: `/user/${user.id}` });
}

function close(event : KeyboardEvent) {
    showSearchResults.value = false;
    const target = event.target as HTMLInputElement;
    target.blur();
}

function handleFocusIn() {
    showSearchResults.value = true;
    emit('darken');
}

function handleFocusOut() {
    showSearchResults.value = false;
    emit('lighten');
}
</script>