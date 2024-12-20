<script setup lang="ts">
import {useListStore} from "~/stores/list";
import NewTaskModal from "~/components/NewTaskModal.vue";
import {useTaskStore} from '~/stores/task';

const modalStore = useModalStore();
const taskStore = useTaskStore();
const listStore = useListStore();

function openNewTaskModal() {
  modalStore.open({
    component: NewTaskModal,
    componentProps: {
      title: 'This is the title',
      body: 'Some text in the Modal Body'
    }
  })
}
</script>

<template>
  <div
      v-if="listStore.active"
      class="relative flex flex-col w-1/3 rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none pb-7 p-[20px]">
    <div class="relative flex flex-row justify-between">
      <div class="flex items-center">
        <div
            class="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-100 dark:bg-white/5">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
               class="h-6 w-6 text-brand-500 dark:text-white" height="1em" width="1em"
               xmlns="http://www.w3.org/2000/svg">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
          </svg>
        </div>
        <h4 class="ml-4 text-xl font-bold text-navy-700 dark:text-white">{{ listStore.active.name }}</h4>
      </div>
    </div>
    <div class="h-full w-full">
      <button
          @click="openNewTaskModal"
          type="button"
          class="mt-4 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Nouvelle tâche
      </button>
      <div v-for="task in taskStore.tasks" class="mt-5 flex items-center justify-between p-2">
        <div class="flex items-center justify-center gap-2"><input type="checkbox" class="defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center
      justify-center rounded-md border border-gray-300 text-white/0 outline-none transition duration-[0.2s]
      checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 checked:bg-brand-500 dark:checked:bg-brand-400 undefined"
                                                                   name="weekly">
          <p class="text-base font-bold text-navy-700 dark:text-white">{{ task.shortDescription }}</p></div>
        <button @click="taskStore.deleteTask(task.id)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
            <path d="M4 7h16"></path>
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
            <path d="M10 12l4 4m0 -4l-4 4"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
