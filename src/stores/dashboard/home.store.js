import DashboardService from '@/networks/DashboardService'
import { defineStore } from 'pinia'

export const useDashboardHomeStore = defineStore('dashboardHomeStore', {
  state: () => {
    return {
      data: [],
      dataPendingTask: [],
      dataPerpanjanganKontrak: [],
      isLoading: false,
      err: { isErr: false, message: '' }
    }
  },
  actions: {
    async getDashboardKaryawan() {
      try {
        this.isLoading = true
        const response = await DashboardService.getDashboardKaryawan()
        const responsePendingTask = await DashboardService.getDashboardPendingTask()
        const responsePerpanjanganKontrak = await DashboardService.getDashboardKaryawanHabisKontrak()
        this.data = response.result
        this.dataPendingTask = responsePendingTask.result.GetDashboardPendingTask
        this.dataPerpanjanganKontrak = responsePerpanjanganKontrak.result.getEmpHabisKontrak
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    }
  }
})
