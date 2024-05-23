import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/Login/LoginView.vue';
import RegisterView from '@/views/Register/RegisterView.vue';
import HomeView from '@/views/HomeView.vue';


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
      component: HomeView
    },
    // {
      // path: '/test',
      // name: 'test',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/test.vue')
    // }
  ]
})

export default router
