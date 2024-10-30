import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

import Home from './components/Home.vue';
import SpotifyUserLogin from './components/SpotifyUserLogin/SpotifyUserLogin.vue';
import SpotifyCallback from './components/SpotifyUserLogin/SpotifyCallback.vue';

const routes = [
  { path: '/', redirect: '/login' }, 
  { path: '/home', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: SpotifyUserLogin },
  { path: '/callback', name: 'Callback', component: SpotifyCallback }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

createApp(App)
    .use(router)
    .mount('#app');
