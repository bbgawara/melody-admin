<template>
  <header class="h-16 bg-gray-50 flex items-center justify-between px-4 sm:px-6 lg:px-8">
    <div class="flex items-center">
      <!-- 
        The Hamburger Toggle button 
        - The 'lg:hidden' class makes this button visible ONLY on screens smaller than 1024px.
      -->
      <button 
        @click="toggle" 
        class="hover:text-gray-800 focus:outline-none lg:hidden cursor-pointer"
        aria-label="toggle sidebar"
      >
        <font-awesome-icon icon="bars" class="text-xl" />
      </button>
    </div>

    <!-- Right Side: Welcome Text -->
    <div class="relative">
      <!-- Dropdown Toggle Button -->
      <button
        @click="isDropdownOpen = !isDropdownOpen"
        class="flex items-center text-sm text-gray-700 hover:text-blue-100 focus:outline-none cursor-pointer"
      >
        <font-awesome-icon icon="user-circle" class="text-3xl" />
      </button>

      <!-- Dropdown Menu -->
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-if="isDropdownOpen"
          ref="dropdownMenu"
          class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xs z-20 py-1"
        >
          <NuxtLink to="/settings" @click="isDropdownOpen = false" class="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <font-awesome-icon icon="cog" class="w-5 mr-3" />
            Settings
          </NuxtLink>
          <button @click="handleLogout" class="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            <font-awesome-icon icon="sign-out-alt" class="w-5 mr-3" />
            Logout
          </button>
        </div>
      </transition>
    </div>

  </header>
</template>

<script setup>
import { ref } from 'vue';
//import { useSidebar } from '~/composables/useSidebar';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

//const { isCollapsed, toggle } = useSidebar();

const isDropdownOpen = ref(false);
const dropdownContainer = ref(null);

const handleLogout = () => {
  authStore.clearToken();
  isDropdownOpen.value = false;
  router.push('/login');
};

//const handleClickOutside = (event) => {
  //if (dropdownContainer.value) {
    //const isClickInside = dropdownContainer.value.contains(event.target);
    //console.log(`Click was inside dropdown container: ${isClickInside}`);
    //if (!isClickInside) {
      //isDropdownOpen.value = false;
    //}
  //}
//};
</script>

