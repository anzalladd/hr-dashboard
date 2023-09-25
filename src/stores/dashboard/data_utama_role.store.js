import DashboardService from '@/networks/DashboardService'
import { defineStore } from 'pinia'

export const useDataUtamaRole = defineStore('dataUtamaRole', {
  state: () => {
    return { data: [], isLoading: false, err: { isErr: false, message: '' } }
  },
  getters: {
    headers: () => [
      {
        title: 'Nama',
        key: 'Nama',
        width: "20%"
      },
      {
        title: 'Role Admin',
        key: 'role_name',
        width: "20%"
      },
      {
        title: 'Menu Access',
        key: 'Menu'
      },
      {
        title: 'Action',
        key: 'action'
      }
    ]
  },
  actions: {
    async getAllRole() {
      try {
        this.isLoading = true
        const response = await DashboardService.getRole()
        this.data = response.result.data
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    }
  }
})
