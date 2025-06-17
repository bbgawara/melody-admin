<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
    <Sidebar />

    <div class="flex-1 flex flex-col overflow-x-hidden">
      <Navbar />

      <main class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div class="max-w-7xl mx-auto">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '~/components/Sidebar.vue';
import Navbar from '~/components/Navbar.vue';
</script>