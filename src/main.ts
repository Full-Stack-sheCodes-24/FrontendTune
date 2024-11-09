import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home/Home.vue';
import SpotifyUserLogin from '@/components/SpotifyUserLogin/SpotifyUserLogin.vue';
import Logout from '@/components/Logout/Logout.vue';
import SpotifyCallback from '@/components/SpotifyUserLogin/SpotifyCallback.vue';
import UserProfilePage from '@/components/UserProfilePage/UserProfilePage.vue';
import { useUserStateStore } from './Shared/UserStateStore';

const routes = [
  { path: '/user/:userId', name: 'User', component: UserProfilePage, props: true },
  { path: '/', redirect: '/home' }, 
  { path: '/home', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: SpotifyUserLogin },
  { path: '/logout', name: 'Logout', component: Logout },
  { path: '/callback', name: 'Callback', component: SpotifyCallback }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const pinia = createPinia();

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app');

const userState = localStorage.getItem("user_state");
const userStore = useUserStateStore()

// If userState exists in localStorage, hydrate the userStateStore
if (userState != null) {
  userStore.$patch(JSON.parse(userState));
}