import BaseService from './BaseService'

class DashboardService extends BaseService {
  getDashboardKaryawan() {
    this.endPoint = '/GetDashboardKaryawan'
    return this.get({})
  }

  getPendingTask() {
    this.endPoint = '/GetPendingTask'
    return this.get({})
  }

  getDetailPendingTask(id) {
    this.endPoint = `/GetDetailPendingTask/${id}`
    return this.get({})
  }

  getPtEmpDetail(id) {
    this.endPoint = `/GetPTEmpDetail/${id}`
    return this.get({})
  }

  getUser() {
    this.endPoint = '/GetUser'
    return this.get({})
  }

  getRole() {
    this.endPoint = '/GetUserMenuAccess'
    return this.get({})
  }

  getDivisi() {
    this.endPoint = '/GetAllDivisi'
    return this.get({})
  }

  getDepartment() {
    this.endPoint = '/GetAllDepartment'
    return this.get({})
  }

  getAllEmployee() {
    this.endPoint = '/GetAllEmployee'
    return this.get({})
  }

  getDashboardKaryawanHabisKontrak() {
    this.endPoint = '/GetDashboardKaryawanHabisKontrak'
    return this.get({})
  }

  getDashboardPendingTask() {
    this.endPoint = '/GetDashboardPendingTask'
    return this.get({})
  }

  getImages(file) {
    this.endPoint = `/getimages?path_file=${file}`
    return this.get({})
  }
}

export default new DashboardService