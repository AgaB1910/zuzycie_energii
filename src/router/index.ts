import { createRouter, createWebHistory } from 'vue-router'

import StartPage from '@/components/StartPage.vue'
import NotificationPage from '@/components/NotificationPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/start' },
    { path: '/start', component: StartPage },
    { path: '/notification', component: NotificationPage }
  ]
})

export default router
