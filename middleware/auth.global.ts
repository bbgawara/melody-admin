// middleware/auth.global.ts
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  // Get a reference to the auth store
  const authStore = useAuthStore();

  // On server-side, the token is available directly from the cookie
  // On client-side, the store is hydrated with the cookie value
  const isAuthenticated = !!authStore.token;

  // If the user is trying to access any page other than '/login' and is not authenticated...
  if (to.path !== '/login' && !isAuthenticated) {
    // ...redirect them to the login page.
    console.log('Redirecting to login: not authenticated.');
    return navigateTo('/login');
  }

  // If the user is already authenticated and tries to visit the login page...
  if (to.path === '/login' && isAuthenticated) {
    // ...redirect them to the dashboard.
    console.log('Redirecting to dashboard: already authenticated.');
    return navigateTo('/');
  }
});
