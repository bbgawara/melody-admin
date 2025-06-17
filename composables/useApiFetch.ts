import { useAuthStore } from '~/stores/auth';
export const useApiFetch = (url: string, options: any = {}) => {
  // Get an instance of our Pinia auth store.
  const authStore = useAuthStore();
  
  // Set the base URL for your Flask API.
  const baseURL = 'http://127.0.0.1:5000/api';

  // Prepare headers, including any custom headers passed in options.
  const headers = {
    ...options.headers,
  };

  // If a token exists in our Pinia store, add the Authorization header.
  if (authStore.token) {
    headers.Authorization = `Bearer ${authStore.token}`;
  }

  // Call the original useFetch with our configured options.
  return useFetch(url, {
    ...options,
    baseURL,
    headers,
    // This hook helps gracefully handle JSON parsing errors.
    onResponse({ response }) {
      if (typeof response._data === 'string') {
        try {
            response._data = JSON.parse(response._data);
        } catch (e) {
            console.error("Failed to parse JSON response:", e);
        }
      }
    },
    onResponseError({ response }) {
      // If the error status is 401 Unauthorized...
      if (response.status === 401) {
        console.log('Token expired or invalid. Logging out.');
        // ...clear the invalid token from the store and cookie...
        authStore.clearToken();
        // ...and redirect the user to the login page.
        navigateTo('/login');
      }
    }
  });
};