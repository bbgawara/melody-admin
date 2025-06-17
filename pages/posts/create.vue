<!-- pages/posts/create.vue -->
<template>
  <div>
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-800">Create New Post</h1>
      <NuxtLink 
        to="/posts" 
        class="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        &larr; Back to Posts
      </NuxtLink>
    </div>
    <hr class="my-6" />

    <!-- Loading State -->
    <div v-if="pending" class="text-center text-gray-500">
      <p>Loading form...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="p-4 bg-red-100 text-red-700 rounded-lg">
      <p>Failed to load necessary data. Please try again.</p>
    </div>

    <!-- Form Container -->
    <div v-else class="bg-white p-8 rounded-lg shadow-lg">
      <form @submit.prevent="handleCreatePost(postData)" class="space-y-6">
        
        <!-- Title Input -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input 
            v-model="postData.title" 
            type="text" 
            id="title" 
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Content Textarea -->
        <div>
          <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
          <textarea 
            v-model="postData.content" 
            id="content" 
            rows="10" 
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <!-- Categories Checkboxes -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Categories</label>
          <div class="mt-2 space-y-2 border border-gray-200 p-4 rounded-md max-h-48 overflow-y-auto">
            <div v-for="category in categories" :key="category.id" class="flex items-center">
              <input 
                :id="`category-${category.id}`" 
                :value="category.id"
                v-model="postData.category_ids"
                type="checkbox" 
                class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label :for="`category-${category.id}`" class="ml-3 block text-sm text-gray-900">
                {{ category.name }}
              </label>
            </div>
          </div>
        </div>
        
        <!-- Error Message Display -->
        <div v-if="submitError" class="text-sm text-red-600">
          {{ submitError }}
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-4">
          <button 
            type="button"
            @click="handleCancel"
            class="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            :disabled="isSubmitting"
            class="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <span v-if="isSubmitting">Creating...</span>
            <span v-else>Create Post</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { apiFetch } from '~/utils/api';
import { useRouter } from 'vue-router';

useHead({ title: 'Create New Post' });

const router = useRouter();

// --- Data Fetching for Categories ---
const { data, pending, error } = await useAsyncData(
  'categories-for-post-form', 
  () => apiFetch('/categories') // Using the public route for categories
);

// This computed property safely gets the array of categories from the response
const categories = computed(() => {
  if (Array.isArray(data.value)) {
    return data.value;
  }
  return data.value?.categories || [];
});

// --- Form State ---
const postData = ref({ 
  title: '', 
  content: '', 
  category_ids: [] 
});
const isSubmitting = ref(false);
const submitError = ref(null);

// --- Event Handlers ---
async function handleCreatePost() {
  isSubmitting.value = true;
  submitError.value = null;
  try {
    await apiFetch('/admin/posts/create', { 
      method: 'POST', 
      body: postData.value 
    });
    // On success, navigate back to the main posts list
    await router.push('/posts');
  } catch (err) {
    submitError.value = err.data?.msg || 'An unknown error occurred.';
  } finally {
    isSubmitting.value = false;
  }
}

function handleCancel() {
  router.push('/posts');
}
</script>
