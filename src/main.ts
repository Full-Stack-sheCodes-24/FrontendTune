import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';

import TheWelcome from './components/TheWelcome.vue';
import SpotifyUserLogin from './components/SpotifyUserLogin/SpotifyUserLogin.vue';
import SpotifyCallback from './components/SpotifyUserLogin/SpotifyCallback.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/', name: 'Home', component: TheWelcome },
  { path: '/login', name: 'Login', component: SpotifyUserLogin },
  { path: '/callback', name: 'Callback', component: SpotifyCallback }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App)
    .use(router)
    .mount('#app')
