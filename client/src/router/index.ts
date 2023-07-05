import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      alias: '/home'
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/404View.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/auth/UserView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('../views/ListView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/list/:listId',
      name: 'movieList',
      component: () => import('../views/MovieListView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/movie/:movieId',
      name: 'movie',
      component: () => import('../views/MovieView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from) => {
  const store = useAuthStore()

  if (to.meta.requiresAuth && !store.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  } else if (to.meta.requiresGuest && store.isAuthenticated) {
    return { name: 'home' }
  }
})

export default router
