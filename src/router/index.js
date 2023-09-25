import { createRouter, createWebHistory } from 'vue-router'
import middlewareHandle from '@/middlewares/middlewareHandler'
import adminMiddleware from '@/middlewares/admin'
import guestMiddleware from '@/middlewares/guest'
const Home = () => import(/* webpackChunkName: "home" */ '../views/V_Home.vue')

// Dashboard
const Dashboard = () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard/V_Dashboard.vue')
const DashboardHome = () => import(/* webpackChunkName: "dashboard_home" */ '@/views/Dashboard/Partials/V_Home/v-index.vue')
const Task = () => import(/* webpackChunkName: "task" */ '@/views/Dashboard/Partials/V_Task/v-index.vue')
const DetailTask = () => import(/* webpackChunkName: "detail_task" */ '@/views/Dashboard/Partials/V_Detail_Task/v-index.vue')
const DetailPendingTask = () => import(/* webpackChunkName: "detail_pending_task" */ '@/views/Dashboard/Partials/V_Detail_Pending_Task/v-index.vue')
const DataUtamaUser = () => import(/* webpackChunkName: "data_utama_user" */ '@/views/Dashboard/Partials/V_Data_Utama_Admin/v-index.vue')
const DataUtamaRole = () => import(/* webpackChunkName: "data_utama_role" */ '@/views/Dashboard/Partials/V_Data_Utama_Role/v-index.vue')
const SystemParameter = () => import(/* webpackChunkName: "system_parameter" */ '@/views/Dashboard/Partials/V_System_Parameter/v-index.vue')
const Employee = () => import(/* webpackChunkName: "employee" */ '@/views/Dashboard/Partials/V_Employee/v-index.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { middlewares: [guestMiddleware] }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { middlewares: [adminMiddleware] }, 
      children: [
        {
          path: '/dashboard',
          name: 'dashboard_home',
          component: DashboardHome
        },
        {
          path: '/PendingTask',
          name: 'task',
          component: Task
        },
        {
          path: '/PendingTask/:id',
          name: 'detail_pending_task',
          component: DetailPendingTask
        },
        {
          path: '/PtEmpDetail/:id',
          name: 'detail_task',
          component: DetailTask
        },
        {
          path: '/Admin',
          name: 'data_utama_user',
          component: DataUtamaUser
        },
        {
          path: '/AdminRole',
          name: 'data_utama_role',
          component: DataUtamaRole
        },
        {
          path: '/SysParam',
          name: 'system_parameter',
          component: SystemParameter
        },
        {
          path: '/Employee',
          name: 'employee',
          component: Employee
        }
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  return middlewareHandle(to, from, next)
})

router.beforeResolve((to, from, next) => {
   next();
})


export default router;
