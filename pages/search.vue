<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Search</h1>
    <p class="mt-2 text-gray-600 dark:text-gray-300">
      This is your dedicated search page.
    </p>

    <!-- A simple search input field -->
    <div class="mt-8">
      <input
        type="text"
        placeholder="Type here to search..."
        class="w-full max-w-lg p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Search - Admin Dashboard',
});
</script>