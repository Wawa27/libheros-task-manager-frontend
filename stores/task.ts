import {defineStore} from 'pinia';
import axios from '@/services/axios';
import {useListStore} from "~/stores/list"; // Use your Axios instance

interface Task {
    id: string;
    shortDescription: string;
    longDescription: string;
    dueDate: string | null;
    isCompleted: boolean;
}

interface State {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
}

export const useTaskStore = defineStore('task', () => {
    const listStore = useListStore();
    const tasks = ref([]);

    async function fetchTasks() {
        this.isLoading = true;
        this.error = null;
        try {
            const response = await axios.get(`/lists/${listStore.active.id}`);
            this.tasks = response.data.tasks;
        } catch (error: any) {
            console.error(error);
            this.error = error.response?.data?.message || 'Failed to fetch tasks';
        } finally {
            this.isLoading = false;
        }
    }

    async function createTask(taskData: Omit<Task, 'id'>) {
        this.error = null;
        try {
            const response = await axios.post(`/lists/${listStore.active.id}/tasks`, taskData);
            this.tasks.push(response.data);
        } catch (error: any) {
            console.error(error);
            this.error = error.response?.data?.message || 'Failed to create task';
        }
    }

    async function deleteTask(taskId: string) {
        this.error = null;
        try {
            await axios.delete(`/lists/${listStore.active.id}/tasks/${taskId}`);
            this.tasks = this.tasks.filter((task) => task.id !== taskId);
        } catch (error: any) {
            this.error = error.response?.data?.message || 'Failed to delete task';
        }
    }

    async function toggleTaskCompletion(listId: string, taskId: string, isCompleted: boolean) {
        this.error = null;
        try {
            const response = await axios.patch(`/lists/${listId}/tasks/${taskId}`, {isCompleted});
            const updatedTask = response.data;
            const index = this.tasks.findIndex((task) => task.id === taskId);
            if (index !== -1) this.tasks[index] = updatedTask;
        } catch (error: any) {
            this.error = error.response?.data?.message || 'Failed to update task';
        }
    }

    return {fetchTasks, createTask, deleteTask, toggleTaskCompletion}
});
