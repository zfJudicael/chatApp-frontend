import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/Login/LoginView.vue';
import RegisterView from '@/views/Register/RegisterView.vue';
import HomeView from '@/views/Home/HomeView.vue';
import WelcomeView from '@/views/Home/WelcomeView/WelcomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      // component: ()=> import('@/views/HomeView.vue'),
      children: [
        { path: '', name: 'welcome', component: WelcomeView},
        { path: 'conversation/view/:_id',  name: 'conversationView', component: ()=> import('@/views/Home/ConversationView/ConversationView.vue') }
      ]
    }
  ]
})

export default router
