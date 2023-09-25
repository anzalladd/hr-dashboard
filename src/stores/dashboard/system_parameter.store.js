import DashboardService from '@/networks/DashboardService'
import { defineStore } from 'pinia'

export const useSystemParameterStore = defineStore('systemParameterStore', {
  state: () => {
    return {
      dataDivisi: [],
      dataDepartment: [],
      isLoading: false,
      err: { isErr: false, message: '' }
    }
  },
  getters: {
    headersDivisi: () => [
      {
        title: 'Code',
        key: 'divisi_code'
      },
      {
        title: 'Nama',
        key: 'nama'
      },
      {
        title: 'Actions',
        key: 'actions'
      }
    ],
    headersDepartment: () => [
      {
        title: 'Divisi',
        key: 'divisi_nama'
      },
      {
        title: 'Department Code',
        key: 'department_code'
      },
      {
        title: 'Nama Department',
        key: 'dept_nama'
      },
      {
        title: 'Actions',
        key: 'actions'
      }
    ]
  },
  actions: {
    async getDivisi() {
      try {
        const response = await DashboardService.getDivisi()
        this.dataDivisi = response.result.data
      } catch (e) {
        console.log(e)
      }
    },
    async getDepartment() {
      try {
        const response = await DashboardService.getDepartment()
        this.dataDepartment = response.result.data
      } catch (e) {
        console.log(e)
      }
    },
    async getAllData() {
      try {
        this.isLoading = true
        await this.getDivisi()
        await this.getDepartment()
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    }
  }
})
