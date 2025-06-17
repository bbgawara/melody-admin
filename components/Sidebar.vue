<template>
  <!-- Mobile Overlay: Appears on small screens when the sidebar is open -->
  <div
    v-if="!isCollapsed"
    @click="close"
    class="fixed inset-0 bg-gray-900 bg-opaity-60 z-20 lg:hidden"
    aria-hidden="true"
  ></div>

  <!-- Sidebar Container -->
  <div
    :class="[
      'bg-blue-200 text-gray-700 flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out z-30',
      'fixed inset-y-0 left-0', // Fixed position for mobile overlay behavior
      'lg:relative',            // Becomes part of the layout flow on desktop
      isCollapsed
        ? '-translate-x-full lg:translate-x-0 lg:w-20' // State when collapsed/hidden
        : 'translate-x-0 w-64'                         // State when open
    ]"
  >
    <!-- 
      Sidebar Header
      The 'justify-center' or 'justify-between' class is now applied dynamically
      based on the sidebar's collapsed state.
    -->
    <div 
      :class="[
        'flex items-center h-16 px-4 flex-shrink-0',
        isCollapsed ? 'justify-center' : 'justify-between'
      ]"
    >
      <!-- Hamburger Toggle Button -->
      <button 
        @click="toggle" 
        class="hover:text-black focus:outline-none w-10 h-10 rounded-full flex items-center justify-center bg-transparent hover:bg-blue-100 transition-colors duration-200 cursor-pointer" 
        aria-label="toggle sidebar"
      >
        <font-awesome-icon icon="bars" class="text-xl" />
      </button>

      <!-- 
        Search Button
        This now uses v-if to only render when the sidebar is NOT collapsed.
      -->
      <NuxtLink 
        v-if="!isCollapsed" 
        to="/search" 
        class="hover:text-black focus:outline-none w-10 h-10 rounded-full flex items-center justify-center bg-transparent hover:bg-blue-100 transition-colors duration-200" 
        aria-label="open search page"
      >
        <font-awesome-icon icon="magnifying-glass" class="text-md" />
      </NuxtLink>
    </div>

    <!-- Navigation Links -->
    <nav class="flex-1 px-5 py-4 space-y-2 overflow-y-auto">
      <NuxtLink 
        to="/" 
        :class="[
          'flex items-center text-base font-normal group hover:bg-blue-100',
          isCollapsed
            ? 'w-10 h-10 justify-center rounded-full'
            : 'p-2 rounded-lg'
        ]"
        active-class="bg-blue-300"
      >
        <font-awesome-icon icon="house" class="fa-fw text-sm" />
        <span v-if="!isCollapsed" class="ml-3">Dashboard</span>
      </NuxtLink>
      <NuxtLink 
        to="/posts" 
        :class="[
          'flex items-center text-base font-normal group hover:bg-blue-100',
          isCollapsed
            ? 'w-10 h-10 justify-center rounded-full'
            : 'p-2 rounded-lg'
        ]"
        active-class="bg-blue-300"
      >
        <font-awesome-icon icon="newspaper" class="fa-fw text-sm" />
        <span v-if="!isCollapsed" class="ml-3">Posts</span>
      </NuxtLink>
      <NuxtLink 
        to="/categories" 
        :class="[
          'flex items-center text-base font-normal group hover:bg-blue-100',
          isCollapsed
            ? 'w-10 h-10 justify-center rounded-full'
            : 'p-2 rounded-lg'
        ]"
        active-class="bg-blue-300"
      >
        <font-awesome-icon icon="folder" class="fa-fw text-sm" />
        <span v-if="!isCollapsed" class="ml-3">Category</span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup>
import { useSidebar } from '~/composables/useSidebar';
const { isCollapsed, toggle, close, open } = useSidebar();
</script>
