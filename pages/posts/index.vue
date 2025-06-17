<!-- pages/posts/index.vue -->
<template>
  <div>
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Manage Posts</h1>
      <NuxtLink 
        to="/posts/create" 
        class="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <font-awesome-icon icon="plus" /> New Post
      </NuxtLink>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="mt-8 text-center text-gray-500">
      <p>Loading posts...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="mt-8 p-4 bg-red-100 text-red-700 rounded-lg">
      <p>Could not load posts: {{ error.message }}</p>
    </div>

    <!-- Data Table -->
    <div v-else-if="postList && postList.length > 0" class="mt-8 overflow-x-auto bg-white rounded-lg shadow">
      <table class="min-w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">ID</th>
            <th scope="col" class="px-6 py-3">Title</th>
            <th scope="col" class="px-6 py-3">Categories</th>
            <th scope="col" class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in postList" :key="post.id" class="border-b hover:bg-gray-50">
            <td class="px-6 py-4">{{ post.id }}</td>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ post.title }}</th>
            <td class="px-6 py-4">
              <span v-for="category in post.categories" :key="category.id" class="bg-gray-200 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                {{ category.name }}
              </span>
            </td>
            <td class="px-6 py-4 flex items-center space-x-3">
              <NuxtLink :to="`/posts/${post.id}/edit`" class="font-medium text-blue-600 hover:underline">
                <font-awesome-icon icon="edit" /> Edit
              </NuxtLink>
              <button @click="handleDelete(post.id)" class="font-medium text-red-600 hover:underline">
                <font-awesome-icon icon="trash" /> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Final fallback for no data -->
    <div v-else class="mt-8 text-center text-gray-500">
        <p>No posts found. Start by creating one!</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useApiFetch } from '~/composables/useApiFetch';

useHead({
  title: 'Manage Posts',
});

// `data` will now hold the entire paginated object from the API.
const { data, pending, error, refresh } = await useApiFetch('/admin/posts');

// A computed property to safely access the array of posts inside the data object.
const postList = computed(() => data.value?.posts || []);

const handleDelete = async (postId) => {
  if (confirm('Are you sure you want to delete this post?')) {
    try {
      // Use $fetch for event-driven requests, as recommended.
      await useApiFetch(`/admin/posts/${postId}/delete`, {
        method: 'DELETE',
      });
      // After a successful delete, refresh the list of posts
      refresh();
    } catch (e) {
      alert('Failed to delete post.');
      console.error(e);
    }
  }
};
</script>
