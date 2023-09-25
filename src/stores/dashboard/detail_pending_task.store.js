import DashboardService from '@/networks/DashboardService'
import { defineStore } from 'pinia'

export const useDetailPendingTaskStore = defineStore('detailPendingTaskStore', {
  state: () => {
    return {
      data: [],
      empOldValue: {},
      empNewValue: {},
      detailTask: {},
      isLoading: false,
      err: { isErr: false, message: '' }
    }
  },
  getters: {},
  actions: {
    async getDetailPendingTask(id) {
      try {
        this.isLoading = true
        const response = await DashboardService.getDetailPendingTask(id)
        this.data = response.result.GetDetailPendingTask
        this.detailTask = response.result.GetDetailTask
        this.empOldValue = response.result.GetDetailTask.old_value
        this.empNewValue = response.result.GetDetailTask.new_value
        if (this.empNewValue && this.empOldValue) {
          await this.processImage(this.empNewValue)
          await this.processImage(this.empOldValue)
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    async processImage(empValue) {
      if (empValue.foto !== '-' && empValue.foto !== '') {
        const photoResponse = await DashboardService.getImages(empValue.foto)
        if (photoResponse.status.code === 200) {
          empValue.foto = 'data:image/jpg;base64,' + photoResponse.result
        }
      }
    }
  }
})
