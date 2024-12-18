import './assets/main.css';
import { createApp, watch } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { createRouter, createWebHistory, useRouter, type Router } from 'vue-router';
import Home from '@/components/Home/Home.vue';
import SpotifyUserLogin from '@/components/SpotifyUserLogin/SpotifyUserLogin.vue';
import Logout from '@/components/Logout/Logout.vue';
import Settings from '@/Shared/Settings/Settings.vue'
import SpotifyCallback from '@/components/SpotifyUserLogin/SpotifyCallback.vue';
import UserProfilePage from '@/components/UserProfilePage/UserProfilePage.vue';
import { markRaw } from 'vue'
import AboutUs from './components/AboutUs/AboutUs.vue';
import { useUserStateStore } from './Shared/UserStateStore';
import Feed from './components/Feed/Feed.vue';
import Notifications from './components/Notifications/Notifications.vue';

const routes = [
  { path: '/user/:userId', name: 'User', component: UserProfilePage },
  { path: '/', redirect: '/feed' }, 
  { path: '/feed', name: 'Feed', component: Feed },
  { path: '/me', name: 'Profile', component: Home },
  { path: '/login', name: 'Login', component: SpotifyUserLogin },
  { path: '/login/error', name: 'LoginError', component: SpotifyUserLogin },
  { path: '/login/session-timeout', name: 'LoginSessionTimeout', component: SpotifyUserLogin },
  { path: '/logout', name: 'Logout', component: Logout },
  { path: '/settings', name: 'Settings', component: Settings },
  { path: '/callback', name: 'Callback', component: SpotifyCallback },
  { path: '/about', name: 'About', component: AboutUs },
  { path: '/notifs', name: 'Notifications', component: Notifications}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const userState = useUserStateStore();
  // If route does not match any route
  if (to.matched.length === 0) {
    if (userState.isLoggedIn) {
      next({ name: 'Feed' });
    }
    else {
      next({ name: 'Login' });
    }
  }
  // If not logged in, reroute all pages to login except for pages that don't require login
  else if (!userState.isLoggedIn && (to.name !== 'User' && to.name !== 'Callback' && !to.path.includes('login') && to.name !== 'About')) {
    next({ name: 'Login' });
  }
  // reroute logged-out-only pages
  else if (userState.isLoggedIn && (to.name === 'Callback' || to.path.includes('login'))) {
    next({ name: 'Feed' });
  }
  else {
    next();
  }
});

const pinia = createPinia();
declare module 'pinia' {
  export interface PiniaCustomProperties {
    router: Router
  }
}
pinia.use(({ store }) => {
  store.router = markRaw(router)
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

// If cached login exists, refresh user state in the case that user logged in elsewhere and updated info
const cache = localStorage.getItem('user_state')
if(cache != null && JSON.parse(cache).id != null) {
  useUserStateStore().refreshUserState();
}