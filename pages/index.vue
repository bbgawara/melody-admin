<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
    <p class="mt-2 text-gray-600 dark:text-gray-300">
      Welcome to your admin dashboard.
    </p>

    <!-- Display an error message if the fetch fails -->
    <div v-if="error" class="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
      <p>Could not load dashboard stats: {{ error.message }}</p>
    </div>

    <!-- Display a simple loading state while fetching -->
    <div v-else-if="pending" class="mt-8 text-center text-gray-500">
      <p>Loading stats...</p>
    </div>
    
    <!-- Display the data once it has been fetched -->
    <div v-else-if="stats" class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 class="text-xl font-semibold text-gray-700 dark:text-white">Post Count</h2>
            <p class="mt-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">{{ stats.post_count }}</p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 class="text-xl font-semibold text-gray-700 dark:text-white">Category Count</h2>
            <p class="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">{{ stats.category_count }}</p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 class="text-xl font-semibold text-gray-700 dark:text-white">Comment Count</h2>
            <p class="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">{{ stats.comment_count }}</p>
        </div>
    </div>

    <!-- 
      NEW: The v-else block.
      This provides a fallback if the fetch is done but there are no stats,
      preventing the "Cannot read properties of null" error.
    -->
    <div v-else class="mt-8 text-center text-gray-500">
      <p>No stats available.</p>
    </div>
  </div>
</template>

<script setup>
import { useApiFetch } from '~/composables/useApiFetch';

// Set the page title
useHead({
  title: 'Admin Dashboard',
});

// Fetch dashboard stats from the protected API endpoint.
const { data: stats, pending, error } = await useApiFetch('/admin/dashboard/stats');

</script>
