<script setup lang="ts">

const taskStore = useTaskStore();
</script>

<template>
  <div class="relative flex flex-col bg-clip-border rounded-xl w-1/3 items-end">
    <div v-if="taskStore.active"
         class="max-w-[20rem] bg-white text-gray-700 h-[calc(100vh-2rem)] p-4 shadow-xl shadow-blue-gray-900/5 flex flex-col">

      <div class="mb-2 p-4">
        <h5 class="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
          {{ taskStore.active.shortDescription }}</h5>
      </div>
      <button
          @click="taskStore.deleteActiveTask()"
          type="button"
              class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
        Delete
      </button>
      <span>Description: {{ taskStore.active.longDescription }}</span>
      <span>Due date: {{ taskStore.active.dueDate }}</span>
      <span>Creation date: {{ taskStore.active.createdAt }}</span>
      <nav class="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
      </nav>
    </div>
  </div>
</template>
