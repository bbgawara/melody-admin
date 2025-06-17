<!-- pages/categories.vue -->
<template>
  <div>
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-800">Manage Categories</h1>
      <button 
        @click="showCreateForm = true"
        class="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <font-awesome-icon icon="plus" /> New Category
      </button>
    </div>

    <!-- Create Category Form (initially hidden) -->
    <div v-if="showCreateForm" class="mt-8 bg-white p-6 rounded-lg shadow-lg">
      <form @submit.prevent="handleCreateCategory" class="flex items-end space-x-4">
        <div class="flex-1">
          <label for="new-category-name" class="block text-sm font-medium text-gray-700">New Category Name</label>
          <input
            v-model="newCategoryName"
            type="text"
            id="new-category-name"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <button type="submit" :disabled="isCreating" class="px-4 py-2 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50">
            Save
          </button>
        </div>
        <div>
          <button type="button" @click="showCreateForm = false" class="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
            Cancel
          </button>
        </div>
      </form>
       <p v-if="createError" class="text-sm text-red-600 mt-2">{{ createError }}</p>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="mt-8 text-center text-gray-500">
      <p>Loading categories...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="mt-8 p-4 bg-red-100 text-red-700 rounded-lg">
      <p>Could not load categories: {{ error.message }}</p>
    </div>

    <!-- Data Table -->
    <div v-else-if="categoryList && categoryList.length > 0" class="mt-8 overflow-x-auto bg-white rounded-lg shadow">
      <table class="min-w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">ID</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categoryList" :key="category.id" class="border-b hover:bg-gray-50">
            <td class="px-6 py-4">{{ category.id }}</td>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ category.name }}</th>
            <td class="px-6 py-4 flex items-center space-x-3">
              <button @click="() => alert('Edit functionality to be added.')" class="font-medium text-blue-600 hover:underline">
                <font-awesome-icon icon="edit" /> Edit
              </button>
              <button @click="handleDelete(category.id)" class="font-medium text-red-600 hover:underline">
                <font-awesome-icon icon="trash" /> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Final fallback for no data -->
    <div v-else class="mt-8 text-center text-gray-500">
      <p>No categories found. Click "Create New Category" to add one.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { apiFetch } from '~/utils/api'; 

useHead({
  title: 'Manage Categories',
});

// --- Data Fetching ---
// THE FIX IS HERE: The endpoint is changed from '/admin/categories' to '/categories'
const { data, pending, error, refresh } = await useAsyncData(
  'categories',
  () => apiFetch('/categories')
);

// This computed property safely handles both direct arrays and paginated objects
const categoryList = computed(() => {
  if (Array.isArray(data.value)) {
    return data.value;
  }
  return data.value?.categories || [];
});

// --- Create Category State & Logic ---
const showCreateForm = ref(false);
const newCategoryName = ref('');
const isCreating = ref(false);
const createError = ref(null);

const handleCreateCategory = async () => {
  if (!newCategoryName.value.trim()) return;

  isCreating.value = true;
  createError.value = null;
  try {
    await apiFetch('/categories/create', {
      method: 'POST',
      body: { name: newCategoryName.value },
    });
    showCreateForm.value = false;
    newCategoryName.value = '';
    refresh(); // Refresh the list after creating
  } catch (e) {
    createError.value = e.data?.message || 'Failed to create category.';
    console.error(e);
  } finally {
    isCreating.value = false;
  }
};

// --- Delete Category Logic ---
const handleDelete = async (categoryId) => {
  if (confirm('Are you sure you want to delete this category?')) {
    try {
      // Note: The delete endpoint IS an admin route
      await apiFetch(`categories/${categoryId}/delete`, {
        method: 'DELETE',
      });
      refresh(); // Refresh the list after deleting
    } catch (e) {
      alert('Failed to delete category.');
      console.error(e);
    }
  }
};
</script>
