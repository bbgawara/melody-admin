<!-- pages/posts/[id]/edit.vue -->
<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800">Edit Post #{{ route.params.id }}</h1>

    <!-- Loading State -->
    <div v-if="postPending || categoriesPending" class="mt-8 text-center text-gray-500">
      <p>Loading post data...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="postError || categoriesError" class="mt-8 p-4 bg-red-100 text-red-700 rounded-lg">
      <p>Could not load data: {{ postError?.message || categoriesError?.message }}</p>
    </div>

    <!-- Form Container -->
    <div v-else class="mt-8 bg-white p-6 rounded-lg shadow-lg">
      <form @submit.prevent="handleUpdatePost" class="space-y-6">
        
        <!-- Title Input -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input 
            v-model="post.title" 
            type="text" 
            id="title" 
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Content Textarea -->
        <div>
          <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
          <textarea 
            v-model="post.content" 
            id="content" 
            rows="10" 
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <!-- Categories Checkboxes -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Categories</label>
          <div class="mt-2 space-y-2 border border-gray-200 p-4 rounded-md">
            <div v-for="category in availableCategories" :key="category.id" class="flex items-center">
              <input 
                :id="`category-${category.id}`" 
                :value="category.id"
                v-model="post.category_ids"
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
        <div v-if="error" class="text-sm text-red-600">
          {{ error }}
        </div>

        <!-- Submit Button -->
        <div>
          <button 
            type="submit" 
            :disabled="isLoading"
            class="w-full py-2 px-4 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <span v-if="isLoading">Updating...</span>
            <span v-else>Update Post</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useApiFetch } from '~/composables/useApiFetch';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const postId = route.params.id;
//const postTitle = route.params.title;

useHead({
  title: `Edit Post #${postId}`,
});

const error = ref(null);
const isLoading = ref(false);

// Form State
const post = ref({
  title: '',
  content: '',
  category_ids: [],
});

// Fetch existing post data AND all available categories in parallel
const [postResponse, categoriesResponse] = await Promise.all([
  useApiFetch(`/posts/${postId}`),
  useApiFetch('/categories')
]);

const { data: postData, pending: postPending, error: postError } = postResponse;
const { data: categoriesData, pending: categoriesPending, error: categoriesError } = categoriesResponse;

// Extract categories array from the response
const availableCategories = ref(categoriesData.value?.categories || []);

// Pre-fill form if data exists
if (postData.value) {
  post.value = {
    title: postData.value.title,
    content: postData.value.content,
    category_ids: postData.value.categories?.map(cat => cat.id) || [],
  };
}

// Form Submission Logic
const handleUpdatePost = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    await useApiFetch(`/admin/posts/${postId}/edit`, {
      method: 'PUT',
      body: post.value,
    });

    // On success, redirect to posts list
    await router.push('/posts');
  } catch (e) {
    error.value = e.data?.message || 'Failed to update post.';
  } finally {
    isLoading.value = false;
  }
};
</script>
