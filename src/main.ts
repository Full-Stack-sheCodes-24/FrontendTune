import './assets/main.css';
import { createApp, watch } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { createRouter, createWebHistory, useRouter } from 'vue-router';
import Home from '@/components/Home/Home.vue';
import SpotifyUserLogin from '@/components/SpotifyUserLogin/SpotifyUserLogin.vue';
import Logout from '@/components/Logout/Logout.vue';
import SpotifyCallback from '@/components/SpotifyUserLogin/SpotifyCallback.vue';
import UserProfilePage from '@/components/UserProfilePage/UserProfilePage.vue';
import { markRaw } from 'vue'

const routes = [
  { path: '/user/:userId', name: 'User', component: UserProfilePage },
  { path: '/', redirect: '/home' }, 
  { path: '/home', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: SpotifyUserLogin },
  { path: '/login/error', name: 'LoginError', component: SpotifyUserLogin },
  { path: '/logout', name: 'Logout', component: Logout },
  { path: '/callback', name: 'Callback', component: SpotifyCallback }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const pinia = createPinia();

pinia.use(({ store }) => {
  store.$router = markRaw(router)
});

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app');


// Any time the state is updated, update our local storage
watch(pinia.state, state => {
  localStorage.setItem('user_state', JSON.stringify(state.userState));
},
{ deep: true}
);