import DashboardService from '@/networks/DashboardService'
import { defineStore } from 'pinia'

export const useEmployeeStore = defineStore('employeeStore', {
  state: () => {
    return { data: [], isLoading: false, err: { isErr: false, message: '' } }
  },
  getters: {
    headers: () => [
      {
        title: 'NIK',
        key: 'no_induk_karyawan'
      },
      {
        title: 'Nama Employee',
        key: 'nama_lengkap'
      },
      {
        title: 'Divisi',
        key: 'divisi_nama'
      },
      {
        title: 'Department',
        key: 'dept_nama'
      },
      {
        title: 'Jabatan',
        key: 'jabatan'
      },
      {
        title: 'Status Karyawan',
        key: 'status_karyawan_nama'
      },
      {
        title: 'Delete',
        key: 'is_dell'
      },
      {
        title: 'Action',
        key: 'action'
      }
    ]
  },
  actions: {
    async getAllEmployee() {
      try {
        this.isLoading = true
        const response = await DashboardService.getAllEmployee()
        this.data = response.result.data
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    }
  }
})
