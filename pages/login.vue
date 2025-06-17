<!-- pages/login.vue -->
<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-center text-gray-800">Admin Login</h1>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="username" class="text-sm font-medium text-gray-700">Username</label>
          <input
            v-model="username"
            type="text"
            id="username"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label for="password" class="text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div v-if="error" class="text-sm text-red-600">
          {{ error }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-2 px-4 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <span v-if="isLoading">Logging in...</span>
            <span v-else>Login</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { apiFetch } from '~/utils/api'; // Import the new apiFetch utility
import { useRouter } from 'vue-router';

// This tells Nuxt to use a specific layout for this page.
definePageMeta({
  layout: 'minimal',
});

const username = ref('');
const password = ref('');
const error = ref(null);
const isLoading = ref(false);

const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    // We now use apiFetch directly. It returns the data or throws an error on failure.
    const data = await apiFetch('/admin/token', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value,
      },
    });

    if (data?.access_token) {
      authStore.setToken(data.access_token);
      await router.push('/'); // Redirect to dashboard on success
    } else {
      throw new Error('No token received from server.');
    }
  } catch (e) {
    // The error message from the API should be in e.data.message
    error.value = e.data?.message || 'Invalid credentials or server error.';
  } finally {
    isLoading.value = false;
  }
};
</script>
