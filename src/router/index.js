import Vue from 'vue';

import VueRouter from 'vue-router';

Vue.use(VueRouter);

/* Layout */
import Layout from '@/Layout';

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/profile',
    // children: [
    //   {
    //     path: 'dashboard',
    //     component: () => import('@/views/dashboard/index'),
    //     name: 'Dashboard',
    //     meta: { title: 'Главная', icon: 's-home' },
    //   },
    // ],
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
    path: '/contracts',
    component: Layout,
    redirect: '/contracts',
    meta: {
      title: 'Предложения',
      icon: 's-cooperation',
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/user/contracts/create'),
        name: 'UserContractCreate',
        meta: { title: 'Создать', icon: 'edit-outline', noCache: true },
      },
      {
        path: '/contracts',
        component: () => import('@/views/user/contracts/list'),
        name: 'UserContracts',
        meta: { title: 'Мои предложения', icon: 's-unfold', breadcrumb: false },
      },
      {
        path: '/contracts/:id',
        component: () => import('@/views/user/contracts/detail'),
        name: 'UserContractsDetail',
        meta: {
          title: 'Контракт',
          icon: 'edit-outline',
          noCache: true,
        },
        hidden: true,
      },
    ],
  },

  {
    path: '/deals',
    component: Layout,
    redirect: '/deals',
    meta: {
      title: 'Мои продажи',
      icon: 's-cooperation',
    },
    children: [
      {
        path: '/deals',
        component: () => import('@/views/user/deals/list'),
        name: 'UserDealsList',
        meta: { title: 'Мои продажи', icon: 'sell', breadcrumb: false },
      },

      {
        path: '/deals/:id',
        component: () => import('@/views/user/deals/detail'),
        name: 'UserDealsDetail',
        meta: {
          title: 'Продажа',
          icon: 'edit-outline',
          noCache: true,
        },
        hidden: true,
      },
    ],
  },

  {
    path: '/transactions',
    component: Layout,
    redirect: '/transactions',
    meta: {
      title: 'Транзакции',
      icon: 'guide',
    },
    children: [
      {
        path: '/transactions',
        component: () => import('@/views/transactions/list'),
        name: 'TransactionsList',
        meta: { title: 'Транзакции', icon: 'guide', breadcrumb: false , noCache: true },
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
    path: '/c/:id',
    component: () => import('@/views/claim/create'),
    name: 'Claim Crated',
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
    path: '/payment-timeout',
    component: () => import('@/views/action-page/pay-timeout'),
    name: 'Pay Timeout',
    meta: { public: true },
    hidden: true,
  },

  {
    path: '/pay-failed-funds-transferred',
    component: () => import('@/views/action-page/pay-failed-funds-transferred'),
    name: 'Pay Failed Transferred',
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
    meta: { public: true },
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
