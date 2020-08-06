import Vue from 'vue';

import VueRouter from 'vue-router';

Vue.use(VueRouter);

/* Layout */
import Layout from '@/Layout';

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Главная', icon: 's-home' },
      },
    ],
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Профиль', icon: 'user-solid' },
      },
    ],
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/deals/list',
    name: 'UserDeals',
    meta: {
      title: 'Сделки',
      icon: 's-cooperation',
    },
    children: [
      {
        path: 'deals/create',
        component: () => import('@/views/user/deals/create'),
        name: 'UserDealsCreate',
        meta: { title: 'Создать', icon: 'edit-outline' },
      },
      {
        path: 'deals/list',
        component: () => import('@/views/user/deals/list'),
        name: 'UserDealsList',
        meta: { title: 'Мои сделки', icon: 's-unfold' },
      },
      {
        path: 'deals/history',
        component: () => import('@/views/user/deals/history'),
        name: 'UserDealsHistory',
        meta: { title: 'История', icon: 'time' },
      },
    ],
  },

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },

  {
    path: '/404',
    hidden: true,
    component: () => import('@/views/error-page/404'),
  },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
  },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [];

const createRouter = () =>
  new VueRouter({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
