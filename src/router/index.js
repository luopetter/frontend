import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/note/:title',
      name: 'note',
      component: () => import('../views/NoteView.vue')
    },
    {
      path: '/tools',
      name: 'tools',
      component: () => import('../views/ToolsView.vue')
    },
    {
      path: '/manage',
      name: 'manage',
      component: () => import('../views/ToolsView.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/translation',
      name: 'translation',
      component: () => import('../views/translation.vue')
    },
    {
      path: '/relationship',
      name: 'relationship',
      component: () => import('../views/pages/tools/index.vue')
    },
    {
      path: '/MigrantWorkers',
      name: 'MigrantWorkers',
      component: () => import('../views/pages/tools/MigrantWorkers.vue')
    },
    {
      path: '/conveter',
      name: 'conveter',
      component: () => import('../views/pages/tools/conveter.vue')
    }

  ]
})

export default router
export {router}
