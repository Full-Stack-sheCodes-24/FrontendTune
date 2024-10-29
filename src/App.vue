<template>
  <nav class="navbar">
    <img src = "C:\Users\louja\Downloads\FrontendTune\src\assets\Moodz_Logo.png">
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
  display: flex;
  background-color: #C8D9E6;
  align-items: center;
  padding: 1rem;
  font-size: 16px;
}
img{
  height: 40px;
  margin-right: 1rem;
}
.navbar ul {
  list-style: none;
  display: flex;
  gap: 2rem;
}

.navbar a {
  color: #304674;
  text-decoration: none;
  padding: 0.5rem 1rem; /* Add padding inside the border */
  border: 1px solid #304674; /* Border around each link */
  border-radius: 4px; /* Optional rounded corners */
}
</style>