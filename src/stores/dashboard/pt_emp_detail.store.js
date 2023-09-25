import DashboardService from '@/networks/DashboardService'
import { defineStore } from 'pinia'

export const usePtEmpDetailStore = defineStore('ptEmpDetail', {
  state: () => {
    return { data: [], isLoading: false, err: { isErr: false, message: '' } }
  },
  getters: {},
  actions: {
    async getPtEmpDetail(id) {
      try {
        this.isLoading = true
        const response = await DashboardService.getPtEmpDetail(id)
        this.data = response.result.data
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    }
  }
})
