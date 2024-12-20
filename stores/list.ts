import {defineStore} from 'pinia';
import axios from "~/services/axios";

interface List {
    id: string;
    name: string;
    tasks: any[];
}

export const useListStore = defineStore('list', {
    state: () => ({
        lists: [] as List[],
        active: List,
        isLoading: false,
        error: null as string | null,
    }),
    actions: {
        async fetchLists() {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await axios.get('/lists');
                this.lists = response.data;
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Failed to fetch lists';
            } finally {
                this.isLoading = false;
            }
        },
        async createList(name: string) {
            this.error = null;
            try {
                const response = await axios.post('/lists', {name});
                this.lists.push(response.data);
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Failed to create list';
            }
        },
        setActive(id: string) {
            this.active = this.lists.find(list => list.id === id);
        }
    },
});
