import { useAuth } from '../composebles/auth';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { router } from './index';
import { getCookie } from '../helpers/cookie';

const { authState, logout, refresh } = useAuth();

export function tokenExpGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const token = getCookie('token');
  if (typeof token === 'undefined' || token === '') {
    refresh()
      .then(() => {
        router.go(0);
      })
      .catch(() => {
        logout();
        router.push({ name: 'login' });
      });
  }
  next();
}

export function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (authState.isLoggedIn) {
    next();
  } else {
    next({ name: 'login' });
  }
}

export function loginGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (authState.isLoggedIn) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
}

export function checkRoleGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (authState.isAdmin) {
    next();
  } else {
    next({ name: 'dashboard' });
  }
}
