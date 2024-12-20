import {defineStore} from 'pinia';
import axios from "~/services/axios";

interface List {
    id: string;
    name: string;
    tasks: any[];
}

export const useListStore = defineStore('list', () => {
    const { fetchTasks } = useTaskStore();

    const lists = ref([]);
    const active = ref(undefined);

    async function fetchLists() {
        this.isLoading = true;
        this.error = null;
        try {
            const response = await axios.get('/lists');
            lists.value = response.data;
        } catch (error: any) {
            this.error = error.response?.data?.message || 'Failed to fetch lists';
        } finally {
            this.isLoading = false;
        }
    }

    async function createList(name: string) {
        this.error = null;
        try {
            const response = await axios.post('/lists', {name});
            lists.value.push(response.data);
        } catch (error: any) {
            this.error = error.response?.data?.message || 'Failed to create list';
        }
    }

    async function setActive(id: string) {
        active.value = this.lists.find(list => list.id === id);
        await fetchTasks(active.value.id);
    }

    return {lists, active, fetchLists, createList, setActive}
});
