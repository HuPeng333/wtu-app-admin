import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const LoginPage = () => import('../views/LoginPage/LoginPage.vue')
const AdminPage = () => import('../views/AdminPage/AdminPage.vue')
const AppInfo = () => import('../views/AdminPage/AppInfo/AppInfo.vue')
const AppUpdate = () => import('../views/AdminPage/AppUpdate/AppUpdate.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: {
      hideHeader: true
    }
  },
  {
    path: '/admin',
    name: 'AppPage',
    component: AdminPage,
    children: [
      {
        path: '',
        name: 'AppInfo',
        component: AppInfo
      },
      {
        path: 'info',
        name: 'AppInfo',
        component: AppInfo
      },
      {
        path: 'update',
        name: 'AppUpdate',
        component: AppUpdate
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: AdminPage,
    children: [
      {
        path: '',
        component: AppInfo
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
