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
    meta: { noCache: true },
    children: [
      {
        path: '/profile',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Профиль', icon: 'user-solid', noCache: true },
      },
    ],
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/deals',
    name: 'UserDeals',
    meta: {
      title: 'Сделки',
      icon: 's-cooperation',
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/user/deals/create'),
        name: 'UserDealsCreate',
        meta: { title: 'Создать', icon: 'edit-outline' },
      },
      {
        path: 'contracts',
        component: () => import('@/views/user/deals/contracts'),
        name: 'UserDealsContracts',
        meta: { title: 'Предложения', icon: 'sell' },
      },
      {
        path: 'contracts/:id',
        component: () => import('@/views/user/deals/contractDetail'),
        name: 'UserDealsContractsDetail',
        meta: { title: 'Контракт', icon: 'edit-outline' },
        hidden: true,
      },
      {
        path: 'deals',
        component: () => import('@/views/user/deals/deals'),
        name: 'UserDealsList',
        meta: { title: 'Мои сделки', icon: 's-unfold' },
      },
    ],
  },


  {
    path: '/contract/:id',
    component: () => import('@/views/pay-confirm/index'),
    name: 'Pay Confirm',
    meta: { public: true },
    hidden: true,
  },

  {
    path: '/terms',
    component: Layout,
    redirect: '/terms/index',
    children: [
      {
        path: '/terms',
        component: () => import('@/views/terms/index'),
        name: 'Terms',
        meta: { title: 'Лицензионное соглашение' },
      },
    ],

    hidden: true,
  },

  {
    path: '/passport-success',
    component: () => import('@/views/action-page/passport-success'),
    meta: { public: true },
    hidden: true,
  },
  {
    path: '/passport-failed',
    component: () => import('@/views/action-page/passport-error'),
    meta: { public: true },
    hidden: true,
  },

  {
    path: '/pay-success',
    component: () => import('@/views/action-page/pay-success'),
    meta: { public: true },
    hidden: true,
  },

  {
    path: '/pay-failed',
    component: () => import('@/views/action-page/pay-failed'),
    meta: { public: true },
    hidden: true,
  },

  {
    path: '/auth-work',
    component: () => import('@/views/login/auth-work'),
    hidden: true,
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

  {
    path: '/500',
    hidden: true,
    meta: { public: true },
    component: () => import('@/views/error-page/500'),
  },

  {
    path: '/401',
    hidden: true,
    meta: { public: true },
    component: () => import('@/views/error-page/401'),
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
