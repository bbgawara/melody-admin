// stores/auth.ts
import { defineStore } from 'pinia';

/**
 * Creates a Pinia store to manage authentication state.
 * The store's ID is 'auth'.
 */
export const useAuthStore = defineStore('auth', () => {
  // --- STATE ---
  // We use Nuxt's useCookie to create a reactive reference to a cookie.
  // This makes the token persistent across page reloads and available on both server and client.
  const token = useCookie<string | null>('authToken');

  // --- GETTERS ---
  // Getters are like computed properties for your store.
  const isAuthenticated = computed(() => !!token.value);

  // --- ACTIONS ---
  // Actions are methods that can modify the state.
  function setToken(newToken: string) {
    token.value = newToken;
  }

  function clearToken() {
    token.value = null;
  }

  // NEW: A dedicated logout action for cleaner code
  // This action clears the token and handles the redirection centrally.
  function logout() {
    clearToken();
    // Use navigateTo for a full-page redirect, ensuring middleware runs
    navigateTo('/login');
  }

  return {
    token,
    isAuthenticated,
    setToken,
    clearToken,
    logout, // Expose the new action
  };
});
