// Composables
import { createRouter, createWebHistory } from 'vue-router'
import apiClient from '../config/axios';
import store from '../store';
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
        meta: { requiresAuth: true }
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { guest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
    meta: { guest: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = await store.dispatch('checkToken');
  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
        next({ name: 'Login' });
    } else {
      next();
    }
  }
  if (to.meta.guest) {
    if (isAuthenticated) {
      next({ name: 'Home' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
