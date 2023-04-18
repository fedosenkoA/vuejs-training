import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import type { Component } from 'vue';
import { authGuard, loginGuard, tokenExpGuard, checkRoleGuard } from './guards';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: (): Promise<Component> => import('../pages/HomePage.vue'),
    beforeEnter: [authGuard, tokenExpGuard],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: (): Promise<Component> => import('../pages/DashboardPage.vue'),
    beforeEnter: [authGuard, tokenExpGuard],
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: (): Promise<Component> => import('../pages/CalendarPage.vue'),
    beforeEnter: [authGuard, tokenExpGuard],
  },
  {
    path: '/management',
    name: 'management',
    component: (): Promise<Component> => import('../pages/ManagementPage.vue'),
    beforeEnter: [authGuard, tokenExpGuard],
  },
  {
    path: '/management/guides',
    name: 'guides',
    component: (): Promise<Component> =>
      import('../pages/ManagementGuidePage.vue'),
    beforeEnter: [authGuard, tokenExpGuard],
  },
  {
    path: '/management/restaurant',
    name: 'restaurant',
    component: (): Promise<Component> =>
      import('../pages/ManagementRestaurantPage.vue'),
    beforeEnter: [authGuard, tokenExpGuard],
  },
  {
    path: '/management/transport',
    name: 'transport',
    component: (): Promise<Component> =>
      import('../pages/ManagementBusCompanyPage.vue'),
    beforeEnter: [authGuard, tokenExpGuard],
  },
  {
    path: '/management/managers',
    name: 'guide',
    component: (): Promise<Component> =>
      import('../pages/ManagementManagerPage.vue'),
    beforeEnter: [authGuard, tokenExpGuard, checkRoleGuard],
  },
  {
    path: '/management/routes',
    name: 'routes',
    component: (): Promise<Component> =>
      import('../pages/ManagementRoutesPage.vue'),
    beforeEnter: [authGuard, tokenExpGuard],
  },
  {
    path: '/reports',
    name: 'reports',
    component: (): Promise<Component> => import('../pages/ReportPage.vue'),
    beforeEnter: [authGuard, tokenExpGuard],
  },
  {
    path: '/documents',
    name: 'documents',
    component: (): Promise<Component> => import('../pages/DocumentsPage.vue'),
    beforeEnter: [authGuard, tokenExpGuard],
  },
  {
    path: '/swap/:id',
    name: 'swap',
    component: (): Promise<Component> => import('../pages/GroupSwapPage.vue'),
    beforeEnter: [authGuard, tokenExpGuard],
  },
  {
    path: '/login',
    name: 'login',
    component: (): Promise<Component> => import('../pages/auth/LoginPage.vue'),
    beforeEnter: [loginGuard],
  },
  {
    path: '/activation',
    name: 'activation',
    component: (): Promise<Component> =>
      import('../pages/auth/AccauntActivationPage.vue'),
    beforeEnter: [loginGuard],
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: (): Promise<Component> =>
      import('../pages/auth/ForgotPasswordPage.vue'),
    beforeEnter: [loginGuard],
  },

  {
    path: '/food-preference-feedback',
    name: 'food-preferences',
    component: (): Promise<Component> =>
      import('../pages/FoodPreferencePage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: '/login',
    component: (): Promise<Component> => import('../pages/auth/LoginPage.vue'),
  },
];

export const routerHistory = createWebHistory();

export const router = createRouter({
  strict: true,
  history: routerHistory,
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});
