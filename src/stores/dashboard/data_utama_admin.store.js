import DashboardService from '@/networks/DashboardService'
import { defineStore } from 'pinia'

export const useDataUtamaAdminStore = defineStore('dataUtamaAdminStore', {
  state: () => {
    return { data: [], isLoading: false, err: { isErr: false, message: '' } }
  },
  getters: {
    headers: () => [
      {
        title: 'Nama Admin',
        key: 'nama'
      },
      {
        title: 'Role Admin',
        key: 'role_name'
      },
      {
        title: 'No Telp',
        key: 'no_telp'
      },
      {
        title: 'Email',
        key: 'email'
      },
      {
        title: 'Action',
        key: 'action'
      }
    ]
  },
  actions: {
    async getAllUser() {
      try {
        this.isLoading = true
        const response = await DashboardService.getUser()
        this.data = response.result.data
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    }
  }
})
