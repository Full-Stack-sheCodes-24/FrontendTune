<template>
  <nav class="navbar">
    <ul>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/">Home</RouterLink>
    </ul>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
<script setup lang="ts">
</script>

<style>
.navbar {
  background-color: #cbd9e6;
  padding: 1rem;
}

.navbar ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}

.navbar a {
  color: #304674;
  text-decoration: none;
}
</style>