import DashboardService from '@/networks/DashboardService'
import { defineStore } from 'pinia'

export const usePendingTaskStore = defineStore('pendingTaskStore', {
  state: () => {
    return { data: [], isLoading: false, err: { isErr: false, message: '' } }
  },
  getters: {
    headers: () => [
      {
        title: 'Nama Menu',
        key: 'nama_menu'
      },
      {
        title: 'Nama Task',
        key: 'judul'
      },
      {
        title: 'Pembuat',
        key: 'name'
      },
      {
        title: 'Status',
        key: 'status'
      },
      {
        title: 'Action',
        key: 'action'
      }
    ]
  },
  actions: {
    async getPendingTask() {
      try {
        this.isLoading = true
        const response = await DashboardService.getPendingTask()
        this.data = response.result.data
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    }
  }
})
