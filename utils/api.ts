import { $fetch } from 'ofetch';
import { useAuthStore } from '~/stores/auth';

/**
 * A pre-configured ofetch instance that automatically handles
 * the API base URL and authentication.
 */
export const apiFetch = $fetch.create({
  baseURL: 'http://127.0.0.1:5000/api',
  
  // This hook runs before every request
  onRequest({ options }) {
    const authStore = useAuthStore();
    
    // Create new Headers object to avoid modifying the original
    const headers = new Headers(options.headers);

    if (authStore.token) {
      headers.set('Authorization', `Bearer ${authStore.token}`);
    }
    
    options.headers = headers;
  },

  // This hook runs on API response errors
  onResponseError({ response }) {
    // If the error is a 401 Unauthorized, it means the token is expired or invalid.
    if (response.status === 401) {
      const authStore = useAuthStore();
      // Call the logout action to clear the session and redirect
      authStore.logout();
    }
  }
});